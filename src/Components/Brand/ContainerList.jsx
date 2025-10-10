import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import { FaChevronUp, FaChevronDown, FaTruck, FaGift, FaCheckCircle } from "react-icons/fa";
import "./ContainerList.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import couponImage from "../../assets/img/couponImg.png";

const OfferPopup = lazy(() => import("./OfferPopup"));
const CodePopup = lazy(() => import("./CodePopup"));

const apiUrl = import.meta.env.VITE_API_URL;
 
const ContainerItem = React.memo(({ container, openDetails, toggleDetails, handleViewOffer, handleOffer, bannerImage, storeData, t }) => {

  const renderIcon = () => {
    if (!container) return null;
    if (container.highlight === "verified") {
      return container.iconType === "van" ? <FaTruck style={{ fontSize: "24px" }} /> : <FaGift style={{ fontSize: "24px" }} />;
    }
    return container.offer;
  };

  return (
    <div className={`container-items ${container.highlight}`} key={container.id}>
      <div className="row d-flex align-items-center">
        <div className="col-sm-2 col-md-2 col-lg-2">
          <div className="container-header">
            <div className="container-type-percentage">
              <div className="container-image">
                <img src={container.store?.banner ? apiUrl + container.store.banner : bannerImage} alt="add image" />
              </div>
              <div className="container-type">
                {container.highlight === 1
                  ? t('featured')
                  : container.highlight === 2
                  ? t('verified')
                  : container.highlight === 3
                  ? t("exclusive")
                  : container.highlight === 4
                  ? t("voucher_code")
                  : container.highlight === 5
                  ? t("deals")
                  : ""}
              </div>
              <div className="container-percentage">
                {renderIcon() && <>{renderIcon()}</>}
              </div>
            </div>

            <div className="mobile-container">
              <div className="container-main"><p>{container.title}</p></div>
              <div className="container-info">
                {container.code === null ? (
                  <Link to={container.link} target="_blank" style={{ width: "100%" }}>
                    <button className="card-button" onClick={() => handleOffer(container)} style={{ borderRadius: "5px" }}>
                      {t('see_the_promo')}
                    </button>
                  </Link>
                ) : (
                  <button className="coupon-code-button" onClick={() => handleViewOffer(container)} style={{ borderRadius: "5px" }}>
                    <span className="coupon-inner-text">{container.code}</span>
                    <span className="coupon-blue-wrap" style={{ borderRadius: "0px" }}>
                      {t('view_code')}
                      <span className="coupon-fold" style={{ borderRadius: "5px" }}></span>
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-md-6 col-lg-6 a-main">
          <div className="container-main"><p>{container.title}</p></div>
        </div>

        <div className="col-sm-4 col-md-4 col-lg-4 viewbutton">
          <div className="container-info">
            {container.code === null ? (
              <Link to={container.link} target="_blank" style={{ width: "100%" }}>
                <button className="card-button" onClick={() => handleOffer(container)} style={{ borderRadius: "5px" }}>
                  {t('see_the_promo')}
                </button>
              </Link>
            ) : (
              <button className="coupon-code-button" onClick={() => handleViewOffer(container)} style={{ borderRadius: "5px" }}>
                <span className="coupon-inner-text">{container.code}</span>
                <span className="coupon-blue-wrap" style={{ borderRadius: "0px" }}>
                  {t('view_code')}
                  <span className="coupon-fold" style={{ borderRadius: "5px" }}></span>
                </span>
              </button>
            )}
          </div>
          <div>
            <button className="container-details" onClick={() => toggleDetails(container.id)}>
              {t('details')} {openDetails === container.id ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        </div>
      </div>

      {openDetails === container.id && (
        <div className="container-extra">
          <div className="redemption-conditions">
            <h3>{t('redemption_conditions')}</h3>
            <ul>
              {container.highlight && (
                <li>
                  <FaCheckCircle /> {t('type_of_action')}{" "}
                  {container.highlight === 1 ? t('featured') :
                   container.highlight === 2 ? t('verified') :
                   container.highlight === 3 ? t('exclusive') :
                   container.highlight === 4 ? t('voucher_code') :
                   container.highlight === 5 ? t('deals') : ""}
                </li>
              )}
              {container.offer && <li><FaCheckCircle /> {t('price_reduction')} {container.offer}</li>}
              {container.start_date && <li><FaCheckCircle /> {t('start')} {new Date(container.start_date).toLocaleDateString()}</li>}
              {container.expire_date && <li><FaCheckCircle /> {t('expire')} {new Date(container.expire_date).toLocaleDateString()}</li>}
            </ul>
            <p>{container.description}</p>
            <hr />
            {container.updated_at && (
              <div className="last-updated">
                <span>{t('last_updated')} </span>
                <span>{new Date(container.updated_at).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

const ContainerList = ({ containers, bannerImage, storeName, popupModal, simlarcoupons, storeData }) => {
  const [openDetailsMain, setOpenDetailsMain] = useState(null);
  const [openDetailsSimilar, setOpenDetailsSimilar] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [selectedCodeOffer, setSelectedCodeOffer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpencode, setIsModalOpenCode] = useState(false);
  const { t } = useTranslation();

  const toggleDetailsMain = useCallback((id) => setOpenDetailsMain(prev => prev === id ? null : id), []);
  const toggleDetailsSimilar = useCallback((id) => setOpenDetailsSimilar(prev => prev === id ? null : id), []);

  // Memoize active and expired containers
  const today = useMemo(() => new Date(), []);
  const activeContainers = useMemo(() => containers.filter(c => new Date(c.expire_date) >= today), [containers, today]);
  const expiredContainers = useMemo(() => containers.filter(c => new Date(c.expire_date) < today), [containers, today]);

  useEffect(() => {
    const modalState = localStorage.getItem("isModalOpens");
    let savedContainers;
    try {
      savedContainers = JSON.parse(localStorage.getItem("containers")) || [];
      if (!Array.isArray(savedContainers)) savedContainers = [savedContainers];
    } catch (error) {
      savedContainers = [];
    }

    if (modalState === "true") {
      const savedContainer = savedContainers.find(c => c.code);
      if (savedContainer) {
        setSelectedCodeOffer(savedContainer);
        setIsModalOpenCode(true);
      } else {
        setIsModalOpen(true);
      }
    }
  }, []);

  const handleViewOffer = useCallback((container) => {
    localStorage.setItem("containers", JSON.stringify(container));
    localStorage.setItem("isModalOpens", "true");

    if (!container.code) {
      setSelectedOffer(container);
      setIsModalOpen(true);
    } else {
      setSelectedCodeOffer(container);
      setIsModalOpenCode(true);
    }

    // Redirect in current window safely
    if (container.link) {
      setTimeout(() => { window.location.href = container.link; }, 0);
    }
  }, []);

  const handleOffer = useCallback((container) => {
    if (!container.code) setSelectedOffer(container);
  }, []);

  const handleClosePopup = useCallback(() => {
    setSelectedOffer(null);
    setSelectedCodeOffer(null);
    localStorage.setItem("isModalOpens", "false");
  }, []);

  if (!containers || containers.length === 0) return <div className="container-listNotfound"></div>;

  return (
    <div className="container-list">
      {/* Active Containers */}
      {activeContainers.map(container => (
        <ContainerItem
          key={`main-${container.id}`}
          container={container}
          openDetails={openDetailsMain}
          toggleDetails={toggleDetailsMain}
          handleViewOffer={handleViewOffer}
          handleOffer={handleOffer}
          bannerImage={bannerImage}
          storeData={storeData}
          t={t}
        />
      ))}

      {/* Expired Containers */}
      {expiredContainers.length > 0 && (
        <div className="expired-section">
          <h3>{t('expired_promo_codes', { storeName })}</h3>
          {expiredContainers.map(container => (
            <ContainerItem
              key={`expired-${container.id}`}
              container={container}
              openDetails={openDetailsMain}
              toggleDetails={toggleDetailsMain}
              handleViewOffer={handleViewOffer}
              handleOffer={handleOffer}
              bannerImage={bannerImage}
              storeData={storeData}
              t={t}
            />
          ))}
        </div>
      )}

      {/* Similar Coupons */}
      {simlarcoupons && simlarcoupons.length > 0 && (
        <div className="similar-coupons">
          <h4>{t('similar_coupons')}</h4>
          {simlarcoupons.map(coupon => (
            <ContainerItem
              key={`similar-${coupon.id}`}
              container={coupon}
              openDetails={openDetailsSimilar}
              toggleDetails={toggleDetailsSimilar}
              handleViewOffer={handleViewOffer}
              handleOffer={handleOffer}
              bannerImage={bannerImage}
              storeData={storeData}
              t={t}
            />
          ))}
        </div>
      )}

      {/* Popups */}
      <Suspense fallback={null}>
        {selectedOffer && <OfferPopup
          offer={selectedOffer}
          storeName={storeName}
          containers={containers}
          bannerImage={bannerImage}
          popupModal={popupModal}
          onClose={handleClosePopup}
          storeData={storeData}
          simlarcoupons={simlarcoupons}
        />}

        {isModalOpencode && selectedCodeOffer && <CodePopup
          code={selectedCodeOffer}
          onClose={handleClosePopup}
          popupModal={popupModal}
          bannerImage={bannerImage}
          storeData={storeData}
        />}
      </Suspense>
    </div>
  );
};

export default ContainerList;
