import React, { createContext } from 'react';
import Slider from 'infinite-react-carousel';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Fade } from 'react-reveal';




const Banner = () => {

    const settings = {
        autoplay: true,
        arrows: false
    };

    const navigate = useNavigate();
    const handleShoppingClicked = () => {
        navigate('/shoping');
    }


    return (


        <div >
            <div className='relative mb-0 '>

                <Slider {...settings} className="z-0">

                    <div>
                        <img style={{ width: "100%", maxHeight: "90vh", minHeight: "40vh" }} src="https://i.ibb.co/Y75J8F9/anna-kolosyuk-D5nh6m-CW52c-unsplash.jpg" alt="" />
                    </div>
                    <div>
                        <img style={{ width: "100%", maxHeight: "90vh", minHeight: "40vh" }} src="https://i.ibb.co/pZS3nsN/joseph-perez-9l-NEr-Gz-3j-E-unsplash.jpg" alt="" />
                    </div>
                    <div>
                        <img style={{ width: "100%", maxHeight: "90vh", minHeight: "40vh" }} src="https://i.ibb.co/31KWR26/kenny-eliason-d6-Yy-P28-Ycw-unsplash.jpg" alt="" />
                    </div>
                    <div>
                        <img style={{ width: "100%", maxHeight: "90vh", minHeight: "40vh" }} src=" https://i.ibb.co/WHgKKjD/khara-woods-KR84-Rp-MCb0w-unsplash.jpg" alt="" />
                    </div>
                    <div>
                        <img style={{ width: "100%", maxHeight: "90vh", minHeight: "40vh" }} src="https://i.ibb.co/mXx1xcD/roselyn-tirado-GDWmu0b-Ff-S4-unsplash.jpg" alt="" />
                    </div>
                    <div>
                        <img style={{ width: "100%", maxHeight: "90vh", minHeight: "40vh" }} src="https://i.ibb.co/XDr9PTJ/theme-photos-Cl-Op-YWFFm0-unsplash.jpg" alt="" />
                    </div>





                </Slider>

                <div className='w-full h-full text-center   z-10 absolute bg-black bg-opacity-40 top-0 left-0 flex items-center justify-center'>

                    <div className=' sm:w-3/4 sm:mx-0 w-full mx-5 '>

                        <Fade right>
                            <h1 className='text-xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-yellow-500 '>Handcrafted by Pros, for Pros.


                            </h1>
                        </Fade>

                        <Fade left>
                            <div>
                                <p className='text-md md:text-lg mt-5 text-gray-300 w-3/4 mx-auto'>To tell the story of how our tools impact our customers, we spoke to professional painters around the country. See why they love our brushes.</p>
                            </div>
                        </Fade>

                        <Fade top>
                            <div>
                                <button onClick={handleShoppingClicked} className='active:bg-slate-600 mt-5 md:mt-10 md:text-2xl md:px-12 px-5 py-3 bg-yellow-600 rounded-full text-white font-bold md:tracking-widest'>Shop Now</button>
                            </div>
                        </Fade>
                    </div>

                </div>
            </div>

        </div>

    );
};

export default Banner;