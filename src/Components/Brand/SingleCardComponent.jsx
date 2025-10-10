import React from 'react';
import './SingleCardComponent.css'; 
import { Link } from 'react-router-dom';

const SingleCardComponent = ({ storepageBannerTwo}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <div className="card_bdy">
      <div className="card_lbl">{storepageBannerTwo.title_one}</div>
      <Link to={storepageBannerTwo.link} rel="noopener noreferrer">
        <img src={apiUrl + storepageBannerTwo.background_image} target='_blank' alt="banner-image" className="card-logoImg" />
      </Link>
      <div className="card-title">{storepageBannerTwo.title_two}</div>
      <div className="card_descript">{storepageBannerTwo.title_three}</div>
      <button className="card-button cd_bt">
        <Link to={storepageBannerTwo.link} target='_blank' rel="noopener noreferrer">
          {storepageBannerTwo.button_text}
        </Link>
      </button>
    </div>
  );
};

export default SingleCardComponent;
