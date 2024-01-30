import React, { useState, useEffect } from 'react';

function UpdateUser({ userId }) {
  const [formData, setFormData] = useState({
    password: '',
    first_name: '',
    last_name: '',
    grad_class: ''
  });

  useEffect(() => {
    // Fetch user data for the specified userId and set it in the formData state
    const fetchUser = async () => {
      const userURL = `http://localhost:8000/api/users/${userId}`;
      const response = await fetch(userURL);
      if (response.ok) {
        const userData = await response.json();
        setFormData(userData);
      }
    };

    fetchUser();
  }, [userId]);

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
    const userURL = `http://localhost:8000/api/users/${userId}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
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
            {/* The input fields for updating user data */}
            {/* ... (similar to your existing form) ... */}
            <button className='btn btn-primary'>Update User</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
