import React from 'react';
import './ImageHover.css';
import bild from '../../assets/hoverImg/bild.webp'
import diewelt from '../../assets/hoverImg/diewelt.webp'
import chip from '../../assets/hoverImg/chip.webp'
import stern from '../../assets/hoverImg/stern.webp'
import test from '../../assets/hoverImg/chip.webp'
import { useTranslation } from 'react-i18next';
const ImageHover = ({ data }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
 

  const { t } = useTranslation();
  return (
    <div className="image-hover-container">
      <h2 className='pb-5'>{t('known_from')}</h2>
      <div className="image-grid">
        {data.map((partner, index) => (
          <div className='image-container'>
          <img
            key={index}
            src={`${apiUrl}storage/${partner.image}`}  
              alt={partner.title || 'Partner Logo'} 
            className='hover-image partner-logo' 
          />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageHover;
