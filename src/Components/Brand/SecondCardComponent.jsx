import React from 'react';
import './SecondCardComponent.css';
import { Link } from "react-router-dom";
const SecondCardComponent = ({storepageBannerOne}) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    // <div className="second-card">
    <Link to={storepageBannerOne.link} target='_blank'>
    <div
    className="second-card"
    style={{
      backgroundImage: `url(${apiUrl + storepageBannerOne.background_image})`,  
      backgroundSize: 'cover',                   
      backgroundPosition: 'center',         
      padding: '20px',                           
      borderRadius: '8px',                   
      color: '#fff',                             
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      height: '180px',
    }}
  >
      <h3></h3>
      <p></p> 
    </div>
    </Link>
  );
};

export default SecondCardComponent;
