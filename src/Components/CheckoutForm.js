import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const CheckoutForm = (props) => {

    const [errorMgs, setErrorMgs] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [paymentSuccess, setPaymentSuccess] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [processing, setProcessing] = useState(false)

    const stripe = useStripe();
    const elements = useElements();

    // const { productName, productId, purcheseQuentity, perUnitPrice, userEmail } = order;
    const order = props?.order;
    const refetch = props?.refetch;

    const productName = order?.productName;
    const productId = order?.productId;
    const purcheseQuentity = order?.purcheseQuentity;
    const perUnitPrice = order?.perUnitPrice;
    const userEmail = order?.userEmail;
    const orderId = order?._id;


    const price = purcheseQuentity * perUnitPrice;

    //payment useEffect
    useEffect(() => {



        fetch('https://paint-house-backend.onrender.com/create-payment-intent', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {

                if (data?.clientSecret) {
                    setClientSecret(data?.clientSecret)
                }

            })


    }, [price])




    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {

            return;
        }


        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });




        if (error) {
            console.log('[error]', error);
            setErrorMgs(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setErrorMgs('');
        }







        // confirm card payment


        setPaymentSuccess('');
        setProcessing(true)

        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: userEmail,
                        name: productName,
                    },
                },
            },
        );





        if (intentError) {
            setErrorMgs(intentError.message);
            setProcessing(false)

        }
        else {
            setErrorMgs('');
            setTransactionId(paymentIntent?.id)
            console.log(paymentIntent);
            setPaymentSuccess("Congrats!! your payment is completed.");


            //update payment status at backend 

            const payment = {

                productName: productName,
                orderId: orderId,
                transactionId: paymentIntent.id,

            }

            fetch(`https://paint-house-backend.onrender.com/order/payment-status/${orderId}`, {

                method: "PATCH",
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)


            })
                .then(res => res.json())
                .then(data => {

                    setProcessing(false);
                    refetch();

                })

        }



        if (processing) return <h1>Loading...</h1>


    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='mx-auto my-5 btn btn-primary' type="submit" disabled={!stripe || !clientSecret || paymentSuccess}>
                    Pay
                </button>


                {/* <h1>stripe:{stripe? 'true':'false' }</h1> */}
                {/* <h1>clientSecret:{clientSecret}</h1> */}


            </form>

            {
                errorMgs && <p className='text-center text-red-500'>{errorMgs}</p>
            }

            {
                paymentSuccess && <div>
                    <p className='text-center text-green-500'>{paymentSuccess}</p>
                    <p > your transaction id is :<span className='text-center text-green-500 font-bold'> {transactionId}</span></p>


                </div>
            }

        </div>
    );
};

export default CheckoutForm;