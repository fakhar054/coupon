// // eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import CarouselComponent from '../Components/Home/CarouselComponent';
// import Carousel from '../Components/Home/Carousel';
// import CardComponent from '../Components/Home/CardComponent';
// import Categories from '../Components/Home/Categories';
// import StatsSection from '../Components/Home/StatsSection';
// import PromiseComponent from '../Components/Home/PromiseComponent';
// import CardLogoSection from '../Components/Home/CardLogoSection';
// import ImageHover from '../Components/Home/ImageHover';

// export default function HomePage(){
//     const CACHE_KEY = "homepageData";
//     const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

//     const [data, setData] = useState({
//         sliders: [],
//         categoryCoupon: [],
//         categories: [],
//         stores: [],
//         storesCoupons: [],
//         exclusiveCoupons: [],
//         verifiedCoupons: [],
//         featuredCoupons: [],
//         blogs: [],
//         homepageBannerOne: null,
//         homepageBannerTwo: null,
//         seo_setup: null,
//         sections: [],
//         popupModal: null,
//         statistic:[],
//         partners: [],

//     });
//     useEffect(() => {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         async function fetchData() {
//    try {
//         const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));

//         if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION) {
//           setData(cachedData.data);
//           return;
//         }

//         const response = await axios.get(apiUrl + "api/homepage");

//         localStorage.setItem(
//           CACHE_KEY,
//           JSON.stringify({ data: response.data, timestamp: Date.now() })
//         );

//         setData(response.data);
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//         }
//         fetchData();
//     }, []);

//     return (
//         <>
//             <CarouselComponent data={data.stores}/>
//             <Carousel data={data.sliders}/>
//             <CardComponent data={data.categoryCoupon} popupModal={data.popupModal}/>
//             <StatsSection data={data.statistic}/>
//             <Categories data={data.categories}/>
//             {data.homepageBannerOne && <PromiseComponent data={data.homepageBannerOne} />}
//             <CardLogoSection data={data.storesCoupons}/>
//             <ImageHover data={data.partners}/>
//         </>
//     );
// }

//////////////////////

// HomePage.jsx
import React, { useEffect, useState, Suspense, memo } from "react";
import axios from "axios";

// Lazy load components
const CarouselComponent = React.lazy(() =>
  import("../Components/Home/CarouselComponent")
);
const Carousel = React.lazy(() => import("../Components/Home/Carousel"));
const CardComponent = React.lazy(() =>
  import("../Components/Home/CardComponent")
);
const Categories = React.lazy(() => import("../Components/Home/Categories"));
const StatsSection = React.lazy(() =>
  import("../Components/Home/StatsSection")
);
const PromiseComponent = React.lazy(() =>
  import("../Components/Home/PromiseComponent")
);
const CardLogoSection = React.lazy(() =>
  import("../Components/Home/CardLogoSection")
);
const ImageHover = React.lazy(() => import("../Components/Home/ImageHover"));

// Memoized wrapper to prevent unnecessary re-renders
const MemoCarouselComponent = memo(CarouselComponent);
const MemoCarousel = memo(Carousel);
const MemoCardComponent = memo(CardComponent);
const MemoCategories = memo(Categories);
const MemoStatsSection = memo(StatsSection);
const MemoPromiseComponent = memo(PromiseComponent);
const MemoCardLogoSection = memo(CardLogoSection);
const MemoImageHover = memo(ImageHover);

export default function HomePage() {
  const CACHE_KEY = "homepageData";
  const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours

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
    statistic: [],
    partners: [],
  });

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    async function fetchData() {
      try {
        const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));

        if (
          cachedData &&
          Date.now() - cachedData.timestamp < CACHE_EXPIRATION
        ) {
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
      {/* Suspense with fallback for smoother UX */}
      <Suspense fallback={<div>Loading slider...</div>}>
        <MemoCarouselComponent data={data.stores} />
      </Suspense>

      <Suspense fallback={null}>
        <MemoCarousel data={data.sliders} />
      </Suspense>

      <Suspense fallback={null}>
        <MemoCardComponent
          data={data.categoryCoupon}
          popupModal={data.popupModal}
        />
      </Suspense>

      <Suspense fallback={null}>
        <MemoStatsSection data={data.statistic} />
      </Suspense>

      <Suspense fallback={null}>
        <MemoCategories data={data.categories} />
      </Suspense>

      {data.homepageBannerOne && (
        <Suspense fallback={null}>
          <MemoPromiseComponent data={data.homepageBannerOne} />
        </Suspense>
      )}

      <Suspense fallback={null}>
        <MemoCardLogoSection data={data.storesCoupons} />
      </Suspense>

      <Suspense fallback={null}>
        <MemoImageHover data={data.partners} />
      </Suspense>
    </>
  );
}
