// This makes VSCode check types as if you are using TypeScript
//@ts-check


import { Route, Routes } from 'react-router-dom'
import Login from './login'
import Signup from './Signup'
import Nav from './navbars/Mainnavbar.jsx'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import UserList from './ListOfUsers'
import Home from './Home.jsx'
import UpdateUser from './updateUser.jsx'
import Profile from './Profile.jsx'
import Homepage from './Homepage.jsx'
import MyProfile from './MyProfile.jsx'
import UpdatePost from './UpdatePost.jsx'

// All your environment variables in vite are in this object
console.table(import.meta.env)

// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}
console.log("Calling:", `${import.meta.env.VITE_API_HOST}/api/posts/all`);


function App() {
    return (
        <>
            <Nav />
            <div className="my-5 container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/ListOfUsers" element={<UserList />} />
                    <Route path="/user/update" element={<UpdateUser />} />
                    <Route path="/profile/:user_id" Component={Profile} />
                    <Route path="/users/profile/mine" element={<MyProfile />} />
                    <Route path="/welcome" element={<Homepage />} />
                    <Route path="/UpdatePost/:post_id" element={<UpdatePost />} />
                </Routes>
            </div>
        </>
    )
}

function Root() {
    return (
        <AuthProvider baseUrl={API_HOST}>
            <App />
        </AuthProvider>
    )
}

export default Root

