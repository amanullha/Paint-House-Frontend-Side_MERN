import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import Social from './Social';
import Loading from '../Additional/Loading';
import auth from '../firebase.init';
import useToken from '../hooks/useToken';



const Login = () => {

    let errorMessage;
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [token, setToken] = useToken(user)


    const navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/";



    useEffect(() => {

        const t = localStorage.getItem('accessToken');



        if (token && token !== null) {
            navigate(from, { replace: true });
        }
        if (t && t !== null && t !== undefined) {
            navigate(from, { replace: true });
        }

        
    }, [token, from, navigate])


    if (loading) {
        return <div className='h-screen w-full flex justify-center items-center'>
            <Loading />
        </div>
    }

    if (error) {
        errorMessage = <span className="label-text-alt text-red-500 ">{error?.message}</span>
    }



    // if (user) {
    //     navigate(from, { replace: true });

    // }



    const onSubmit = data => {
        console.log(data);

        const email = data.email;
        const password = data.password;

        signInWithEmailAndPassword(email, password);
    }


    const goToSignUp = () => {
        navigate('/sign-up');
    }


    return (
        <div className='flex justify-center items-center  h-screen'>

            <div className="card  bg-base-100 shadow-xl">
                <div className="card-body flex flex-col justify-center items-center">

                    <h2 className=" tex-center text-3xl font-bold card-title">Login</h2>


                    <form onSubmit={handleSubmit(onSubmit)}>


                        <div className="form-control w-full max-w-xs">

                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>

                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs"
                                {
                                ...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is required'
                                    },
                                    pattern: {
                                        value: /[A-Za-z]{3}/,
                                        message: 'Provide a valid email'
                                    }
                                })
                                }

                            />

                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}

                            </label>

                        </div>
                        <div className="form-control w-full max-w-xs">

                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>

                            <input
                                type="password"
                                placeholder="Your Password"
                                className="input input-bordered w-full max-w-xs"
                                {
                                ...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer!'
                                    }
                                })
                                }

                            />

                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}

                            </label>

                        </div>

                        {errorMessage}

                        <div className='flex items-center justify-between mb-3'>
                            <div className='flex items-center gap-1'>
                                <input type="checkbox" name="saveMe" id="saveMe" />
                                <span className='text-sm'>Remember me</span>
                            </div>
                            <h1 onClick={() => navigate('/forget-password')} className='text-sm text-secondary font-bold cursor-pointer'>Forget password?</h1>
                        </div>

                        <input className='btn w-full max-w-xs text-white tracking-wider' type="submit" value="LOGIN" />


                    </form>

                    <div>
                        <span className='text-xs'>New to DocTreat? </span>
                        <span onClick={goToSignUp} className='text-sm ml-2 cursor-pointer text-secondary active:font-bold'> Create new account </span>
                    </div>


                    <div className="divider">OR</div>
                    <Social />
                </div>



            </div>

        </div>
    );
};

export default Login;