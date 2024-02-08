import { useState, useEffect } from 'react';
import  useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';


const Login = () => {
  const { token } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { login } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token){
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username,password);

    if (!token){
      setErrorMsg("Login failed. Please check your username and password.");
  }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };

  return (
    <div className="card mb-3">
      <h5 className="card-header">Login</h5>
      <div className="card-body">
        {errorMsg && <div className="">{errorMsg}</div>}
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
              type={showPassword ? "text" : "password"}
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={togglePasswordVisibility} type="button" className="btn btn-secondary btn-sm">
              {showPassword ? "Hide" : "Show"}
            </button>
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
