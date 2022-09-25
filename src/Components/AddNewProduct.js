import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import Loading from '../Additional/Loading';
import '../Assets/StyleSheets/style.css'

const AddNewProduct = () => {

    let errorMessage;
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const [loader, setLoader] = useState(false);



    const imageStorageKey = '72f50ab39ec96a1ad0d2d7bb89b0f288';


    const onSubmit = async (data) => {
        console.log(data);

        setLoader(true);

        const name = data?.name;
        const description = data?.description;
        const minimumOrder = data?.minimumOrder;
        const availableQuantity = data?.availableQuantity;
        const unitPrice = data?.unitPrice;

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;


        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;

                    const product = {
                        name,
                        description,
                        minimumOrder,
                        availableQuantity,
                        unitPrice,
                        image: img
                    }

                    // add product

                    fetch('http://localhost:5000/product', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success("Product Added Successfully")
                                reset();
                            }
                            else {
                                toast.error("Failed to add Product")
                            }
                        })
                }
            })


        setLoader(false);

    }






    if (loader) {
        return <Loading />
    }


    return (
        <div className='min-h-screen py-20 myOrderBG'>
            {/* <h1 className='text-2xl font-bold text-black text-center py-5'>Add new Product</h1> */}

            <div className='flex justify-center'>
                <form onSubmit={handleSubmit(onSubmit)} >


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <div className="form-control w-full max-w-sm">

                                <label className="label">
                                    <span className="label-text">Product name</span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    className="input input-bordered w-full max-w-xs"
                                    {
                                    ...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Product Name is required'
                                        }

                                    })
                                    }

                                />

                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}


                                </label>

                            </div>
                            <div className="form-control w-full max-w-sm">

                                <label className="label">
                                    <span className="label-text">Product description</span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="Product description"
                                    className="input input-bordered w-full max-w-xs"
                                    {
                                    ...register("description", {
                                        required: {
                                            value: true,
                                            message: 'Product description is required'
                                        }

                                    })
                                    }

                                />

                                <label className="label">
                                    {errors.description?.type === 'required' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}


                                </label>

                            </div>


                            <div className="form-control w-full max-w-sm">

                                <label className="label">
                                    <span className="label-text"> Minimum order quantity</span>
                                </label>

                                <input
                                    type="number"
                                    placeholder="Min quantity"
                                    className="input input-bordered w-full max-w-xs"
                                    {
                                    ...register("minimumOrder", {
                                        required: {
                                            value: true,
                                            message: 'Minimum order quantity is required'
                                        }

                                    })
                                    }

                                />

                                <label className="label">
                                    {errors.minimumOrder?.type === 'required' && <span className="label-text-alt text-red-500">{errors.minimumOrder.message}</span>}


                                </label>

                            </div>



                            <div className="form-control w-full max-w-sm">

                                <label className="label">
                                    <span className="label-text"> Total quantity</span>
                                </label>

                                <input
                                    type="number"
                                    placeholder="Total Entered quantity"
                                    className="input input-bordered w-full max-w-xs"
                                    {
                                    ...register("availableQuantity", {
                                        required: {
                                            value: true,
                                            message: 'Total quantity is required'
                                        }

                                    })
                                    }

                                />

                                <label className="label">
                                    {errors.availableQuantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.availableQuantity.message}</span>}


                                </label>

                            </div>
                        </div>



                        <div>


                            <div className="form-control w-full max-w-sm">

                                <label className="label">
                                    <span className="label-text"> Per unit price</span>
                                </label>

                                <input
                                    type="number"
                                    placeholder="unit price"
                                    className="input input-bordered w-full max-w-xs"
                                    {
                                    ...register("unitPrice", {
                                        required: {
                                            value: true,
                                            message: 'Unit price is required'
                                        }

                                    })
                                    }

                                />

                                <label className="label">
                                    {errors.unitPrice?.type === 'required' && <span className="label-text-alt text-red-500">{errors.unitPrice.message}</span>}


                                </label>

                            </div>










                            <div className="form-control w-full max-w-sm">

                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>

                                <input
                                    type="file"
                                    className="input input-bordered w-full max-w-xs"
                                    {
                                    ...register("image", {
                                        required: {
                                            value: true,
                                            message: 'image is required'
                                        }

                                    })
                                    }

                                />

                                <label className="label">
                                    {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}


                                </label>

                            </div>
                        </div>
                    </div>




                    {errorMessage}



                    <div className="flex justify-center items-center w-full">

                        <input className='mt-5 btn w-full max-w-xs text-white tracking-wider' type="submit" value="Add Product" />
                    </div>


                </form>
            </div>

        </div>
    );
};

export default AddNewProduct;