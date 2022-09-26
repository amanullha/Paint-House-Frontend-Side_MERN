import React, { useEffect, useState } from 'react';
import { Fade } from 'react-reveal';

const BusinessSummary = () => {


    const [summary, setSummary] = useState({})

    useEffect(() => {

        fetch('https://paint-house-backend.onrender.com/summary')
            .then(res => res.json())
            .then(data => {
                setSummary(data)
            })
    }, [])


    return (
        <div className='py-10 mx-5 lg:mx-10 xl:mx-20'>

            <div className='py-12'>
                <div className="flex justify-center items-center">
                    <div className='m-5'>

                        <h1 className='text-3xl md: text-5xl font-bold tracking-wider text-green-800 py-5 lg:py-12 text-center'>The Painting Vila Difference</h1>
                        <p>From the first Painting Vila brush built in 1925 to the wide range of products we make today, one thing has stayed true – our dedication to craft and quality. And it’s still at the heart of every tool we make.</p>

                    </div>
                </div>



                <div className="stats flex justify-center py-10 ">

                    <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 justify-center items-center'>

                        <div >
                            <Fade left>

                                <div className="stat rounded-3xl shadow">
                                    <div className="stat-figure text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                    </div>
                                    <div className="stat-title">Total Products</div>
                                    <div className="stat-value text-primary">{summary?.products}</div>
                                    <div className="stat-desc">50% new product added</div>
                                </div>

                            </Fade>
                        </div>

                        <div >
                            <Fade top>

                                <div className="stat rounded-3xl shadow">
                                    <div className="stat-figure text-secondary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    </div>
                                    <div className="stat-title ">Total Users</div>
                                    <div className="stat-value text-green-700">{summary?.users}</div>
                                    <div className="stat-desc">50% more than last month</div>
                                </div>

                            </Fade>
                        </div>


                        <div >
                            <Fade bottom>

                                <div className="stat rounded-3xl shadow">
                                    <div className="stat-figure text-secondary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    </div>
                                    <div className="stat-title">Total Orders</div>
                                    <div className="stat-value text-secondary">{summary?.orders}</div>
                                    <div className="stat-desc">30% more than last month</div>
                                </div>

                            </Fade>
                        </div>
                        <div >
                            <Fade top>

                                <div className="stat rounded-3xl shadow">
                                    <div className="stat-figure text-secondary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    </div>
                                    <div className="stat-title">Total Reviews</div>
                                    <div className="stat-value text-yellow-600">{summary?.reviews}</div>
                                    <div className="stat-desc">21% more than last month</div>
                                </div>

                            </Fade>
                        </div>
                        <div >
                            <Fade bottom>

                                <div className="stat rounded-3xl shadow">
                                    <div className="stat-value">86%</div>
                                    <div className="stat-title">Satisfied customers</div>
                                </div>

                            </Fade>
                        </div>









                    </div>






                </div>
            </div>

        </div>
    );
};

export default BusinessSummary;