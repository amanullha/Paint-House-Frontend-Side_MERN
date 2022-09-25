import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import auth from '../firebase.init';
import Loading from '../Additional/Loading';
import useAdmin from '../hooks/useAdmin';
// import VerifyEmail from '../VerifyEmail/VerifyEmail';



const RequireAdmin = () => {

    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);

    let location = useLocation();


    console.log("admin: ", admin, "  : user : ", user);


    if (loading || adminLoading) {
        return <div className='flex justify-center items-center'><Loading /></div>;
    }

    if (!user || !admin) {

        localStorage.removeItem('accessToken');
        signOut(auth);

        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // if (user && user.providerData[0].providerId === 'password' && user.emailVerified === false) {
    //     return <VerifyEmail />
    // }

    return <Outlet />;
}

export default RequireAdmin;