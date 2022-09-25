import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Additional/Loading';
import auth from '../firebase.init';
import useToken from '../hooks/useToken';


const Social = () => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const [token, setToken] = useToken(user);


    const navigate = useNavigate();
    let location = useLocation();



    if (loading) {
        // return <button className="btn loading">loading</button>
        return <Loading />
    }

    let from = location.state?.from?.pathname || "/";

    if (token) {
        
        navigate(from, { replace: true });

    }
    // if (user) {
    //     navigate(from, { replace: true });

    // }





    return (
        <div className='flex flex-col justify-center items-center gap-4'>
            <button
                onClick={() => signInWithGoogle()}
                className='btn btn-outline'
            >Continue with Google</button>

            {error ? <span className="label-text-alt text-red-500">{error.message}</span> : ""}


        </div>
    );
};

export default Social;