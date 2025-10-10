 


import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.css';

import deFlag from '../../assets/flags/de.png'; 
const LanguageSelector = () => {
  const { i18n } = useTranslation();
 
  const [selectedLanguage, setSelectedLanguage] = useState(() => { 
    const savedLanguage = localStorage.getItem('language') || 'de';
    localStorage.setItem('language', 'de'); 
    return savedLanguage;
  });

  useEffect(() => { 
    i18n.changeLanguage('de');
    setSelectedLanguage('de');
  }, [i18n]);

  return (
    <div className="language-selector"> 
      <div className="flag"> 
        <img src={deFlag} alt="German"  width="30" height="30"/>
      </div>
    </div>
  );
};

export default LanguageSelector;




