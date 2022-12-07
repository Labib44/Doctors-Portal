import React, { useContext } from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const DisplayError = () => {
    const error=useRouteError();
    const {logOut}=useContext(AuthContext);
    const naviget=useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                naviget('/login')
             })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <p className='text-red-600'>Somthing went wrong !!!!!!</p>
            <p className='text-red-400'>{error.statusText || error.message}</p>
            <h3>Please <Link onClick={handleLogOut} className='btn btn-ghost'>Sign Out</Link></h3>
        </div>
    );
};

export default DisplayError;