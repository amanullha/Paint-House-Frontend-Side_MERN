import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import useAdmin from '../hooks/useAdmin';
import Loading from '../Additional/Loading';
import toast from 'react-hot-toast';
import { GrDocumentUpdate } from 'react-icons/gr';
import { MdRemoveCircle } from 'react-icons/md';
import { useParams } from 'react-router-dom';



const SingleProductUpdate = () => {

    const _id = useParams()._id;

    let loader = true;

    const [user, loading, error] = useAuthState(auth);
    const [ok, setOk] = useState(true);

    const [admin, setAdmin, adminLoading] = useAdmin(user);

    const [save, setSave] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        _id: "",
        name: "",
        image: "",
        description: "",
        minimumOrder: 0,
        availableQuantity: 0,
        unitPrice: 0
    });








    const { data: product, isLoading, refetch } = useQuery('productsData', () => fetch(`https://paint-house-backend.onrender.com/products/${_id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));


    // console.log("product: ", currentProduct);


    if (product?._id && ok) {
        console.log("random ");
        currentProduct.name = product?.name;
        currentProduct.image = product?.image;
        currentProduct.description = product?.description;
        currentProduct.unitPrice = product?.unitPrice;
        currentProduct.availableQuantity = product?.availableQuantity;
        currentProduct.minimumOrder = product?.minimumOrder;

        setOk(false);
    }



    const unitPriceOnChange = (e) => {
        const newValue = parseInt(e.target.value);

        const c = { ...currentProduct }
        c.unitPrice = newValue;

        setCurrentProduct(c);
        setSave(true);
    }
    const stockOnChange = (e) => {
        const newValue = parseInt(e.target.value);
        const c = { ...currentProduct }
        c.availableQuantity = newValue;

        setCurrentProduct(c);
        setSave(true);

    }
    const minOrderOnChange = (e) => {
        const newValue = parseInt(e.target.value);
        const c = { ...currentProduct }
        c.minimumOrder = newValue;
        setCurrentProduct(c);
        setSave(true);

    }




    const handleUpdateProductItem = () => {

        if (!admin) {
            toast.warning("You haven't permission")
            return;
        }


        const UpdateProduct = {
            availableQuantity: currentProduct?.availableQuantity,
            minimumOrder: currentProduct?.minimumOrder,
            unitPrice: currentProduct?.unitPrice,

        }



        fetch(`https://paint-house-backend.onrender.com/update-single-product/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ UpdateProduct: UpdateProduct })
        })
            .then(res => res.json())
            .then(data => {

                console.log("updateProduct: ", data);

                if (data?.acknowledged) {

                    toast.success("Product updated");
                    // updateProductId(null);
                    refetch();
                    setSave(false);

                } else {
                    toast.warning("Something Wrong!")
                }
            })










    }

    if (isLoading) return <h1>loading...</h1>



    return (
        <div className='min-h-screen pt-52'>

            <div className={``}>
                <div className="">



                    <div>

                        <div className='pb-10 w-full flex flex-col justify-center items-center'>
                            <div className='w-full flex justify-center items-center  '>
                                <img className='rounded-3xl max-w-64  max-h-[200px]' src={currentProduct?.image} alt="" />
                            </div>
                            <h1 className='text-sm max-w-xl font-bold  text-black'>{currentProduct?.description}</h1>
                        </div>

                        <div className='flex justify-center gap-5 mt-5'>

                            <div className='flex flex-col gap-8  '>
                                <h1 className='font-bold text-xl text-yellow-700'>Unit price: </h1>
                                <h1 className='font-bold text-xl text-yellow-700'>Stock: </h1>
                                <h1 className='font-bold text-xl text-yellow-700'>Min order: </h1>


                            </div>

                            <div className='flex flex-col gap-5 '>

                                <input onChange={unitPriceOnChange} className='max-w-[150px] text-2xl font-bold bg-transparent text-black border-2 pl-3 ' type="number" name="education" id="" value={currentProduct?.unitPrice} />





                                <input onChange={stockOnChange} className='max-w-[150px] text-2xl font-bold bg-transparent text-black border-2 pl-3 ' type="number" name="address" id="" value={currentProduct?.availableQuantity} />


                                <input onChange={minOrderOnChange} className='max-w-[150px] text-2xl font-bold bg-transparent text-black border-2 pl-3 ' type="number" name="phone" id="" value={currentProduct?.minimumOrder} />

                            </div>









                        </div>
                        <div className='flex justify-center mt-10'>
                            {
                                save ? <h1 className='text-red-700'>Please save changes</h1> : ''
                            }
                        </div>
                        <div className='flex justify-center mt-4'>

                            {
                                save ?

                                    <label onClick={handleUpdateProductItem}
                                        htmlFor="product-update-modal"
                                        className='btn btn-error rounded-lg bg-blue-600 text-white font-bold tracking-wider w-1/2 py-2 text-2xl hover:text-yellow-500 active:bg-blue-400 active:text-black text-center'
                                    >SAVE</label>




                                    :
                                    <label className='rounded-lg bg-blue-300 text-white font-bold tracking-wider w-1/2 py-2 text-2xl text-center' >SAVE</label>
                            }
                        </div>
                    </div>

                    <div className="modal-action">

                    </div>
                </div>
            </div>

        </div>
    );
};

export default SingleProductUpdate;