 
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';  
import './NotFound.css';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
    const { t } = useTranslation();  
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <FaExclamationTriangle className="not-found-icon" />
                <h2 className="not-found-text">{t('not_available')}</h2>
                <p className="not-found-description">
                    {t('the_product_not_found')}
                </p>
            </div>
        </div>
    );
};

export default NotFound;
