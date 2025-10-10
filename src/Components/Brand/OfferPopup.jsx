import React from "react";
import { FaTimes } from "react-icons/fa";
import "./OfferPopup.css"; 
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const apiUrl = import.meta.env.VITE_API_URL;
const OfferPopup = ({ popupModal, offer, onClose, storeData,}) => {
  const { t } = useTranslation();
  return (
    <div className="offer-popup-overlay">
      <div className="offer-popup-content">
        <button className="offer-popup-close" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="offer-popup-header">
          <img  
         src={apiUrl +(offer?.store?.banner ? offer.store.banner : storeData?.banner)}
          alt="Logo" className="popup-logo" />
        </div>
        <div className="offer-popup-body">
          <h2>{offer.title}</h2> 

          <Link to={offer.link} className="offer-popup-button" target="_blank">
            {t('to-the-offer')}
          </Link>
          <p>{t('valid_without_promo_code')}</p>
          <div className="offer-popup-conditions">
            <h3>{t('details')}</h3>
            <ul>
              {offer.highlight !== 0 && (
                <li>
                  <FaCheckCircle /> Type of action:{" "}
                  {offer.highlight === 1
                    ? t("featured")
                    : offer.highlight === 2
                    ? t("verified")
                    : offer.highlight === 3
                    ? t("exclusive")
                    : offer.highlight === 4
                    ? t("voucher_code")
                    : offer.highlight === 5
                    ? t("deals")
                    : t("all")}
                </li>
              )}

{offer.offer !== null && (
                <li>
                  <FaCheckCircle /> {t('price_reduction')} {offer.offer}
                </li>
              )}
 

              {offer.start_date && (
                <li>
                  <FaCheckCircle /> {t('start')}{" "}
                  {new Date(offer.start_date).toLocaleDateString()}
                </li>
              )} 

              {offer.expire_date && (
                <li>
                  <FaCheckCircle /> {t('expire')}{" "}
                  {new Date(offer.expire_date).toLocaleDateString()}
                </li>
              )}
              <li> {offer.description}</li>
            </ul>
          </div>
        </div>
        <div
          className="offer-popup-footer" 
          style={{
            backgroundImage: `url(${popupModal?.background_image ? apiUrl + popupModal.background_image : 'default-image-url'})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
>
          <Link to={popupModal.link} target="_blank">
            <button className="offer-activate-button">
            {t("activate_now_for_free")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfferPopup;
