import React from 'react';
import { Link } from 'react-router-dom';

const BruchOn = () => {
    return (
        <div className='mx-5 lg:mx-10 xl:mx-20 py-10 flex justify-center relative'>

            <div className='relative w-full  px-5 pb-16 mb-10'>

                <div >
                    <img src="https://i.ibb.co/YBrtZBk/thepurdydifference-product-desktop.png" alt="" />

                </div>

                <div className='sm:-bottom-10 sm:-right-10 xl:-bottom-2 xl:-right-2 relative sm:absolute bg-[#ffcd00] px-5 flex flex-col gap-2 py-12 max-w-3xl'>

                    <h1 className='text-2xl tracking-wide'>OUR PRODUCTS
                    </h1>
                    <h1 className='font-bold tracking-wider text-3xl md:text-4xl mb-5'>Brush On & Roll Up

                    </h1>
                    <h1 className='text-lg tracking-wide'>Every job requires something different. That’s why Purdy® makes a wide range of paintbrushes, rollers, poles, trays, and more.</h1>

                    <div className='mt-2 mb-5'>
                        <Link className='font-bold tracking-wider bg-[#ab2328] text-white px-5 md:px-12 py-3 ' to='/products'> EXPLORE ALL PRODUCTS</Link>
                    </div>


                </div>

            </div>

        </div>
    );
};

export default BruchOn;