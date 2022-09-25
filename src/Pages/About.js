import React from 'react';
import { Fade, LightSpeed } from 'react-reveal';

const About = () => {
    return (
        <div className=' bg-gradient-to-r from-[#bbc1ba] to-[#7486ed6f] h-[80vh]'>
            <div className="mx-5 lg:mx-10 xl:mx-20 py-20flex items-center justify-center ">

                <div className=' p-5 min-h-[60vh]  w-full lg:w-3/4 flex flex-col justify-center '>


                    <LightSpeed>
                        <h1 className='text-lg sm:text-xl md:text-3xl font-bold tracking-wider text-transparent  bg-clip-text bg-gradient-to-r from-yellow-700 to-green-800'>About Painting Vila </h1>
                    </LightSpeed>
                    <h1 className='my-5 text-xl md:text-2xl font-bold tracking-wider text-green-900'>What We Do?</h1>
                    <Fade right>
                        <div>
                            <p className='text-slate-900 tracking-wide'>
                                No matter what inspired your DIY project, you can count on Painting Vila to have the perfect painting tools for the job. The right kind of brushes. The ideal rollers for every kind of surface. Bring your inspiration to life with Painting Vila, the brand that pros trust for professional results.


                            </p>
                        </div>
                    </Fade>


                </div>
            </div>

        </div>
    );
};

export default About;