import React from 'react';
import toast from 'react-hot-toast';
import { MdRemoveCircle } from 'react-icons/md'

const UserRow = ({ user, refetch, serial, handleMakeAdmin, handleDeleteUser, handleMakeUser, isUserAdmin, loginUser }) => {

    const { email, role, name, _id } = user;




    return (

        <tr className=''>
            <th className='bg-gray-100'>{serial + 1}</th>
            <th>{name}</th>
            <th>{email}</th>
            <th>{role !== "admin" ? <button onClick={() => handleMakeAdmin(email)} className='btn btn-xs'>Make Admin</button> : <button className='rounded-lg border-2 hover:text-yellow-800 w-[95px] bg-green-100 text-black hover:text-white ' >Admin</button>}</th>




            <th>



                {
                    email === "aullah060@gmail.com" ?

                        <h1 className='ml-8 text-green-600'>Supper admin</h1>

                        :

                        <>
                            {
                                role === 'admin' && isUserAdmin && loginUser?.email !== 'aullah060@gmail.com' ?

                                    <h1 className='ml-8 text-gray-500 text-center'>N/A</h1>
                                    :
                                    <button onClick={() => handleMakeUser(email)} className='flex items-center border-2 border-transparent hover:border-red-200 rounded-full px-2 py-1 active:bg-red-300'>

                                        <MdRemoveCircle size={25} className="text-red-400 rounded-full mr-1" />
                                        <h1>remove admin</h1>
                                    </button>
                            }

                        </>



                }


            </th>

            <th>



                <div className={` ${loginUser?.email === 'aullah060@gmail.com' ? 'block' : 'hidden'}`} >
                    {
                        email === 'aullah060@gmail.com' ?
                            <h1 className='ml-8 text-gray-500 text-center'>N/A</h1>
                            :
                            <button onClick={() => handleDeleteUser(_id, role)} className='flex items-center border-2 border-transparent hover:border-red-200 rounded-full px-2 py-1 active:bg-red-300'>

                                <MdRemoveCircle size={25} className="text-red-400 rounded-full mr-1" />
                                <h1>Delete</h1>
                            </button>
                    }

                </div>

                <div className={` ${loginUser?.email !== 'aullah060@gmail.com' ? 'block' : 'hidden'}`} >
                    {
                        email === 'aullah060@gmail.com' || role === 'admin' ?
                            <h1 className='ml-8 text-gray-500 text-center'>N/A</h1>
                            :
                            <button onClick={() => handleDeleteUser(_id, role)} className='flex items-center border-2 border-transparent hover:border-red-200 rounded-full px-2 py-1 active:bg-red-300'>

                                <MdRemoveCircle size={25} className="text-red-400 rounded-full mr-1" />
                                <h1>Delete</h1>
                            </button>
                    }

                </div>

                {/* <span>{user?.email}</span> */}

                {/* <h1 className='ml-8 text-green-600'>N/A</h1> */}

                {/* <button onClick={() => handleDeleteUser(_id, role)} className='flex items-center border-2 border-transparent hover:border-red-200 rounded-full px-2 py-1 active:bg-red-300'>

                    <MdRemoveCircle size={25} className="text-red-400 rounded-full mr-1" />
                    <h1>Delete</h1>
                </button> */}

            </th>
        </tr>

    );
};

export default UserRow;