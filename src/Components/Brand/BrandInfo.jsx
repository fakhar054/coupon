import React from 'react';
import './Brandinfo.css';
import LogoCard from './asideLogoCard';
import TextComponent from './TextComponent';
import { useTranslation } from 'react-i18next';
const BrandInfo = ({storeName,bannerImage, totalReviews, averageRating, storeId, storedescription}) => {
  const { t } = useTranslation();
  return (
    <>
   <div className="main-class-logocard">
        <LogoCard 
         logo={bannerImage}
         totalReviews={totalReviews}
         averageRating={averageRating}
         storeId={storeId}
        />
      </div>

    

    <div className="brand-info d-flex align-items-center">
      <div className="bd-img">
        <img src={bannerImage} alt="" />
      </div>
      <div> 
      <h1>{t('your_valid_promo_code', { storeName })}</h1>  
      </div>
    </div>
    </>
  );
};

export default BrandInfo;
