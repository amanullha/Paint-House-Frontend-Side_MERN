import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import Loading from '../Additional/Loading';
import auth from '../firebase.init';
import useAdmin from '../hooks/useAdmin';
import UserRow from './UserRow';

const AllUsers = () => {

    const [user, loading, error] = useAuthState(auth);

    const [admin, adminLoading] = useAdmin(user)

    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://paint-house-backend.onrender.com/users', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))


    if (isLoading || loading || adminLoading) {
        return <Loading />
    }




    const handleMakeAdmin = (email) => {

        console.log("make admin : ", email);

        fetch(`https://paint-house-backend.onrender.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.warning("You are not an admin for make admin")
                }
                return res.json();
            })
            .then(data => {
                console.log("mama ", data);

                if (data.modifiedCount > 0) {
                    toast.success("Successfully made an Admin")
                    refetch();
                }



            })

    }

    const handleMakeUser = (email) => {

        console.log(user?.email);

        if (user?.email !== 'aullah060@gmail.com') {
            toast.error("You haven't permission to do this!!!")
            return;
        }

        else {

            fetch(`https://paint-house-backend.onrender.com/user/remove-admin/${email}`, {
                method: 'PUT',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 403) {
                        toast.warning("You are not an admin for make admin")
                    }
                    return res.json();
                })
                .then(data => {
                    console.log("mama ", data);

                    if (data.modifiedCount > 0) {
                        toast.success("Removed from admin")
                        refetch();
                    }



                })
        }

    }
    const handleDeleteUser = (_id, role) => {

        console.log("admin: ", admin, "other role: ", role);


        if (!admin) {
            toast.error("You haven't permission to do this!!")
            return;
        }
        if (admin && role === 'admin') {

            toast.error("You haven't permission to do this!!")
            return;
        }

        console.log("delete user : ", _id);

        fetch(`https://paint-house-backend.onrender.com/users/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.warning("You are not an admin for make admin")
                }
                return res.json();
            })
            .then(data => {
                console.log("mama ", data);

                if (data.deletedCount > 0) {
                    toast.success("An user deleted")
                    refetch();
                }



            })

    }


    return (
        <div className="overflow-x-auto ">
            <table className="table w-full">
                {/* <!-- head --> */}
                <thead>
                    <tr >
                        <th className='text-lg w-8'></th>
                        <th className='text-lg'>Name</th>
                        <th className='text-lg'>User Email</th>
                        <th className='text-lg'>Role</th>
                        <th className='text-lg'>Positions</th>
                        <th className='text-lg'>Operation</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((u, i) => <UserRow
                            key={u._id}
                            user={u}
                            refetch={refetch}
                            serial={i}
                            handleMakeAdmin={handleMakeAdmin}
                            handleDeleteUser={handleDeleteUser}
                            handleMakeUser={handleMakeUser}
                            isUserAdmin={admin}
                            loginUser={user}

                        ></UserRow>)
                    }


                </tbody>
            </table>

        </div>
    );
};

export default AllUsers;