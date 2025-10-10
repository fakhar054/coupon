import React from "react";
import "./Loader.css"; 
import { useTranslation } from 'react-i18next';
const Loader = () => {
  const { t } = useTranslation(); 
  return (
    <div className="loader">
      <div className="spinner"></div> 
      <p>{t('loading')}</p>
    </div>
  );
};

export default Loader;
