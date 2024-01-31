import React, { useState, useEffect } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";

const UpdateUser = ({ userId }) => {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    grad_class: '',
  });

  const { token, fetchWithToken } = useToken();

  useEffect(() => {
    // Fetch user data based on the userId when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await fetchWithToken(`http://localhost:8000/users/${userId}/`, 'GET', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [userId, token, fetchWithToken]);

  const handleUpdateUser = async () => {
    try {
      const response = await fetchWithToken(`http://localhost:8000/users/${userId}/`, 'PUT', {}, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log('User updated successfully!');
      } else {
        console.error('Failed to update user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Update User</h1>
      <form>
        {/* Render input fields with user data */}
        <label>First Name:
          <input type="text" name="first_name" value={user.first_name} onChange={handleChange} />
        </label>
        <br />
        <label>Last Name:
          <input type="text" name="last_name" value={user.last_name} onChange={handleChange} />
        </label>
        <br />
        <label>Email:
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </label>
        <br />
        <label>Grad Class:
          <input type="text" name="grad_class" value={user.grad_class} onChange={handleChange} />
        </label>
        <br />
        <button type="button" onClick={handleUpdateUser}>Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
