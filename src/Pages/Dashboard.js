import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsSearch } from 'react-icons/bs';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Loading from '../Additional/Loading';
import auth from '../firebase.init';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {

    const [user, loading, error] = useAuthState(auth);

    const [openDrawer, setOpenDrawer] = useState(false);

    // const [admin, setAdmin] = useAdmin(user);

    const [admin, setAdmin, adminLoading] = useAdmin(user);


    const location = useLocation();

    const locArray = location.pathname.split('/');

    const path = locArray[locArray.length - 1];

    if (loading || adminLoading) {

        return <div className='flex items-center justify-center py-10'>
            <Loading />
        </div>
    }

    const drawerToggler = () => {
        setOpenDrawer(openDrawer ^ 1);
    }

    return (
        <div className=' bg-[#999f9d4a] mt-12 py-3 relative'>



            <label onClick={drawerToggler} htmlFor="dashboard-sidebar" className="hidden fixed z-40 bg-green-200 rounded-r-lg pr-5 cursor-pointer  pl-2 drawer-button lg:hidden text-green-700" title='Menu'>

                {
                    openDrawer ? <FontAwesomeIcon icon={faAnglesLeft} /> : <FontAwesomeIcon icon={faAnglesRight} />

                }
            </label>




            <div className="drawer drawer-mobile h-auto relative">



                <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />



                <div className="drawer-content min-h-screen">
                    {/* <!-- Page content here --> */}
                    {/* <h1 className='text-3xl text-primary font-bold text-center font-bold text-green-900'>Welcome to your Dashboard</h1> */}
                    <div className='w-full py-5 px-5 flex justify-between'>

                        <div className='flex gap-4'>
                            <div class="avatar online">
                                <div class="w-12 sm:w-16 rounded-full">
                                    {user?.photoURL ?
                                        <img src={user?.photoURL} />
                                        :
                                        <img src="https://placeimg.com/192/192/people" />
                                    }

                                </div>
                            </div>

                            <div>
                                <h1 className="uppercase text-lg text-black">{user?.displayName}</h1>
                                <h1 className='text-md text-black'>Role is {admin ? 'Admin' : 'User'}</h1>
                            </div>

                        </div>


                        <div className='h-12 rounded-2xl md:py-1 py-1 pl-3 bg-gray-700 flex items-center gap-2'>
                            <BsSearch className='text-white ' />

                            <input type="text" name="" id="" className='text-white outline-none active:outline-none active:borer-none pl-2 border-gray-400 border-l-2 bg-transparent' placeholder='Search by name' />



                        </div>

                    </div>


                    <Outlet ></Outlet>



                </div>



                <div className="drawer-side  top-0">
                    <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>


                    <ul className="menu p-4  overflow-y-auto w-52  text-base-content py-10">

                        <div>
                            <h1 className='text-2xl font-bold text-yellow-600 '>Dashboard</h1>
                            <hr />
                        </div>



                        {/* <!-- Sidebar content here --> */}

                        <ul className=' hidden lg:flex flex-col gap-4 pt-8'>



                            {
                                admin ?
                                    <>

                                        <Link className={`${path === 'dashboard' ? "text-yellow-700" : 'text-black'}`} to='/dashboard'>Summery</Link>
                                        <Link className={`${path === 'all-orders' ? "text-yellow-700" : 'text-black'}`} to='/dashboard/all-orders'>All Orders</Link>
                                        <Link className={`${path === 'add-new-product' ? "text-yellow-700" : 'text-black'}`} to='/dashboard/add-new-product'>Add New Product</Link>
                                        <Link className={`${path === 'update-product' ? "text-yellow-700" : 'text-black'}`} to='/dashboard/update-product'>Update Product</Link>
                                        <Link className={`${path === 'all-users' ? "text-yellow-700" : 'text-black'}`} to='/dashboard/all-users'>Users</Link>

                                    </>
                                    :


                                    <>
                                        <Link className={`${path === 'my-orders' ? "text-yellow-600" : 'text-black'}`} to='/dashboard/my-orders'>My Orders</Link>
                                    </>
                            }
                        </ul>



                    </ul>

                </div>



            </div>
        </div>
    );
};

export default Dashboard;