import React, { useEffect, useState } from 'react';

const useToken = (user) => {

    const [token, setToken] = useState('');

    useEffect(() => {

        const currentUser = {

            name: user?.user?.displayName,
            email: user?.user?.email,
            image: user?.user?.photoURL,
        }


        // console.log("current 1: ", currentUser);

        const email = user?.user?.email;
        if (email) {

            fetch(`https://paint-house-backend.onrender.com/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    setToken(data?.token);
                    localStorage.setItem('accessToken', data?.token)

                    console.log("in fetch: ", data?.token);
                })
        }



    }, [user])

    console.log("t: ", token);

    return [token];

};

export default useToken;