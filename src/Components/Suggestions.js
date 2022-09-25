


import React from 'react';
// import bgg from '../../../assets/images/bg.png'
const Suggestions = () => {


    const SubmitForm = (e) => {
        e.preventDefault();
    }
    return (
        // <div style={{
        //     background: `url(${bgg})`
        // }} className='my-16 p-5 bg-yellow-600'>
        <div className='bg-opacity-90  pb-72 mx-5 lg:mx-10 xl:mx-20'>



            <div className='flex items-center justify-evenly relative'>


                <div className='max-w-[500px] w-full'>
                    <img className='w-full' src="https://i.ibb.co/4J3Pg9B/5124556-removebg-preview.png" alt="" srcset="" />
                </div>
                <div>
                    
                </div>

                <form className='flex flex-col gap-4 w-full md:w-1/2 lg:w-1/4 mx-3 bg-teal-50 px-4 sm:px-10 shadow-xl absolute md:left-1/2 md:-bottom-40 -bottom-56 pb-10'>

                    <div className='py-8'>
                        <h1 className='text-center text-lg md:text-3xl text-black'>Stay connected with us</h1>
                    </div>

                    <input className='border-b-2 pt-1 px-3 text-xl bg-gray-200 rounded-xl text-black' type="email" name="email" id="" placeholder='Email' />

                    <input className='border-b-2 pt-1 px-3 text-xl bg-gray-200 rounded-xl text-black' type="text" name="subject" id="" placeholder='Subject' />

                    <textarea className='border-b-2 pt-1 px-3 text-xl bg-gray-200 rounded-xl text-black' type="text" name="message" id="" placeholder='Message' />

                    <button onClick={SubmitForm} className="btn border-2 bg-transparent hover:bg-gradient-to-r from-primary to-secondary  first-letter:
                        tracking-wider text-black  font-bold mt-5 ">Submit</button>
                </form>
            </div>

        </div>
    );
};
export default Suggestions;