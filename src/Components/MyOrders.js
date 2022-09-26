import { signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Loading from '../Additional/Loading';
import auth from '../firebase.init';
import { BsCartCheck } from 'react-icons/bs'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51LmAoEB3NUX3b711lpHJd1J2qH4g2qpFs5cvbCQISFTRE3KsAeh16xRaYIMSMWxTLxDI0kny4T0AgsZ4s43Ug1Q300vQggvRiM');


const MyOrders = () => {

    // const [orders, setOrders] = useState([])
    const [user, loading, error] = useAuthState(auth);
    const [cancelItem, setCancelItem] = useState(null)
    const [paymentProduct, setPaymentProduct] = useState(null);

    const navigate = useNavigate();


    const { data: orders, isLoading, refetch } = useQuery('my-orders', () => fetch(`https://whispering-ravine-55878.herokuapp.com/my-orders?email=${user?.email}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (loading || isLoading) {
        <Loading />
    }


    const handleDeleteOrderedItem = () => {

        if (cancelItem) {

            fetch(`https://whispering-ravine-55878.herokuapp.com/order/${cancelItem._id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log("delteItem: ", data);
                    if (data?.deletedCount) {
                        addCancelOrderQuantityToDb(cancelItem)
                        // toast.success("Deleted Successfully");
                        setCancelItem(null);
                        refetch();
                    } else {
                        toast.error("You can't delete")
                    }
                })

        }
    }


    const addCancelOrderQuantityToDb = (item) => {

        fetch(`https://whispering-ravine-55878.herokuapp.com/products/${item?.productId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ orderedQuantity: (-1 * item?.purcheseQuentity) })

        })
            .then(res => res.json())
            .then(data => {
                console.log("updated data; ", data);
                if (data?.acknowledged) {
                    toast.success("Deleted Successfully");
                }
            })
    }

    return (
        <div className=''>

            {/* <h1 className='text-center text-3xl my-3 font-bold tracking-wider'>My Orders </h1> */}
            {/* {orders?.length} */}




            <div className="overflow-x-auto">
                <table className="table  w-full mx-2">
                    <thead>
                        <tr>
                            <th className='text-center'>No.</th>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Unit Price</th>
                            <th className='text-center'>Total</th>
                            <th className='text-center'>Date</th>
                            <th className='text-center'>Status</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order, index) =>
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{order?.productName}</td>
                                    <td>{order?.purcheseQuentity}</td>
                                    <td>{order?.perUnitPrice} X {order?.purcheseQuentity} = {order?.perUnitPrice * order?.purcheseQuentity}</td>

                                    <td>{order?.purchaseDate}</td>

                                    {
                                        order?.paymentStatus ? <td className='text-green-600 font-bold '>Paid</td> : <td className='text-red-600 font-bold '>Unpaid</td>
                                    }


                                    {
                                        order?.paymentStatus ?

                                            <td>
                                                Panding
                                            </td>
                                            :
                                            <td className='flex justify-evenly items-center gap-3'>

                                                {/* <td htmlFor="cancel-modal" className='modal-button  h-full w-1/2  hover:text-white active:bg-blue-900 cursor-pointer font-bold text-center  bg-red-300 text-red-700'>Cancel Order
                                                </td> */}

                                                <label className=''>

                                                    <label onClick={() => setCancelItem(order)} htmlFor="cancel-modal" className='gap-2 flex items-center border-2 border-transparent hover:border-red-200 rounded-full px-2 py-1 active:bg-red-300 cursor-pointer text-red-600 bg-red-50' >
                                                        <MdRemoveCircleOutline />
                                                        <span >Cancel Order</span>
                                                    </label>



                                                </label>


                                                <label onClick={() => setPaymentProduct(order)} htmlFor='payment-modal' className=' gap-2 flex items-center border-2 border-transparent hover:border-green-200 rounded-full px-2 py-1 active:bg-green-300 cursor-pointer text-green-600 bg-green-50'>
                                                    <BsCartCheck />
                                                    <span >Place Order</span>

                                                </label>
                                            </td>

                                    }
                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>






            {/* Modal  */}


            {/* <!-- The button to open modal --> */}
            {/* <label htmlFor="cancel-modal" className="btn modal-button">open modal</label> */}

            {/* <!-- Put this part before </body> tag-- > */}

            <input type="checkbox" id="cancel-modal" className="modal-toggle" />

            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">

                    <div className=' w-full bg-yellow-700'>
                        <label htmlFor="cancel-modal" className='float-right bg-red-100 px-2 py-1 rounded-full text-red-700 cursor-pointer'>X</label>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg">Are you sure</h3>
                        <p className="py-4">To cancel the order press [YES] button,else press[NO]</p>

                        <div className='flex justify-center w-full mt-5 gap-5'>
                            {/* <button htmlFor="cancel-modal" onClick={handleDeleteOrderedItem} className='btn btn-error'>YES</button> */}

                            <label htmlFor="cancel-modal" onClick={handleDeleteOrderedItem} className='btn btn-error'>YES</label>

                            <label htmlFor="cancel-modal" className='btn btn-success'>NO</label>
                        </div>
                    </div>










                    <div className="modal-action">

                    </div>
                </div>
            </div>







            {/* PAYMENT MODAL  */}


            <input type="checkbox" id="payment-modal" className="modal-toggle" />

            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">

                    <div className=' w-full bg-yellow-700'>
                        <label onClick={() => setPaymentProduct(null)} htmlFor="payment-modal" className='float-right bg-red-100 px-2 py-1 rounded-full text-red-700 cursor-pointer'>X</label>
                    </div>

                    <div>


                        <h1>You have ordered  <span className='text-yellow-700'> {paymentProduct?.productName}</span> at {paymentProduct?.purchaseDate}</h1>

                        <h1 className='my-3'>Total payable : {paymentProduct?.purcheseQuentity} x {paymentProduct?.perUnitPrice} = <span className='font-bold ml-1'>{paymentProduct?.purcheseQuentity * paymentProduct?.perUnitPrice} </span></h1>



                        <div>


                            {
                                paymentProduct ?

                                    <Elements stripe={stripePromise}>
                                        <CheckoutForm order={paymentProduct} refetch={refetch} />
                                    </Elements>

                                    : ''


                            }

                            {/* <Elements stripe={stripePromise}>
                                <CheckoutForm order={paymentProduct} />
                            </Elements> */}










                        </div>



                        {/* <div className='flex justify-center w-full mt-5 gap-5'>


                            <label htmlFor="payment-modal" onClick={handleDeleteOrderedItem} className='btn btn-error'>YES</label>

                            <label htmlFor="payment-modal" className='btn btn-success'>NO</label>


                        </div> */}



                    </div>










                    <div className="modal-action">

                    </div>
                </div>
            </div>







        </div >
    );
};

export default MyOrders;