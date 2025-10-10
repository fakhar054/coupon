// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarouselComponent from '../Components/Home/CarouselComponent';
import Carousel from '../Components/Home/Carousel';
import CardComponent from '../Components/Home/CardComponent';
import Categories from '../Components/Home/Categories';
import StatsSection from '../Components/Home/StatsSection';
import PromiseComponent from '../Components/Home/PromiseComponent';
import CardLogoSection from '../Components/Home/CardLogoSection';
import ImageHover from '../Components/Home/ImageHover';

export default function HomePage(){
    const CACHE_KEY = "homepageData";
    const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const [data, setData] = useState({
        sliders: [],
        categoryCoupon: [],
        categories: [],
        stores: [],
        storesCoupons: [],
        exclusiveCoupons: [],
        verifiedCoupons: [],
        featuredCoupons: [],
        blogs: [],
        homepageBannerOne: null,
        homepageBannerTwo: null,
        seo_setup: null,
        sections: [],
        popupModal: null,
        statistic:[],
        partners: [],

    });
    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        async function fetchData() {
   try { 
        const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));

        if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION) {
          setData(cachedData.data);  
          return;
        }
 
        const response = await axios.get(apiUrl + "api/homepage");
 
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: response.data, timestamp: Date.now() })
        );

        setData(response.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
        }
        fetchData();
    }, []);
    
    return (
        <>
            <CarouselComponent data={data.stores}/>
            <Carousel data={data.sliders}/>
            <CardComponent data={data.categoryCoupon} popupModal={data.popupModal}/>
            <StatsSection data={data.statistic}/>
            <Categories data={data.categories}/>
            {data.homepageBannerOne && <PromiseComponent data={data.homepageBannerOne} />}
            <CardLogoSection data={data.storesCoupons}/>
            <ImageHover data={data.partners}/>
        </>
    );
}
