import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";
import "./CarouselComponent.css";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const CarouselComponent = ({ data }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const settings = {
    dots: false,
    infinite: data.length > 1,
    speed: 500,
    slidesToShow: Math.min(data.length, 7),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: Math.min(data.length, 6) },
      },
      { breakpoint: 900, settings: { slidesToShow: Math.min(data.length, 5) } },
      { breakpoint: 767, settings: { slidesToShow: Math.min(data.length, 4) } },
      { breakpoint: 600, settings: { slidesToShow: Math.min(data.length, 3) } },
      { breakpoint: 440, settings: { slidesToShow: Math.min(data.length, 2) } },
    ],
  };

  if (!data || data.length === 0) {
    return <Loader />;
  }

  return (
    <div className="main">
      <div className="carousel-container">
        <Slider {...settings}>
          {data.map((brand) => (
            <div key={brand.id} className="carousel-item">
              <Link
                to={"/gutscheine/" + brand.slug}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={apiUrl + brand.banner}
                  alt={brand.name}
                  className="brand-image"
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const NextArrow = ({ onClick }) => (
  <div className="arrow next" onClick={onClick}>
    <FaCircleChevronRight style={{ fontSize: "50px" }} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="arrow prev" onClick={onClick}>
    <FaCircleChevronLeft style={{ fontSize: "50px" }} />
  </div>
);

export default CarouselComponent;
