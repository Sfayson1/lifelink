import { NavLink, useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';


function Nav() {
  const { token, logout } = useToken();
  const isAuthenticatedFromToken = token !== null;
  const navigate = useNavigate();


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container-fluid">
        {isAuthenticatedFromToken ? (
        <>
          <NavLink className="navbar-brand" to="/">LifeLink</NavLink>
        </>
        ) : (
        <>
        <NavLink className="navbar-brand" to="/welcome">LifeLink</NavLink>
        </>
        )}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuthenticatedFromToken ? (
              <>

                <li> <NavLink className="nav-link" to="/ListOfUsers">List of Users</NavLink> </li>
                <li> <NavLink className="nav-link" to="/users/profile/mine">My Profile</NavLink> </li>
                <li> <NavLink className="nav-link" to="/user/update">Update Profile</NavLink> </li>
                <li><button className="btn btn-danger" onClick={async () => {
                await logout();
                navigate('/welcome');
                }}>Logout</button></li>

                {/* Add links here that should be visible when the user IS logged in */}

              </>
            ) : (
              <>
                <li> <NavLink className="nav-link" to="/signup">Sign Up</NavLink> </li>
                <li> <NavLink className="nav-link" to="/login">Login</NavLink> </li>
                <li> <NavLink className="nav-link" to="/ListOfUsers">Who's Here?</NavLink> </li>



                {/* Add links here that should be visible when the user IS NOT logged in */}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
