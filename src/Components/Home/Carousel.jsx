import React, { useState, useEffect } from "react";
import "./Carousel.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useTranslation } from "react-i18next";

const Carousel = ({ data }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  const initialSlide = data.findIndex((slide) => slide.serial === 1);
  const [currentSlide, setCurrentSlide] = useState(
    initialSlide >= 0 ? initialSlide : 0
  );
  const { t } = useTranslation();

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + data.length) % data.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mainCarousel">
      <div className="carousel">
        <div className="carousel-arrow left" onClick={prevSlide}>
          <FaAngleLeft
            className="faleft"
            style={{ fontSize: "larger", color: "gray" }}
          />
        </div>
        <div className="carousel-content">
          <div className="carousel-background">
            {data[currentSlide]?.image && (
              <img
                src={apiUrl + data[currentSlide].image}
                alt="Hero Banner"
                className="carousel-lcp-image"
                // fetchPriority="high"
                fetchpriority="high"
                width="1920"
                height="600"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                }}
              />
            )}

            {/* Logo on top */}
            <Link
              to={data[currentSlide].link}
              target="_blank"
              className="carousel-logo"
            >
              <img src={apiUrl + data[currentSlide].logo} alt="Logo" />
            </Link>
          </div>

          <div className="carousel-text">
            <div className="carousel-description">
              <p className="header">{data[currentSlide].title}</p>
              <h1 className="percentage">{data[currentSlide].offer}</h1>
              <p className="description">{data[currentSlide].description}</p>
              <Link target={"_blank"} to={data[currentSlide].link}>
                <button>
                  {t("see_offers")} <MdKeyboardArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="carousel-arrow right" onClick={nextSlide}>
          <FaAngleRight
            className="faright"
            style={{ fontSize: "larger", color: "gray" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
