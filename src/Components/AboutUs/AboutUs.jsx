import React, { useState, useEffect } from "react";
import "./AboutUs.css"; 
import { Link } from "react-router-dom";
import Loader from '../Loader/Loader';
import NotFound from "../NotFound/NotFound";
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
    const [aboutUs, setAboutUs] = useState(null); 
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL; 
    const { t } = useTranslation(); 
  
    useEffect(() => {
      const fetchAboutUs = async () => {
        try {
          const response = await fetch(`${apiUrl}api/about-us`);
          
          if (!response.ok) {  
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
  
          if (data.aboutUs) {
            setAboutUs(data.aboutUs);  
          } else {
            console.error("Unexpected response format:", data);
          }
        } catch (error) {
          console.error("Error fetching about us content:", error);
        } finally {
          setLoading(false);  
        }
      };
  
      fetchAboutUs();
    }, []);
  
    if (loading) {
      return <Loader />; 
    }
  
    if (!aboutUs) {
      return <div className="mian_not_found"><NotFound/></div>;
      
    }
    


  return (
    <div className="about-us-container">
      <div className="about-us-banner"
      style={{ 
        backgroundImage: `url(${apiUrl + aboutUs.banner_image})`, 
      
      }}>
      
        <div className="about-us-overlay">
          <h1>{t('About_us')}</h1>
          <p className="about-us-breadcrumbs">
            <Link to="/">{t('home')}</Link> ➜ <span>{t('About_us')}</span>
          </p>
        </div>
      </div>
      <div className="about-us-content">
  {aboutUs && typeof aboutUs === 'object' && aboutUs.description ? (
    <div dangerouslySetInnerHTML={{ __html: aboutUs.description }} />
  ) : (
    <p>No content available</p>
  )}
</div>

    </div>
  );
};

export default AboutUs;
