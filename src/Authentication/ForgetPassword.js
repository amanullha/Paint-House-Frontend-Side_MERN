

import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import Loading from '../Additional/Loading';



const ForgetPassword = () => {

    let errorMessage;
    const { register, formState: { errors }, handleSubmit } = useForm();

    const navigate = useNavigate();

    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
        auth
    );



    if (sending) {
        return <div className='h-screen w-full flex justify-center items-center'>
            <Loading />
        </div>
    }

    if (error) {
        errorMessage = <span className="label-text-alt text-red-500 ">{error?.message}</span>
    }





    const onSubmit = async (data) => {
        console.log(data);

        const email = data.email;
        await sendPasswordResetEmail(email);

        if (!error) {
            navigate('/login');
        }
    }


    return (
        <div className='flex justify-center items-center  h-screen'>

            <div className="card  bg-base-100 shadow-xl">
                <div className="card-body flex flex-col justify-center items-center">

                    <h2 className="text-secondary my-3 tex-center text-2xl font-bold card-title">Enter your email to get reset password link</h2>


                    <form onSubmit={handleSubmit(onSubmit)}>


                        <div className="form-control w-full max-w-xs">



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


                        {errorMessage}

                        <input className='btn w-full max-w-xs text-white tracking-wider' type="submit" value="Reset" />


                    </form>


                </div>



            </div>

        </div>
    );
};

export default ForgetPassword;