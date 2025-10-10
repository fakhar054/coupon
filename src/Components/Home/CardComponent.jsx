import React, { useState, useEffect } from "react";
import "./CardComponent.css";
import { Link } from "react-router-dom";
import OfferPopup from "../Brand/OfferPopup";
import CodePopup from "../Brand/CodePopup"; 
import { useTranslation } from "react-i18next";

const CardComponent = ({ data, popupModal }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [rotatingCategoryId, setRotatingCategoryId] = useState(null);
  const [expandedCouponIndex, setExpandedCouponIndex] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [selectedCodeOffer, setSelectedCodeOffer] = useState(null);
  const { t } = useTranslation(); 
  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(categoryId);
    setRotatingCategoryId(categoryId);
    setTimeout(() => {
      setRotatingCategoryId(null);
    }, 500);
  };
  
  useEffect(() => {
    if (data && data.length > 0) {
      setActiveCategoryId(data[0].id);
    }
  }, [data]); 
  const activeCategory = data.find(
    (category) => category.id === activeCategoryId
  );
 

  const getHighlightLabel = (highlight) => {
    switch (highlight) {
      case 1:
        return t("featured");
      case 2:
        return t("verified");
      case 3:
        return t("exclusive");
      case 4:
        return t("voucher_code");
      case 5:
        return t("deals");
      default:
        return "";
    }
  };

  const toggleDescription = (index) => {
    setExpandedCouponIndex(expandedCouponIndex === index ? null : index);
  };

  const [isModalOpencode, setIsModalOpenCode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const modalState = localStorage.getItem("isModalOpen");

    let savedCoupons;
    try { 
      savedCoupons = JSON.parse(localStorage.getItem("coupon")) || [];
      if (!Array.isArray(savedCoupons)) {
        savedCoupons = [savedCoupons];
      }
    } catch (error) {
      savedCoupons = [];
    }

    if (modalState === "true") {
      const savedCoupon = savedCoupons.find((coupon) => {
        return coupon.code;
      });

      if (savedCoupon) {
        setSelectedCodeOffer(savedCoupon);
        setIsModalOpenCode(true);
      } else {
        setIsModalOpen(true);
      }
    }
  }, []);

  const handleViewOffer = (coupon) => {
    localStorage.setItem("coupon", JSON.stringify(coupon)); 
    localStorage.setItem("isModalOpen", "true");

    if (!coupon.code) {
      setSelectedOffer(coupon);
      setIsModalOpen(true);
    } else {
      setSelectedCodeOffer(coupon);
      setIsModalOpenCode(true);
    }
 
    let newTab = window.open(
      window.location.href,
      "_blank",
      "noopener,noreferrer"
    );
    if (newTab) {
      newTab.onload = () => {
        localStorage.setItem("isModalOpen", "true");
      };
    }
 
    if (coupon.link) {
      window.location.href = coupon.link;
    } else {
      console.error("Coupon link is missing or invalid");
    }
  };

  const handleOffer = (coupon) => {
    if (!coupon.code) {
      setSelectedOffer(coupon);
    }
  };

  const handleClosePopup = () => {
    setSelectedOffer(null);
    setSelectedCodeOffer(null);
    localStorage.setItem("isModalOpen", "false");
  };

  return (
    <div className="maincard">
      <div className="container card-container">
        <h1 className="card-heading">{t("Promo_code_of_week")}</h1>
        <div className="group-buttons">
          {data.map((category) => (
            <button
              key={category.id}
              className={activeCategoryId === category.id ? "active" : ""}
              onClick={() => handleCategoryClick(category.id)}
            >
              <i
                className={`${category.icon ? category.icon : "fas fa-list"} ${
                  rotatingCategoryId === category.id ? "rotate" : ""
                }`}
              ></i>
              {" " + category.name}
            </button>
          ))}
        </div>

        
        <div className="cards-section">
          {activeCategory?.coupons.slice(0, 8).map((coupon, index) => (
            <div key={index} className="card">
              <div className="card-icon"> 
                <i className={activeCategory.icon}></i>
                {coupon.highlight != 0 && (
                  <span className="highlight-label">
                    {getHighlightLabel(coupon.highlight)}
                  </span>
                )}
              </div> 
              <Link to={coupon.link} rel="noopener noreferrer" target="_blank">
                <img 
                  src={apiUrl + `${coupon.store?.banner}`} 
                  alt={coupon.highlight}
                  className="card-logoImg"
                />
              </Link> 

              {coupon.offer !== null ? (
                <div className="card-title">{coupon.offer}</div>
              ) : (
                <div className="card-title" style={{ visibility: 'hidden' }}>Offer</div>
              )}
              
              <div
                className={`card-description-home ${
                  expandedCouponIndex === index ? "expanded" : ""
                }`}
              > 
                {coupon.title}
              </div>
              {coupon.title.length > 100 && (
                <button
                  className="toggle-description-button"
                  onClick={() => toggleDescription(index)}
                >
                  {expandedCouponIndex === index
                    ? t("show_less")
                    : t("read_more")}
                </button>
              )}
 
              {coupon.code === null ? ( 
                <Link to={coupon.link} target="_blank">
                  <button
                    className="card-button"
                    onClick={() => handleOffer(coupon)}
                  >
                    {t("see_the_promo")}
                  </button>
                </Link>
              ) : (
              

                <div>
                  <button
                    className="coupon-code-button"
                    onClick={() => handleViewOffer(coupon)}
                  >
                    <span className="coupon-inner-text">{coupon.code}</span>
                    <span className="coupon-blue-wrap">
                      {t("view_code")}
                      <span className="coupon-fold"></span>
                    </span>
                  </button>
                </div>
              )}

              
            </div>
          ))}
        </div>
      </div>
 
      {selectedOffer && (
        <OfferPopup
          offer={selectedOffer}
          popupModal={popupModal}
          onClose={handleClosePopup}
        />
      )}

      {isModalOpencode && selectedCodeOffer && (
        <CodePopup
          code={selectedCodeOffer}
          onClose={handleClosePopup}
          popupModal={popupModal}
        />
      )}
    </div>
  );
};

export default CardComponent;
