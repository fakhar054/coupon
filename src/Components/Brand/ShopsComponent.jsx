import React from 'react';
import './ShopsComponent.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ShopsComponent = ({featureStoreNames}) => {
  const { t } = useTranslation();
  if (featureStoreNames.length === 0) {
    return null; 
  }
  return (
    <div className="main-shop">    <div className="shops-container">
      <h2>{t('shops_of_the_moment')}</h2>
      <div className="shops-list">
        {featureStoreNames.map((shop, index) => (

          <Link
          key={index}
          className="shop-link"
          // to={store.url}
          to={`/gutscheine/${shop}`}
          rel="noopener noreferrer"
        >
          {shop}
        </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ShopsComponent;
