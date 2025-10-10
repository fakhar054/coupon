import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CouponBar from "../Components/CategoryCoupon/CouponBar";
import CategoryCouponCard from "../Components/CategoryCoupon/CategoryCouponCard";
import { useSearchParams } from 'react-router-dom';

 
export default function CategoryCouponPage() {
  const [searchParams] = useSearchParams(); 
  const [coupons, setData] = useState([]);
  const [popupModal, setPopupModal] = useState([]);
  const [error, setError] = useState(null);

  const category = searchParams.get('category');
  const store = searchParams.get('store');
  const search = searchParams.get('search');
  const highlight = searchParams.get('highlight');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const response = await axios.get(`${apiUrl}api/search`, {
          params: {
            category: category || '',
            store: store || '',      
            search: search || '', 
            highlight: highlight || '',
          },
        });
        setData(response.data.coupons.data);

        setPopupModal(response.data.popupModal);

      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [category, store, search, highlight]); 


  
  return (
    <>
      <CouponBar />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', backgroundColor: 'var(--bg-main)' }}>
        {coupons.map((coupon, index,) => (
          <CategoryCouponCard
            coupons ={coupon}
            popupModal={popupModal}
            key={index}
          />
        ))}
      </div>
    </>
  );
}
