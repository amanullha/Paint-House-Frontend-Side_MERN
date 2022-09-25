import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import auth from '../firebase.init';
import Loading from '../Additional/Loading';



const RequireAuth = () => {

    const [user, loading] = useAuthState(auth);

    let location = useLocation();


    if (loading) {
        return <div className='flex justify-center items-center'><Loading /></div>;
    }

    if (!user) {

        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // if (user && user.providerData[0].providerId === 'password' && user.emailVerified === false) {
    //     return <VerifyEmail />
    // }

    return <Outlet />;
}

export default RequireAuth;