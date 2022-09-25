import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Fade } from 'react-reveal';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import useAdmin from '../hooks/useAdmin';
import './SingleProduct.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { GrUpdate } from 'react-icons/gr'
import Loading from '../Additional/Loading';


const SingleProduct = ({ product, handleProductDetails, user, admin }) => {

    const { name, image, description, minimumOrder, availableQuantity, unitPrice } = product;




    const navigate = useNavigate();

    const handleAddToCart = () => {

        navigate(`/product-add-to-cart/${product._id}`)
    }
    const handleUpdateProduct = () => {

        navigate(`/product-update/${product._id}`)
    }




    return (
        <Fade bottom>
            <div

                // data-aos='fade-up'
                // data-aos-duration="2000"
                // data-aos-delay="200"

                className='relative main-product-card card-parent'>
                <div className=''>
                    <img className='rounded-lg w-full max-h-[300px]' src={image} alt={name} />
                </div>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <h1 className='text-3xl font-bold text-back mt-1 '>{name}</h1>
                    <h1 className='text-gray-500'>{description?.length > 50 ? description.slice(0, 50) : description}</h1>
                    <h1 className='pb-5'>Unit Price: <span className='text-yellow-700 font-bold text-2xl '>{unitPrice}</span></h1>
                </div>







                <div className='card-child main-product-button rounded-lg bg-black bg-opacity-40 flex justify-end absolute z-10 w-full bottom-0 flex-col gap-2 items-center' >
                    {
                        admin ?

                            <button
                                onClick={handleUpdateProduct}
                                className='active:bg-slate-600  text-md md:text-lg  px-5 py-2 bg-yellow-600 rounded-full text-white font-bold md:tracking-widest hover:bg-yellow-500 w-64 flex items-center justify-center gap-2'>

                                <GrUpdate size={17} className="text-white" />

                                <h1> Update Product</h1>
                            </button>

                            :

                            <button
                                onClick={handleAddToCart}
                                className='active:bg-slate-600  text-md md:text-lg md:px-12 px-5 py-2 bg-yellow-600 rounded-full text-white font-bold md:tracking-widest hover:bg-yellow-500 w-64 flex items-center justify-center gap-2'>

                                <AiOutlineShoppingCart />

                                <h1> Add to Cart</h1>
                            </button>
                    }

                    <button
                        onClick={() => handleProductDetails(product._id)}
                        className='active:bg-slate-600 text-md md:text-lg md:px-12 px-5 py-2 bg-yellow-600 rounded-full text-white font-bold md:tracking-widest hover:bg-yellow-500 w-64 mb-5'>Details
                    </button>
                </div>


            </div>
        </Fade>
    );
};

export default SingleProduct;