import React, { useState, useEffect } from 'react';

function UpdateUser({ user_id, token }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    grad_class: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      const userURL = 'http://localhost:8000/token';
      const response = await fetch(userURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setFormData(userData);
      }
    };

    fetchUser();
  }, [user_id, token]);

  const handleFormChange = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;
    setFormData({
      ...formData,
      [inputName]: value
    });
  }
  console.log('**data**', token)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userURL = `http://localhost:8000/api/users/${user_id}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    console.log('**data1**', token)
    const response = await fetch(userURL, fetchConfig);

    if (response.ok) {
      console.log("Update Successful")
    } else {
      console.log("Update Failed")
    }
  }

  return (
    <div className="row">
      <div className='offset-3 col-6'>
        <div className='shadow p-4 mt-4'>
          <h1>Update User</h1>
          <form onSubmit={handleSubmit} id="updateUser">
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
            <button className='btn btn-primary'>Update User</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
