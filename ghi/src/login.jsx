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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card mb-3">
            <h3 className="card-header">Login</h3>
            <div className="card-body">
              {errorMsg && <div className="">{errorMsg}</div>}
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-floating mb-3">
                  <input
                    name="username"
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label htmlFor="username">Username:</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="password">Password:</label>
                </div>
                <button onClick={togglePasswordVisibility} type="button" className="btn btn-secondary btn-sm mt-2">
                  {showPassword ? "Hide Password" : "Show Password"}
                </button>
                <div className="d-flex justify-content-end">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Login"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login;
