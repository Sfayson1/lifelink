
import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRouteHOC = (Component, isAuthenticated) => {
    return isAuthenticated ? <Component /> : <Navigate to="/login" />
}

export default PrivateRouteHOC
