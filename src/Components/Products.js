import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Loading from '../Additional/Loading';
import auth from '../firebase.init';
import useAdmin from '../hooks/useAdmin';
import SingleProduct from './SingleProduct';

const Products = ({ callFrom = '' }) => {


    const [user, loading, errorr] = useAuthState(auth);

    const [admin, setAdmin, adminLoading] = useAdmin(user);

    const [totalPages, setTotalPages] = useState(0);
    const [totalProductsPerPage, setTotalProductsPerPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();

    const { isLoading, error, data: products, refetch } = useQuery(['productsArray'], () => fetch(`https://paint-house-backend.onrender.com/get-products?currentPage=${currentPage}&totalProductsPerPage=${totalProductsPerPage}`).then(res => res.json()))


    useEffect(() => {
        refetch();
    }, [currentPage, totalProductsPerPage])


    useEffect(() => {

        const getTotalProductCount = async () => {
            const data = await axios.get(`https://paint-house-backend.onrender.com/get-products-count`)

            // console.log("data: ", data);

            const totalPageCount = data?.data?.productsCount;
            console.log(totalPageCount);

            const newPageCount = Math.ceil(totalPageCount / totalProductsPerPage);
            setTotalPages(newPageCount);

            // console.log("newpage: ",newPageCount);
        }
        getTotalProductCount();



    }, [totalProductsPerPage])

    const handleProductDetails = (_id) => {

        navigate(`/product-details/${_id}`);

    }

    if (isLoading || loading || adminLoading) return <div className='my-10 flex justify-center items-center'><Loading /></div>

    return (
        <div className='py-10 mx-5 lg:mx-10 xl:mx-20'>
            <h1 className='text-center font-bold text-4xl pt-16 pb-10 text-black'>Our New Products</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mx-5'>
                {
                    products?.map(product => <SingleProduct

                        key={product._id}
                        product={product}
                        handleProductDetails={handleProductDetails}
                        user={user}
                        admin={admin}

                    />)
                }
            </div>


            {/* Pagination */}

            <div className={`flex justify-center items-center gap-5 mt-5 mb-10 ${callFrom === 'home' ? 'hidden' : ''}`}>


                <div class="btn-group ">
                    {
                        Array.from({ length: totalPages }).map((p, nbr) =>
                            <button

                                key={nbr} onClick={() => setCurrentPage(nbr + 1)}
                                className={`btn btn-sm ${currentPage === nbr + 1 ? "btn-active" : "bg-white text-black"}`}

                            >
                                {nbr + 1}
                            </button>


                        )
                    }




                </div>

                <select onChange={e => setTotalProductsPerPage(e.target.value)} className='border-2 bg-transparent btn-sm rounded-lg w-16 ' name="" id="">

                    <option value="6" selected>6</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="35">35</option>
                    <option value="50">50</option>

                </select>
            </div>



        </div>
    );
};

export default Products;