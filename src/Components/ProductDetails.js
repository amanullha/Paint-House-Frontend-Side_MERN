
import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { MdAddShoppingCart, MdOutlineUpdate } from 'react-icons/md';
import { GrUpdate } from 'react-icons/gr';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Additional/Loading';
import auth from '../firebase.init';
import useAdmin from '../hooks/useAdmin';

import '../Assets/StyleSheets/style.css'

const ProductDetails = () => {


    const [user, loading, errorr] = useAuthState(auth);

    const [admin] = useAdmin(user);

    const productId = useParams()._id;
    const navigate = useNavigate();

    const { data: product, isLoading, refetch } = useQuery('products', () => fetch(`http://localhost:5000/products/${productId}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));



    if (isLoading) {
        return <div className='flex items-center justify-center'> <Loading /></div>
    }

    const handleAddToCart = () => {

        navigate(`/product-add-to-cart/${productId}`);
    }
    const handleUpdateProduct = () => {

        navigate(`/product-update/${productId}`);
    }


    return (
        <div>

            <div className='productDetailsBG'>


                <div className='py-20 md:py-32 px-5 hero min-h-[70vh]'>

                    <div className='flex flex-col md:flex-row justify-between gap-5 hero-content '>

                        <div className='w-full md:w-5/12'>
                            <img className='rounded-lg w-full h-[200px] md:h-[400px] bg-transparent' src={product?.image} alt={product?.name} />
                        </div>

                        <div className='flex flex-col  gap-2 md:w-7/12'>
                            <div className='flex justify-between'>
                                <h1 className='text-3xl font-bold text-black   '>{product?.name}</h1>

                                {
                                    admin ?
                                        <button onClick={handleUpdateProduct} className='md:hidden btn outline-none border-none  bg-[#40a297] flex items-center gap-2 rounded-none'>
                                            <MdOutlineUpdate size={25} />
                                            <h1 className='text-[#1a807b] bg-white px-4 py-2'>Update</h1>


                                        </button>
                                        :
                                        <button onClick={handleAddToCart} className='md:hidden btn outline-none border-none  bg-[#40a297] flex items-center gap-2 rounded-none'>
                                            <MdAddShoppingCart size={25} />
                                            <h1 className='text-[#1a807b] bg-white px-4 py-2'>Add to cart</h1>


                                        </button>
                                }
                            </div>
                            <h1 className='text-gray-600 md:mt-5'>{product?.description}</h1>
                            <h1 className='md:mt-16'>Unit Price: <span className='text-[#1a807b] font-bold text-xl '>{product?.unitPrice}</span></h1>
                            <h1 className=''>Available units: <span className='text-[#1a807b] font-bold text-xl '>{product?.availableQuantity}</span></h1>
                            <h1 className=''>Minimum ordered units: <span className='text-[#1a807b] font-bold text-xl '>{product?.minimumOrder}</span></h1>

                            {
                                admin ?
                                    <button onClick={handleUpdateProduct} className='hidden md:flex btn outline-none border-none  bg-[#40a297]  items-center gap-2 rounded-none w-40'>
                                        <MdOutlineUpdate size={25} className="text-white" />
                                        <h1 className='text-[#1a807b] bg-white px-4 py-2'>Update</h1>


                                    </button>

                                    :
                                    <button onClick={handleAddToCart} className='hidden md:flex btn outline-none border-none  bg-[#40a297]  items-center gap-2 rounded-none w-56'>
                                        <MdAddShoppingCart size={25} />
                                        <h1 className='text-[#1a807b] bg-white px-4 py-2'>Add to cart</h1>


                                    </button>
                            }


                        </div>




                        {/* products comments */}






                    </div>

                </div >
            </div>





        </div>
    );
};

export default ProductDetails;