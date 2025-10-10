import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import "./CouponType.css";

const CouponType = ({ selectedType, handleRadioChange, counts, offer }) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const buttonContainerRef = useRef(null);
  const { t } = useTranslation();
  const buttonData = [
    { id: 0, label: t('all'), count: counts.all },
    { id: 1, label: t('featured'), count: counts.featured },
    { id: 2, label: t('verified'), count: counts.verified },
    { id: 3, label: t('exclusive'), count: counts.exclusive },
    { id: 4, label: t('voucher_code'), count: counts.voucher },
    { id: 5, label: t('deals'), count: counts.deals },
 
  ];
  useEffect(() => {
    const checkScrollable = () => {
      if (buttonContainerRef.current) {
        setIsScrollable(
          buttonContainerRef.current.scrollWidth >
            buttonContainerRef.current.clientWidth
        );
      }
    };
    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [buttonData]);

  const scrollButtons = (direction) => {
    if (buttonContainerRef.current) {
      const { scrollLeft, clientWidth } = buttonContainerRef.current;
      const newScrollPosition =
        direction === "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;
      buttonContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };
 
  let startX = 0;
  let scrollLeft = 0;

  const handleTouchStart = (e) => {
    if (buttonContainerRef.current) {
      startX = e.touches[0].pageX - buttonContainerRef.current.offsetLeft;
      scrollLeft = buttonContainerRef.current.scrollLeft;
    }
  };

  const handleTouchMove = (e) => {
    if (buttonContainerRef.current) {
      const x = e.touches[0].pageX - buttonContainerRef.current.offsetLeft;
      const walk = x - startX; // The distance moved
      buttonContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="main-coupon">
      {isScrollable && (
        <button
          className="scroll-button left"
          onClick={() => scrollButtons("left")}
        >
          &#8249;
        </button>
      )}
      <div
        className="coupon-type-container"
        ref={buttonContainerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="coupon-type">
          {buttonData.map(
            (button) =>
              button.count > 0 && (
                <button
                  key={button.id}
                  className={`coupon-button ${
                    selectedType === button.id ? "selected" : ""
                  }`}
                  onClick={() => handleRadioChange(button.id)}
                >
                  {button.label} ({button.count})
                </button>
              )
          )}
        </div>
      </div>
      {isScrollable && (
        <button
          className="scroll-button right"
          onClick={() => scrollButtons("right")}
        >
          &#8250;
        </button>
      )}
    </div>
  );
};

export default CouponType;
