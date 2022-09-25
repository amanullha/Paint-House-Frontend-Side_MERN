

import React, { useState } from 'react';
import SingleReview from './SingleReview';
import ReactDOM from "react-dom";
import ReactCardCarousel from "react-card-carousel";





const Reviews = () => {


    const [reviews, setReviews] = useState([]);

    useState(() => {

        fetch('http://localhost:5000/reviews', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })


    }, [])

    const CONTAINER_STYLE = {
        position: "relative",
        height: "50vh",
        width: "100%",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "middle"
    }


    const CARD_STYLE = {
        // height: "300px",
        // width: "70%",
        // paddingTop: "80px",
        // textAlign: "center",
        // background: "#52C0F5",
        // color: "#FFF",
        // fontFamily: "sans-serif",
        // fontSize: "12px",
        // textTransform: "uppercase",
        // borderRadius: "10px",
        // boxSizing: "border-box"
    }


    return (
        <div className='mx-5 lg:mx-10 xl:mx-20 py-10 '>

            <h1 className='text-3xl text-center font-bold tracking-wider text-black mb-5'>Clients Reviews</h1>

            <div className='flex justify-center items-center' >



                {/* {
                    reviews?.map(r => <SingleReview
                        key={r?._id}
                        blogQuestion={r?.reviewProduct}
                        blogText={r?.review}
                        blogWriter={r?.reviewer}
                        blogWriterImg={r?.reviewerImage}
                        blogWritingDate={r?.reviewDate}
                        currentValue={r?.reviewStars}

                    />)
                } */}

                <div style={CONTAINER_STYLE} className="overflow-hidden">
                    <ReactCardCarousel autoplay={true} autoplay_speed={2500} >
                        {/* <div style={CARD_STYLE}>First Card</div>
                        <div style={CARD_STYLE}>Second Card</div>
                        <div style={CARD_STYLE}>Third Card</div>
                        <div style={CARD_STYLE}>Fourth Card</div>
                        <div style={CARD_STYLE}>Fifth Card</div> */}

                        {
                            reviews?.map(r => <SingleReview
                                key={r?._id}
                                blogQuestion={r?.reviewProduct}
                                blogText={r?.review}
                                blogWriter={r?.reviewer}
                                blogWriterImg={r?.reviewerImage}
                                blogWritingDate={r?.reviewDate}
                                currentValue={r?.reviewStars}

                            />)
                        }



                    </ReactCardCarousel>
                </div>






            </div >
        </div >
    );
};

export default Reviews;