// import React from 'react';

import { Link } from 'react-router-dom'
const Nav = ({ isAuthenticated }) => {
    return (
        <nav>
            <ul>
                {isAuthenticated ? (
                    <>
                        <li><Link to="/Update">Home</Link></li>
                        <li><Link to="/Delete">Log in</Link></li>
                        <li><Link to="/Logout">Sign up</Link></li>
                        <li><Link to="/ListOfUsers">List of Users</Link></li>
                        <li><Link to="/Profile">List of Users</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/Login">Log in</Link></li>
                        <li><Link to="/Signup">Sign up</Link></li>
                        <li><Link to="/ListOfUsers">List of Users</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};
export default Nav;

// const Nav = () => {
//     return (
//         <nav>
//             <ul>
//                 <li><a href="/">Home</a></li>
//                 <li><a href="/Login">Log in</a></li>
//                 <li><a href="/Signup">Sign up</a></li>
//                 <li><a href="/Update">Update</a></li>
//             </ul>
//         </nav>
//     );
// };
// export default Nav
