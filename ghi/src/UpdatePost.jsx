import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const UpdatePost = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);

    const formattedDate = `${year}-${month}-${day}`;


    let { post_id } = useParams()

    const [formData, setFormData] = useState({
    content: '',
    date_posted: formattedDate,

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
    const userURL = `http://localhost:8000/posts/${post_id}/`;
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
    } else {
        console.log('error', response.status, 'postobject', formData)
        }
  }

  const handleDeletePost = async () => {
    const userURL = `http://localhost:8000/posts/${post_id}/`;
    const response = await fetch(userURL, {
    method:"DELETE",
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response.ok){
    navigate('/users/profile/mine');
  }
}


  useEffect(() => {
      fetchToken();
  }, [])


  return (
    <div className="row">
      <div className='offset-3 col-6'>
        <div className='shadow p-4 mt-4'>
          <h1>Update Post</h1>
          <form onSubmit={handleSubmit} id="updateUser">
            <div className='form-floating mb-3'>
              <input
              onChange={handleFormChange}
              value={formData.content}
              placeholder="Content"
              required
              type="text"
              name="content"
              id="content"
              className="form-control"/>
              <label htmlFor="content">Edit your post:</label>
            </div>


            <button type="submit" className='btn btn-primary'>Update Post</button>
          </form>
          <button onClick={handleDeletePost} className='btn btn-danger mt-2'>Delete post</button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePost;