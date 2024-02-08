import { useState, useEffect } from 'react';
import  useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';

function Signup() {
  const { token } = useAuthContext();
  // const [errorMsg, setErrorMsg] = useState("");
  const { login } = useToken();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    grad_class: ''
  });

  const handleFormChange = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;
    setFormData({
      ...formData,
      [inputName]: value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userURL = `${import.meta.env.VITE_API_HOST}/api/users/`
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch (userURL, fetchConfig);
    if (response.ok) {
      setFormData({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        grad_class: ''
      });
      login(formData.username,formData.password);
    }
  }

  useEffect(() => {
    if (token){
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])



  return(
    <div className="row">
      <div className='offset-3 col-6'>
        <div className='shadow p-4 mt-4'>
          <h1>Sign up</h1>
          {/* {errorMsg && <div className="alert alert-danger">{errorMsg}</div>} */}
          <form onSubmit={handleSubmit} id="signup">
            <div className='form-floating mb-3'>
              <input onChange={handleFormChange} value={formData.username} placeholder="Username" required type="text" name="username" id="username" className="form-control"/>
              <label htmlFor="username">Username</label>
            </div>
            <div className='form-floating mb-3'>
              <input onChange={handleFormChange} value={formData.password} placeholder="Password" required type="text" name="password" id="password" className="form-control"/>
              <label htmlFor="password">Password</label>
            </div>
            <div className='form-floating mb-3'>
              <input onChange={handleFormChange} value={formData.first_name} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control"/>
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className='form-floating mb-3'>
              <input onChange={handleFormChange} value={formData.last_name} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control"/>
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className='form-floating mb-3'>
              <input onChange={handleFormChange} value={formData.email} placeholder="Email" required type="text" name="email" id="email" className="form-control"/>
              <label htmlFor="email">Email</label>
            </div>
            <div className='form-floating mb-3'>
              <input onChange={handleFormChange} value={formData.grad_class} placeholder="Graduating Class" required type="text" name="grad_class" id="grad_class" className="form-control"/>
              <label htmlFor="grad_class">Graduating Class</label>
            </div>
              <button className='btn btn-primary'>Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
}


export default Signup;
