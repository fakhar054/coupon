import React, { useState, useEffect } from "react";
import "./ContactUs.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"; 
import NotFound from "../NotFound/NotFound";
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
  const [contactus, setContactus] = useState(null); 
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL; 
  const { t } = useTranslation(); 
  useEffect(() => {
    const fetchContactus = async () => {
      try {
        const response = await fetch(`${apiUrl}api/contact-us`);

        if (!response.ok) { 
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.contact) { 
          setContactus(data.contact); 
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching contact us content:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchContactus();
  }, []);

  if (loading) {
    return <Loader />; 
  }

  if (!contactus) {
    return <div className="mian_not_found"><NotFound/></div>; 
  }

  const contactInfo = [
    {
      icon: <FaEnvelope className="contact-icon" />,
      title: "Mail Address",
      detail: contactus.email,
    },
    {
      icon: <FaPhone className="contact-icon" />,
      title: "Phone Number",
      detail: contactus.phone,
    },
    {
      icon: <FaMapMarkerAlt className="contact-icon" />,
      title: "Contact Address",
      detail: contactus.address,
    },
  ];


  return (
    <>
      <div
        className="about-us-banner"
        style={{
          backgroundImage: `url(${apiUrl + contactus.banner})`,
        }}
      >
        <div className="about-us-overlay">
          <h1>{t('contact_us')}</h1>
          <p className="about-us-breadcrumbs">
            <Link to="/">{t('home')}</Link> ➜ <span>{t('contact_us')}</span>
          </p>
        </div>
      </div>
      <div className="contact-us-container">
        <div className="contact-us-header">
          <h1>{contactus.title}</h1>
          <p>{contactus.description}</p>
        </div>

        <div className="contact-info">
          {contactInfo.map((item, index) => (
            <div key={index} className="contact-info-item">
              {item.icon}
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
                  
    
      </div>
    </>
  );
};

export default ContactUs;
