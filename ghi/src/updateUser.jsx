import { useState, useEffect } from 'react';
import  useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from 'react-router-dom'

function UpdateUser() {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const { logout } = useToken();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    grad_class: ''
  });

  const fetchToken = async () => {
    const tokenURL = `${import.meta.env.VITE_API_HOST}/token`;
    const fetchConfig = {credentials:'include'};
    const response = await fetch(tokenURL, fetchConfig);
    if (response.ok) {
      const data = await response.json();
      if (!data){
        return null;
      }
      setToken(data)
      setUserId(data.user.id);
    }
  }

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
    const userURL = `${import.meta.env.VITE_API_HOST}/users/${userId}`;
    const response = await fetch(userURL, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.ok){
      navigate('/users/profile/mine');
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your profile?");
    if (confirmed){
      const userURL = `${import.meta.env.VITE_API_HOST}/users/${userId}`;
      const response = await fetch(userURL, {
        method:"DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok){
        logout();
        navigate('/Signup');
      }
    }
  }


  useEffect(() => {
      fetchToken();
  }, [])


  return (
    <div className="row">
      <div className='offset-3 col-6'>
        <div className='shadow p-4 mt-4'>
          <h1>Update User</h1>
          <form onSubmit={handleSubmit} id="updateUser">
            <div className='form-floating mb-3'>
              <input
              onChange={handleFormChange}
              value={formData.first_name}
              placeholder="First Name"
              required
              type="text"
              name="first_name"
              id="first_name"
              className="form-control"/>
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className='form-floating mb-3'>
              <input
              onChange={handleFormChange}
              value={formData.last_name}
              placeholder="Last Name"
              required
              type="text"
              name="last_name"
              id="last_name"
              className="form-control"/>
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className='form-floating mb-3'>
              <input
              onChange={handleFormChange}
              value={formData.email}
              placeholder="Email"
              required
              type="text"
              name="email"
              id="email"
              className="form-control"/>
              <label htmlFor="email">Email</label>
            </div>
            <div className='form-floating mb-3'>
              <input
              onChange={handleFormChange}
              value={formData.grad_class}
              placeholder="Graduating Class"
              required
              type="text"
              name="grad_class"
              id="grad_class"
              className="form-control"/>
              <label htmlFor="grad_class">Graduating Class</label>
            </div>
            <button type="submit" className='btn btn-primary'>Update User</button>
          </form>
          <button onClick={handleDelete} className='btn btn-danger mt-2'>Delete User</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
