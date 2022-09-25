import React from 'react';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import { TailSpin } from 'react-loader-spinner'


const Loading = () => {
    return (
        <div>

            {/* <TailSpin
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /> */}

            <button className="btn loading ">loading</button>

        </div>
    );
};

export default Loading;