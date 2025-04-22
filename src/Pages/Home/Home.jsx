import React from 'react';
import Slider from './Slider';
import SortedVolunteerNeed from './SortedVolunteerNeed';
import SuccessStories from './SuccessStories';
import HowItWorks from './HowItWorks';
import UseTitle from '../../Hook/UseTitle';

const Home = () => {
    UseTitle('Home | VolunteerHub')
    return (
        <div>
            <Slider></Slider>
            <SortedVolunteerNeed></SortedVolunteerNeed>
            <SuccessStories></SuccessStories>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;