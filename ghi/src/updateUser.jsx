import React, { useState, useEffect } from 'react';

function UpdateUser({ id }) {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    grad_class: ''
  });

  const fetchToken = async () => {
    const tokenURL = "http://localhost:8000/token";
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
    const userURL = `http://localhost:8000/users/${userId}`;
    const response = await fetch(userURL, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
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
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
