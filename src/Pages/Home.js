import React from 'react';
import Banner from '../Components/Banner';
import BruchOn from '../Components/BruchOn';
import BusinessSummary from '../Components/BusinessSummary';
import PartnerShip from '../Components/PartnerShip';
import Products from '../Components/Products';
import Reviews from '../Components/Reviews';
import Suggestions from '../Components/Suggestions';

const Home = () => {
    return (
        <div className=''>
            <Products callFrom="home" />

            {/* <Banner /> */}
            <BusinessSummary />
            <BruchOn />
            <Reviews />
            <PartnerShip />
            <Suggestions />

        </div>
    );
};

export default Home;