import { useState, useEffect } from 'react';
import  useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap';




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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const handleDelete = async () => {
        setShow(true);
        }
    const confirmDelete = async () => {
        const userURL = `${import.meta.env.VITE_API_HOST}/users/${account.user.id}`;
        const response = await fetch(userURL, {
            method:"DELETE",
            headers: {
                'Authorization': `Bearer ${account.access_token}`,
            },
        });
        if (response.ok){
            setIsDeleted(true);
        }
        setShow(false);

    }

    useEffect(() => {
      fetchToken();
    if (isDeleted) {
        logout();
        navigate('/welcome');
    }
    }, [isDeleted, logout, navigate]);


  return (
    <div className="row">
      <div className=''>
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
          <button onClick={handleDelete} className='btn btn-danger'>Delete User</button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>woah there!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Deleting this user is permanent. Pressing yes will also delete all the users posts. Are you sure?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={confirmDelete}>
                🖕🏼
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
