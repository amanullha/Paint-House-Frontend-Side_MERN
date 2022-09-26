import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import React, { useEffect, useRef, useState, useCallback, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaUserAstronaut } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Banner from '../Components/Banner';
import CartIcon from '../Components/CartIcon';
import auth from '../firebase.init';
import useAdmin from '../hooks/useAdmin';



const NavBar = ({ children }) => {


    const [user, loading, error] = useAuthState(auth);

    const myRef = useRef();

    const [show, setShow] = useState(true);

    const location = useLocation();

    const locArray = location.pathname.split('/');
    const path = locArray[locArray.length - 1];
    const path2 = locArray[locArray.length - 2];


    const [admin, adminLoading] = useAdmin(user);


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];

            setShow(entry.isIntersecting)
        })
        observer.observe(myRef.current);
    })

    const handleSingOut = () => {

        signOut(auth);
        localStorage.removeItem('accessToken');

    }


    const routeList = <>


        <li><NavLink className={`bg-transparent ${path === '' ? "text-yellow-600" : ''}`} to='/'> Home</NavLink></li>
        {
            user?.uid ? <li><NavLink className={`bg-transparent text-white  ${path === 'products' ? "text-yellow-600" : 'text-white'}`} to='/products'> Products</NavLink></li> : ""
        }

        {
            user ?

                <li><NavLink className={`${path === 'dashboard' || path2 === 'dashboard' ? "text-yellow-600" : 'text-white'} bg-transparent text-white flex flex-col items-start`} to={`${!admin ? '/dashboard/my-orders' : '/dashboard'}`}>
                    <h1>Dashboard</h1>


                    <ui className='lg:hidden flex flex-col ml-5 gap-3'>
                        {
                            admin ?
                                <>

                                    <Link className={`${path === 'dashboard' ? "text-yellow-700" : 'text-white'}`} to='/dashboard'>Summery</Link>
                                    <Link className={`${path === 'all-orders' ? "text-yellow-700" : 'text-white'}`} to='/dashboard/all-orders'>All Orders</Link>
                                    <Link className={`${path === 'add-new-product' ? "text-yellow-700" : 'text-white'}`} to='/dashboard/add-new-product'>Add New Product</Link>
                                    <Link className={`${path === 'update-product' ? "text-yellow-700" : 'text-white'}`} to='/dashboard/update-product'>Update Product</Link>
                                    <Link className={`${path === 'all-users' ? "text-yellow-700" : 'text-white'}`} to='/dashboard/all-users'>Users</Link>

                                </>
                                :


                                <>
                                    <Link className={`${path === 'my-orders' ? "text-yellow-600" : 'text-white'}`} to='/dashboard/my-orders'>My Orders</Link>
                                </>
                        }

                    </ui>


                </NavLink></li>



                : ""
        }
        <li><NavLink className={`${path === 'about' ? "text-yellow-600" : 'text-white'} bg-transparent text-white `} to='about'> About</NavLink></li>
        <li><NavLink className={`${path === 'contact' ? "text-yellow-600" : 'text-white'} bg-transparent text-white`} to='contact'> Contact</NavLink></li>

        {
            user ? '' :
                <>
                    <li><NavLink className={`${path === 'login' ? "text-yellow-600" : 'text-white'}bg-transparent text-white`} to='/login'> Login</NavLink></li>

                    <li><NavLink className={`${path === 'login' ? "text-yellow-600" : 'text-white'}bg-transparent text-white`} to='/sign-up'> SignUp</NavLink></li>


                </>
        }


    </>


    const siedeRuteList =

        <div class={`dropdown dropdown-end flex gap-8 items-center ${!user ? 'hidden' : ''}`}>

            <label className={`${admin ? 'hidden' : 'block'}`}>
                <CartIcon />
            </label>


            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                    {
                        user?.photoURL ? <img src={user?.photoURL} /> :
                            <FontAwesomeIcon className='w-full h-full bg-white ' icon={faUserCircle} />
                    }

                </div>
            </label>




            <ul tabindex="0" class="mt-40 mr-8 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li>
                    <Link to="/profile" class="justify-between">
                        Profile
                        <span class="badge">New</span>
                    </Link>
                </li>
                <li><a>Settings</a></li>
                <li><button className='' onClick={handleSingOut}>Logout</button></li>
            </ul>
        </div>







    return (
        <div>



            <div class="drawer">

                <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />

                <div class="drawer-content flex flex-col ">





                    {/* <!-- Navbar --> */}
                    <div class={` w-full navbar hero p-0 fixed top-0 z-50 ${show ? '' : 'bg-black transition-all duration-1000 ease-in-out'}   ${path.length === 0 || path === 'home' ? "" : 'bg-black transition-all duration-1000 ease-in-out'}     `}>


                        <div className='navbar hero-content mx-auto xl:px-0 px-8'>



                            <div class="flex-none lg:hidden">
                                <label for="my-drawer-3" class="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current text-white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                </label>
                            </div>


                            <Link to="/" class="flex-1 select-none cursor-pointer">
                                <img src="mainLogo.png" alt="" className='w-52' />
                            </Link>

                            <div class="flex-none hidden lg:block ">

                                {/* <!-- Navbar menu content here --> */}
                                <ul class="menu menu-horizontal">
                                    {
                                        routeList
                                    }
                                </ul>
                            </div>

                            <div>
                                {
                                    siedeRuteList
                                }
                            </div>
                        </div>


                    </div>



                    {/* <!-- Page content here --> */}


                    <div className=''>

                        <div className={` ${path === '' || path === 'home' ? 'block' : 'hidden'}`}>
                            <Banner />
                        </div>


                        <div ref={myRef} className="h-1 w-full bg-white"></div>




                        {
                            children
                        }

                    </div>


                </div>





                <div class="drawer-side">

                    <label for="my-drawer-3" class="drawer-overlay"></label>

                    <ul class="menu p-4 overflow-y-auto w-80 bg-[#131a36]">


                        {/* <!-- Sidebar content here --> */}
                        {
                            routeList
                        }

                    </ul>

                </div>


            </div>

        </div>
    );
};

export default NavBar;