


import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Additional/Loading';
import auth from '../firebase.init';
import { TbListDetails } from 'react-icons/tb'
import '../Assets/StyleSheets/style.css'


const ProductAddToCart = () => {

    const [user, loading, error] = useAuthState(auth);

    const productId = useParams()._id;
    const [purchaseUnitInput, setPurchaseUnitInput] = useState('0')
    const [errorMessage, setErrorMessage] = useState('')
    const [isButtonDisable, setIsButtonDisable] = useState(true)
    const navigate = useNavigate();

    const { data: product, isLoading, refetch } = useQuery('products', () => fetch(`https://paint-house-backend.onrender.com/products/${productId}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));


    useState(() => {

        if (parseInt(purchaseUnitInput) < product?.minimumOrder && parseInt(purchaseUnitInput) > product?.availableQuantity) {
            setIsButtonDisable(true)
        }
        else {
            setIsButtonDisable(false)
        }

    }, [purchaseUnitInput])



    if (isLoading || loading) {
        return <div className='flex items-center justify-center'> <Loading /></div>
    }



    const handlePlus = () => {
        setPurchaseUnitInput(parseInt(purchaseUnitInput) + 1)
    }
    const handleMinus = () => {

        let val = parseInt(purchaseUnitInput);

        let x = val - 1 < 0 ? 0 : val - 1;
        setPurchaseUnitInput(x);
    }
    const handleInputOnChange = (e) => {

        const newValue = e.target.value;

        setPurchaseUnitInput(newValue)
    }

    const handlePlaceAddToCart = () => {

        const orderedQuantity = parseInt(purchaseUnitInput);
        // const existingQuantity = product?.availableQuantity - orderedQuantity;

        fetch(`https://paint-house-backend.onrender.com/products/${product._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ orderedQuantity: orderedQuantity })

        })
            .then(res => res.json())
            .then(data => {
                console.log("updated data; ", data);
                if (data?.acknowledged) {
                    toast.success("Product added to your cart")
                    refetch();

                    const order = {
                        productName: product?.name,
                        productId: product?._id,
                        purcheseQuentity: parseInt(purchaseUnitInput),
                        perUnitPrice: product?.unitPrice,
                        paymentStatus: false,
                        purchaseDate: getDateAndTime(),
                        productImage: product?.image,

                    }
                    addOrderToDb(order);



                }
            })

    }


    const getDateAndTime = () => {
        return new Date().toLocaleString();
    }


    const addOrderToDb = (order) => {

        if (user) {

            order.userEmail = user?.email;
            fetch(`https://paint-house-backend.onrender.com/orders`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(order)
            })
                .then(res => res.json())
                .then(data => {
                    console.log("order Added data: ", data);

                })
        }
    }


    const handleToProductDetails = () => {
        navigate(`/product-details/${productId}`);
    }

    return (
        <div className='productAddToCartBG'>
            <div className='py-20 md:py-32 px-5 hero min-h-screen'>
                <div className='flex flex-col md:flex-row justify-evenly gap-5 hero-content'>

                    <div className='w-full md:w-5/12'>
                        <img className='rounded-lg w-full h-[200px] md:h-[400px]' src={product?.image} alt={product?.name} />
                    </div>

                    <div className='flex flex-col  gap-2 md:w-7/12'>
                        <h1 className='text-3xl font-bold text-black flex items-center'>
                            <h1>{product?.name}</h1>
                            <span onClick={handleToProductDetails} className='mt-1 ml-3 cursor-pointer text-[#157b45]'><TbListDetails size={20} /></span>

                        </h1>
                        <h1 className='text-gray-500'>{product?.description}</h1>
                        <h1 className=''>Unit Price: <span className='text-yellow-700 font-bold text-2xl '>{product?.unitPrice}</span></h1>
                        <h1 className=''>Available units: <span className='text-yellow-700 font-bold text-2xl '>{product?.availableQuantity}</span></h1>
                        <h1 className=''>Minimum ordered units: <span className='text-yellow-700 font-bold text-2xl '>{product?.minimumOrder}</span></h1>


                        <div className='mt-10'>
                            <div>

                                <h1 className=' text-red-600 font-bold '>
                                    {
                                        product?.availableQuantity < product?.minimumOrder ? "Minimum product are not available to SELL" : ""
                                    }
                                    {
                                        parseInt(purchaseUnitInput) < product?.minimumOrder && product?.availableQuantity >= product?.minimumOrder ? "You have to order at least Minimum quantity" : ""
                                    }
                                    {
                                        parseInt(purchaseUnitInput) > product?.availableQuantity ? " You have to order between Minimum Quantity to Available quantity" : ""
                                    }
                                    {
                                        purchaseUnitInput?.length === 0 ? "Please order Minimum quantity" : ""
                                    }


                                </h1>


                            </div>
                            <div className='flex items-center gap-3'>
                                <label htmlFor="">Purchase units: </label>
                                <div className='flex '>

                                    <h1 onClick={handleMinus} className='bg-red-300 px-3 font-extrabold text-3xl text-red-800 active:bg-red-500'>-</h1>

                                    <input onChange={handleInputOnChange} className='text-2xl font-bold bg-transparent text-black border-2 pl-3 max-w-[100px]' placeholder={purchaseUnitInput} type="number" name="purchaseUnit" id="" value={purchaseUnitInput} />

                                    <h1 onClick={handlePlus} className='bg-green-300 text-green-800 px-3 font-extrabold text-3xl active:bg-green-600'>+</h1>
                                </div>

                            </div>

                            <div>
                                {
                                    parseInt(purchaseUnitInput) < product?.minimumOrder || parseInt(purchaseUnitInput) > product?.availableQuantity || purchaseUnitInput?.length === 0 ?


                                        <button
                                            disabled

                                            className=' md:w-3/4 lg:w-2/4 w-full  mt-5 md:text-2xl md:px-12 px-5 py-2 bg-gray-300 rounded-lg text-white font-bold md:tracking-widest '>Place to Cart</button>
                                        :
                                        <button
                                            onClick={handlePlaceAddToCart}
                                            className=' md:w-3/4 lg:w-2/4 w-full active:bg-slate-600 mt-5 md:text-2xl md:px-12 px-5 py-2 bg-yellow-600 rounded-lg text-white font-bold md:tracking-widest hover:bg-yellow-500'>Place to Cart</button>
                                }

                            </div>
                        </div>


                    </div>
                </div>

            </div >
        </div>
    );
};

export default ProductAddToCart;