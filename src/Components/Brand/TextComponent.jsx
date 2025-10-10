import React from 'react';
import './TextComponent.css';
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';

const TextComponent = ({storeName, storedescription}) => {
  const { t } = useTranslation();
  return (
    <div className="text-component"> 
      <h3>{t('promo_code', { storeName })}</h3>
      <p>
        {storedescription}
      </p>
     
    
    </div>
  );
};

export default TextComponent;
