import React from 'react';
import HomeProvider from './HomeProvider';

const Home = () => (
    <HomeProvider>
        <HomePresenter />
    </HomeProvider>
);

const HomePresenter = () => (
    <>
        Hello Home.
    </>
);

export default Home;