import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import Loading from '../Additional/Loading';
import auth from '../firebase.init';

const Profile = () => {

    const [loader, setLoader] = useState(true);
    const [reload, setReload] = useState(false);

    const [profile, setProfile] = useState({});
    const [save, setSave] = useState(false);
    const [user, loading, error] = useAuthState(auth);

    const [education, setEducation] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [linkedIn, setLinkedIn] = useState('')




    useEffect(() => {
        setLoader(true);

        fetch(`http://localhost:5000/my-profile?email=${user?.email}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log("profile data: ", data);
                setProfile(data);

                setEducation(data?.education);
                setAddress(data?.address);
                setPhone(data?.phone);
                setLinkedIn(data?.linkedIn);
                // console.log("edu: ", education);
            })

        setLoader(false);

    }, [reload])




    if (loading || loader) {
        <Loading />
    }
   

    const educationOnChange = (e) => {
        const newValue = e.target.value;
        setEducation(newValue)
        setSave(true);
    }
    const addressOnChange = (e) => {
        const newValue = e.target.value;
        setAddress(newValue)
        setSave(true);

    }
    const phoneOnChange = (e) => {
        const newValue = e.target.value;
        setPhone(newValue)
        setSave(true);

    }
    const linkedInOnChange = (e) => {
        const newValue = e.target.value;
        setLinkedIn(newValue)
        setSave(true);

    }

    const handleSave = () => {

        const profileData = {
            education,
            phone,
            linkedIn,
            address
        }
        // console.log("update profile: ", profileData);

        fetch(`http://localhost:5000/my-profile/${profile._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ profile: profileData })

        })
            .then(res => res.json())

            .then(data => {

                // console.log("updated data; ", data);

                if (data?.acknowledged) {

                    toast.success("Profile Updated")
                    // refetch();
                    setReload(reload ^ 1);
                    setSave(false)
                }
            })
    }

    return (
        <div className='min-h-screen py-20'>
            {/* <h1>My profile</h1> */}
            <div className='flex justify-center items-center flex-col gap-2'>

                {profile.image ? <img src={profile?.image} alt="" /> : <img width={200} src='https://cdn-icons-png.flaticon.com/512/219/219983.png' alt="" />

                }

                <h1 className='text-3xl font-bold text-black'>{profile?.name}</h1>
                <h1 >{profile?.email}</h1>
            </div>
            <div className='flex justify-center gap-5 m-5'>

                <div className='flex flex-col gap-8  '>
                    <h1 className='font-bold text-xl text-yellow-700'>Education: </h1>
                    <h1 className='font-bold text-xl text-yellow-700'>Phone: </h1>
                    <h1 className='font-bold text-xl text-yellow-700'>LinkedIn: </h1>
                    <h1 className='font-bold text-xl text-yellow-700'>Address: </h1>

                </div>

                <div className='flex flex-col gap-5 '>

                    <input onChange={educationOnChange} className='text-2xl font-bold bg-transparent text-black border-2 pl-3 ' type="text" name="education" id="" value={education} />

                    <input onChange={phoneOnChange} className='text-2xl font-bold bg-transparent text-black border-2 pl-3 ' type="text" name="phone" id="" value={phone} />
                    <input onChange={linkedInOnChange} className='text-2xl font-bold bg-transparent text-black border-2 pl-3 ' type="text" name="linkedIn" id="" value={linkedIn} />
                    <textarea onChange={addressOnChange} className='text-2xl font-bold bg-transparent text-black border-2 pl-3 ' type="text" name="address" id="" value={address} />

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
                        <button onClick={handleSave} className='rounded-lg bg-blue-600 text-white font-bold tracking-wider w-1/2 py-2 text-2xl hover:text-yellow-500 active:bg-blue-400 active:text-black' >Save</button>
                        :
                        <button className='rounded-lg bg-blue-300 text-white font-bold tracking-wider w-1/2 py-2 text-2xl ' >Save</button>
                }
            </div>
        </div>
    );
};

export default Profile;