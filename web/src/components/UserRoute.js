import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserRoute = ({ children, ...rest }) => {
    const { currentUser } = useSelector((state) => state.user);

    return currentUser ? <Route {...rest} /> : <Redirect to="/login" />;
}

export default UserRoute