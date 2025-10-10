import React, { useState, useEffect } from "react";
import "./asideLogoCard.css";
import { FaStar, FaStarHalfAlt, FaRegStar, FaTimes } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from 'react-i18next';

const AsideLogoCard = ({ logo, averageRating, totalReviews, storeId }) => {
  const [isReviewPopupVisible, setReviewPopupVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(1);
  const [comment, setComment] = useState("");
  const [reviewerId, setReviewerId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { t } = useTranslation();


  useEffect(() => {
    let storedReviewerId = localStorage.getItem("reviewer_id");
    if (!storedReviewerId) {
      storedReviewerId = uuidv4();
      localStorage.setItem("reviewer_id", storedReviewerId);
    }
    setReviewerId(storedReviewerId);
  }, []);

  const fullStars = Math.floor(averageRating);
  const halfStar = averageRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const toggleReviewPopup = () => {
    setReviewPopupVisible(!isReviewPopupVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     
    const ratingNumber = parseInt(selectedRating, 10);

    const data = {
      rating: ratingNumber,
      store_id: storeId,
      comment,
      reviewer_id: reviewerId,
    };
    setIsSubmitting(true);  

    try {
      const response = await fetch(apiUrl + "api/subscribe-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.status === 1) {
        alert(t('review_submit_success')); 
        setSelectedRating(1);
        setComment("");
      } 
      else {
        alert(result.message || t('faild_to_submit'));
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(t('an_error_occurred'));
    } finally {
      setIsSubmitting(false); 
      setReviewPopupVisible(false); 
    }
  };
  return (
    <div className="main-aside">
      <div className="logo-card">
        <img src={logo} alt="Brand Logo" className="brand-logo" />
      </div>
    </div>
  );
};



export default AsideLogoCard;