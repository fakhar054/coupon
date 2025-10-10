import React, { useState } from "react";
import "./CategoryCouponCard.css";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaCrown, FaStar } from "react-icons/fa";
import OfferPopup from "../Brand/OfferPopup";  
import CodePopup from "../Brand/CodePopup";  
import NotFound from "../NotFound/NotFound";
const CategoryCouponCard = ({ coupons, popupModal }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [selectedCodeOffer, setSelectedCodeOffer] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const displayValue = (value, fallback = "Not Available") => {
    return value ? value : fallback;
  };

  const handleViewOffer = () => {
    if (coupons.code === null) {
      setSelectedOffer(coupons);
    } else {
      setSelectedCodeOffer(coupons);
    }
  };

  const handleClosePopup = () => {
    setSelectedOffer(null);
    setSelectedCodeOffer(null);
  };

  if (!coupons) {
    return <NotFound/>; 
  }

  return (
    <div className="coupon-card">
      <div className="coupon-card-image">
        <img src={apiUrl + coupons.banner} alt={coupons.title} />
        {coupons.offer !== null && (
          <div className="coupon-card-offer">{coupons.offer}% off</div>
        )}
      </div>
      <div className="coupon-card-tags">
        {coupons.highlight === 1 && (
          <span className="coupon-card-verified">
            <FaStar /> Featured
          </span>
        )}
        {coupons.highlight === 2 && (
          <span className="coupon-card-verified">
            <FaCheckCircle /> Verified
          </span>
        )}
        {coupons.highlight === 3 && (
          <span className="coupon-card-verified">
            <FaCrown /> Exclusive
          </span>
        )}
        <span className="coupon-card-category">{coupons.category.name}</span>
      </div>
      <div className="coupon-card-content">
        <h3>{coupons.title}</h3>
        <p
          className={`coupon-card-description ${isExpanded ? "expanded" : ""}`}
        >
          {coupons.description}
        </p>
        {coupons.description.length > 100 && (
          <button className="toggle-description" onClick={toggleDescription}>
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
      <div className="coupon-card-footer">
        {coupons.expire_date && <span>Expire: {coupons.expire_date}</span>}
        <button
          className="coupon-card-action"
          onClick={handleViewOffer}
        >
          {coupons.code === null ? "Buy Now" : "Get Code"}
        </button>
      </div>

      {/* Offer Popups */}
      {selectedOffer && (
        <OfferPopup
          offer={selectedOffer} 
          onClose={handleClosePopup}
          popupModal={popupModal}
        />
      )}

      {selectedCodeOffer && (
        <CodePopup
          code={selectedCodeOffer}
          popupModal={popupModal}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default CategoryCouponCard;
