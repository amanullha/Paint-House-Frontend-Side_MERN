import { faCommentMedical, faMessage, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import { Fade } from 'react-reveal';

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

};

const SingleReview = ({ blogText, blogQuestion, blogWriter, blogWriterImg, blogWritingDate, currentValue }) => {

    const stars = Array(5).fill(0);

    const [less, setLess] = useState(0);
    const [addComment, setAddComment] = useState(0);
    const [command, setCommand] = useState("Read More..");

    const lessClicked = () => {
        setLess(less ^ 1);
        less ? setCommand('Read More...') : setCommand('Read Less..');
        console.log(less);
    }
    const addCommentClicked = () => {
        setAddComment(addComment ^ 1);
    }


    return (

        // <Fade top>
            <div className=' md:w-[600px] md:h-[400px] m-3 shadow-xl p-3 rounded-lg bg-[#ecf3f0] '>
                <div className=" flex items-center justify-between bg-slate-200">
                    <div className=" flex items-center gap-2 ">


                        {
                            blogWriterImg ? <img width={100} className="h-[80px] rounded-r-full" src={blogWriterImg} alt="" /> :
                                <img width={100} className="h-[80px] rounded-r-full" src="https://api.lorem.space/image/face?hash=33791" />
                        }




                        <sub className='text-gray-500'>By</sub>

                        <div className="blogTexter ">
                            <h3 className='text-3xl text-yellow-800'>{blogWriter}</h3>
                            <h5 className=' text-red-400 '>{blogWritingDate}</h5>
                        </div>
                    </div>

                    <div className=" ">






                        {/* <button className='rounded-l-full bg-blue-600 h-[80px] px-5 text-white font-bold active:bg-blue-300 active:text-black' >Follow</button> */}
                    </div>

                </div>
                <div className=" blogText-section pl-2 mt-3 tracking-wide">
                    <h1 className='font-bold text-3xl'>{blogQuestion}</h1>


                    <p className='pl-2 mt-3'>{blogText?.slice(0, 50)}</p>
                    <button className='pl-2' onClick={lessClicked}>{command}</button>
                </div>
                <div className="comment pl-2 mt-3 bg-slate-50 p-2">
                    <div className='flex items-center gap-5'>

                        <FontAwesomeIcon className='border p-2 rounded-full active:bg-green-400' icon={faThumbsUp} />
                        <FontAwesomeIcon className='border p-2 rounded-full active:bg-red-400' icon={faThumbsDown} />




                        {/* <div className="rating">

                        <input type="radio" name="rating-1" className="mask mask-star" />
                        <input type="radio" name="rating-1" className="mask mask-star" />

                        <input type="radio" name="rating-1" className="mask mask-star" />

                        <input type="radio" name="rating-1" className="mask mask-star" />

                        <input type="radio" name="rating-1" className="mask mask-star" />

                    </div> */}

                        <div>
                            <div style={styles.container}>
                                <div style={styles.stars}>
                                    {stars.map((_, index) => {
                                        return (
                                            <FaStar
                                                key={index}
                                                size={24}

                                                color={(currentValue) > index ? colors.orange : colors.grey}
                                                style={{
                                                    marginRight: 10,
                                                    cursor: "pointer"
                                                }}
                                            />
                                        )
                                    })}
                                </div>

                                {/* <h1>{hoverValue} {currentValue} {stars}</h1> */}



                            </div>
                        </div>


                    </div>



                </div>



            </div>
        // </Fade>

    );
};
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    stars: {
        display: "flex",
        flexDirection: "row",
    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "20px 0",
        minHeight: 100,
        width: 300
    },
    button: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        padding: 10,
    }

};

export default SingleReview;