import React from "react";
import "./PromiseComponent.css";
import { Link } from "react-router-dom";

const PromiseComponent = ({data}) => {
const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <div className="main-promise">
      <div className="mrgn-tp">
        <div className="promise-container">
          <div className="promise-background">
            <img
              src={apiUrl + data.background_image}
              alt="Background"
              className="background-image"
            />
            <div className="promise-label">{data.title_three}</div>
             
          </div>
          <div className="promise-content">
            <h2>{data.title_one}</h2>
            <p>
             {data.title_two}
            </p>
            <Link to={data.link} target="_blank" className="learn-more-link">
              {data.button_text}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromiseComponent;
