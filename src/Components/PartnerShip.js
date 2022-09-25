import React from 'react';
import { Fade } from 'react-reveal';

const PartnerShip = () => {
    return (
        <div className='flex justify-center py-10 mx-5 lg:mx-10 xl:mx-20 min-h-[80vh]'>

            <div className=' md:pt-12 md:pb-16 px-5 py-10'>

                <div>
                    <h1 className='text-lg md:text-3xl  font-bold text-black  pb-16 text-center'>We work in partnership with all the major tools suppliers</h1>
                </div>

                <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

                    <Fade bottom>
                        <div className='p-5 shadow-2xl max-w-md'>
                            <img src="https://heavy.cmsmasters.net/heavy-alternative/wp-content/uploads/sites/2/2019/03/home2-icon1.png" alt="" />
                            <h1 className='text-3xl font-bold py-5'>Automotive
                                Manufacturing</h1>
                            <hr />
                            <h1 className='text-gray-600 py-10'>
                                Industry has consistently embraced innovation to provide a superior level of excellence for all over valuable customers


                            </h1>
                        </div>
                    </Fade>

                    <Fade left>
                        <div className='p-5 shadow-2xl max-w-md'>
                            <img src="https://heavy.cmsmasters.net/heavy-alternative/wp-content/uploads/sites/2/2019/03/home2-icon2.png" alt="" />
                            <h1 className='text-3xl font-bold py-5'>Mechanical
                                Engineering
                            </h1>
                            <hr />
                            <h1 className='text-gray-600 py-10'>
                                Industry has consistently embraced innovation to provide a superior level of excellence for all over valuable customers




                            </h1>
                        </div>
                    </Fade>

                    <Fade bottom>
                        <div className='p-5 shadow-2xl max-w-md'>
                            <img src="https://heavy.cmsmasters.net/heavy-alternative/wp-content/uploads/sites/2/2019/03/home2-icon3.png" alt="" />
                            <h1 className='text-3xl font-bold py-5'>Industrial
                                Construction</h1>
                            <hr />
                            <h1 className='text-gray-600 py-10'>
                                Industry has consistently embraced innovation to provide a superior level of excellence for all over valuable customers




                            </h1>
                        </div>
                    </Fade>
                    <Fade right>
                        <div className='p-5 shadow-2xl max-w-md'>
                            <img src="https://heavy.cmsmasters.net/heavy-alternative/wp-content/uploads/sites/2/2019/03/home2-icon4.png" alt="" />
                            <h1 className='text-3xl font-bold py-5'>Oil & Gas
                                Energy
                            </h1>
                            <hr />
                            <h1 className='text-gray-600 py-10'>
                                Industry has consistently embraced innovation to provide a superior level of excellence for all over valuable customers


                            </h1>
                        </div>
                    </Fade>




                </div>


            </div>
        </div>
    );
};

export default PartnerShip;