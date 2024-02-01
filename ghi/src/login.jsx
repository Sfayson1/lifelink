import { useState, useEffect } from 'react';
import  useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { login } = useToken();
  const navigate = useNavigate();

  const fetchToken = async () => {
    const tokenURL = "http://localhost:8000/token";
    const fetchConfig = {credentials:'include'};
    const response = await fetch(tokenURL, fetchConfig);
    if (response.ok) {
      const data = await response.json();
      if (!data){
        return null;
      }
      setToken(data.access_token)
      console.log(data.access_token)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      login(username,password);
      console.log('*data*', token)
      if (token !== null){
        e.target.reset();
        navigate('/');
      } else if (token === null) {
        setErrorMsg("Login failed. Please check your username and password.");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setErrorMsg("Login failed. Please check your username and password.");
      }
    };

  useEffect(() => {
      fetchToken();
  }, [])

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Login</h5>
      <div className="card-body">
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
            className="btn btn-primary"
            type="submit"
            value="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
};


export default Login;
