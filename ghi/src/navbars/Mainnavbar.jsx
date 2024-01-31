import { BrowserRouter } from "react-router-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

const Nav = ({ isAuthenticated }) => {
    return (
        <BrowserRouter>
            <AuthProvider baseUrl={baseUrl}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Login" element={<Login />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default Nav;
