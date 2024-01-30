import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
    const tokenURL = 'http://localhost:8000/token'
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch (tokenURL, fetchConfig);
    if (response.ok) {
      console.log('Login successful');
    } else {
      const errorData = await response.json();
      console.error('Login failed:', errorData);
    }
    }

    

  return(
    <div className="row">
      <div className='offset-3 col-6'>
        <div className='shadow p-4 mt-4'>
          <h1>Log in</h1>
          <form onSubmit={handleSubmit} id="signup">
            <div className='form-floating mb-3'>
              <input
              onChange={handleFormChange}
              value={formData.username}
              placeholder="Username"
              required type="text"
              name="username"
              id="username"
              className="form-control"
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className='form-floating mb-3'>
              <input
              onChange={handleFormChange}
              value={formData.password}
              placeholder="Password"
              required type="text"
              name="password"
              id="password"
              className="form-control"
              />
              <label htmlFor="password">Password</label>
            </div>
              <button className='btn btn-primary'>Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}


export default Login;
