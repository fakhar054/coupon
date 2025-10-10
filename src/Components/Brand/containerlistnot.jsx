import React, { useState, useEffect } from "react";
import {
  FaThumbsUp,
  FaChevronUp,
  FaChevronDown,
  FaGift,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";
import "./ContainerList.css";
import OfferPopup from "./OfferPopup";
import CodePopup from "./CodePopup";
import Loader from "../Loader/Loader"; 
import { Link } from "react-router-dom";
import NotFound from "../NotFound/NotFound";

const apiUrl = import.meta.env.VITE_API_URL;

const ContainerList = ({
  containers,
  bannerImage,
  storeName,
  popupModal,
  simlarcoupons,
  storeData,
}) => { 
  const [openDetailsMain, setOpenDetailsMain] = useState(null); 
  const [openDetailsSimilar, setOpenDetailsSimilar] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [selectedCodeOffer, setSelectedCodeOffer] = useState(null);
  const [loading, setLoading] = useState(true);  
  useEffect(() => { 
    const fetchData = async () => {
      try { 
        await new Promise((resolve) => setTimeout(resolve, 2000));
       
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const toggleDetailsMain = (id) => {
    setOpenDetailsMain(openDetailsMain === id ? null : id);
  };

  const toggleDetailsSimilar = (id) => {
    setOpenDetailsSimilar(openDetailsSimilar === id ? null : id);
  };

  const renderIcon = (container) => {
    if (!container) return null;

    if (container.highlight === "verified") {
      return container.iconType === "van" ? (
        <FaTruck style={{ fontSize: "24px" }} />
      ) : (
        <FaGift style={{ fontSize: "24px" }} />
      );
    }
    return container.offer;
  };

  const handleViewOffer = (container) => {
    if (!container.expired) {
      if (container.code === null) {
        setSelectedOffer(container);
      } else {
        setSelectedCodeOffer(container);
      }
    }
 
    if (containers.some((c) => c.id === container.id)) {
      setOpenDetailsMain(
        openDetailsMain === container.id ? null : container.id
      );
    }
  };

  const handleClosePopup = () => {
    setSelectedOffer(null);
    setSelectedCodeOffer(null);
  };

  const today = new Date();

  const activeContainers = containers.filter((container) => {
    const expireDate = new Date(container.expire_date);
    return expireDate >= today;
  });

  const expiredContainers = containers.filter((container) => {
    const expireDate = new Date(container.expire_date);
    return expireDate < today;
  });

  if (loading) {
    return <Loader />;  
  }
  if (!containers || containers.length === 0) {
    return (
      <div className="container-listNotfound">
        <NotFound />;
      </div>
    );
  }

  return (
    <div className="container-list"> 
      {activeContainers.map((container) => (
        <div
          key={`main-${container.id}`}
          className={`container-items ${container.highlight}`}
        >
          <div className="row d-flex align-items-center">
            <div className="col-sm-2 col-md-2 col-lg-2">
              <div className="container-header">
                <div className="container-type-percentage">
                  <div className="container-image">
                    <img src={apiUrl + storeData.banner} alt="add image" /> 
                  </div>
                  <div className="container-type">
                    {container.highlight === 1
                      ? "Featured"
                      : container.highlight === 2
                        ? "Verified"
                        : container.highlight === 3
                          ? "Exclusive"
                          : ""}
                  </div>
                  <div className="container-percentage">
                    {renderIcon(container) && <>{renderIcon(container)}%</>}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-6 a-main">
              <div className="container-main">
                <p>{container.title}</p>
              </div>
            </div>

            <div className="col-sm-4 col-md-4 col-lg-4 viewbutton">
              <div className="container-info">
                {container.code === null ? (
                  <Link
                    to={container.link}
                    target="_blank"
                    style={{ width: "100%" }}
                  >
                    <button
                      className="card-button"
                      onClick={() => handleViewOffer(container)}
                      style={{ borderRadius: "5px" }}
                    >
                      See the promo
                    </button>
                  </Link>
                ) : (
                   
                  <Link
                    to={container.link}
                    target="_blank"
                    className="coupon-code-button-link"
                    style={{ width: "100%" }}
                  >
                    <button
                      className="coupon-code-button"
                      onClick={(e) => {
                        e.preventDefault();  

                        handleViewOffer(container);  
                        const newTabEvent = new MouseEvent("click", {
                          bubbles: true,
                          cancelable: true,
                          view: window,
                          ctrlKey: true,  
                          metaKey: true,  
                        });
 
                        const anchor = document.createElement("a");
                        anchor.href = container.link;
                        anchor.target = "_blank";
                        anchor.rel = "noopener noreferrer";
                        anchor.dispatchEvent(newTabEvent);  
 
                        anchor.click();
                      }}
                      style={{ borderRadius: "5px" }}
                    >
                      <span className="coupon-inner-text">
                        {container.code}
                      </span>
                      <span
                        className="coupon-blue-wrap"
                        style={{ borderRadius: "0px" }}
                      >
                        View code
                        <span
                          className="coupon-fold"
                          style={{ borderRadius: "5px" }}
                        ></span>
                      </span>
                    </button>
                  </Link>
                )}
              </div>
              <div>
                <button
                  className="container-details"
                  onClick={() => toggleDetailsMain(container.id)}
                >
                  Details{" "}
                  {openDetailsMain === container.id ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>
              </div>
            </div>
          </div>
          {openDetailsMain === container.id && (
            <div className="container-extra">
              <div className="redemption-conditions">
                <h3>Redemption conditions</h3>
                <ul>
                  {container.highlight !== null && (
                    <li>
                      <FaCheckCircle /> Type of action:{" "}
                      {container.highlight === 1
                        ? "Featured"
                        : container.highlight === 2
                          ? "Verified"
                          : container.highlight === 3
                            ? "Exclusive"
                            : ""}
                    </li>
                  )}

                  {container.offer !== null && (
                    <li>
                      <FaCheckCircle /> Price reduction: {container.offer}%
                    </li>
                  )}

                  {container.start_date && (
                    <li>
                      <FaCheckCircle /> Start:{" "}
                      {new Date(container.start_date).toLocaleDateString()}
                    </li>
                  )}

                  {container.expire_date && (
                    <li>
                      <FaCheckCircle /> Expire:{" "}
                      {new Date(container.expire_date).toLocaleDateString()}
                    </li>
                  )}
                </ul>
                <p>{container.description}</p>
                <hr />
                {container.updated_at && (
                  <div className="last-updated">
                    <span>Last updated: </span>
                    <span>
                      {new Date(container.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Expired Containers */}
      {expiredContainers.length > 0 && (
        <div className="expired-section">
          <h3>These {storeName} promo codes seem to be expired, try them</h3>
          {expiredContainers.map((container) => (
            <div
              key={`expired-${container.id}`}
              className={`container-items ${container.highlight}`}
            >
              <div className="row d-flex align-items-center">
                <div className="col-sm-2 col-md-2 col-lg-2">
                  <div className="container-header">
                    <div className="container-type-percentage">
                      <div className="container-image">
                        <img src={bannerImage} alt="add image" />
                        {/* <img src={apiUrl + container.banner} alt="add image" /> */}
                      </div>
                      <div className="container-type">
                        {container.highlight === 1
                          ? "Featured"
                          : container.highlight === 2
                            ? "Verified"
                            : container.highlight === 3
                              ? "Exclusive"
                              : ""}
                      </div>
                      <div className="container-percentage">
                        {renderIcon(container) && <>{renderIcon(container)}%</>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6">
                  <div className="container-main">
                    <p>{container.title}</p>
                 
                  </div>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4 viewbutton">
                  <div className="container-info">
                    {container.code === null ? (
                      <button
                        className="card-button"
                        style={{ borderRadius: "5px" }}
                      >
                        See the promo
                      </button>
                    ) : (
                      <button
                        className="coupon-code-button"
                        style={{ borderRadius: "5px" }}
                      >
                        <span className="coupon-inner-text">
                          {container.code}
                        </span>
                        <span
                          className="coupon-blue-wrap"
                          style={{ borderRadius: "0px" }}
                        >
                          View code
                          <span
                            className="coupon-fold"
                            style={{ borderRadius: "5px" }}
                          ></span>
                        </span>
                      </button>
                    )}
                  </div>
                  <div>
                    <button
                      className="container-details"
                      onClick={() => toggleDetailsMain(container.id)}
                    >
                      Details{" "}
                      {openDetailsMain === container.id ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {openDetailsMain === container.id && (
                <div className="container-extra">
                  <div className="redemption-conditions">
                    <h3>Redemption conditions</h3>
                    <ul>
                      {container.highlight !== null && (
                        <li>
                          <FaCheckCircle /> Type of action:{" "}
                          {container.highlight === 1
                            ? "Featured"
                            : container.highlight === 2
                              ? "Verified"
                              : container.highlight === 3
                                ? "Exclusive"
                                : ""}
                        </li>
                      )}

                      {container.offer !== null && (
                        <li>
                          <FaCheckCircle /> Price reduction: {container.offer}%
                        </li>
                      )}

                      {container.start_date && (
                        <li>
                          <FaCheckCircle /> Start:{" "}
                          {new Date(container.start_date).toLocaleDateString()}
                        </li>
                      )}

                      {container.expire_date && (
                        <li>
                          <FaCheckCircle /> Expire:{" "}
                          {new Date(container.expire_date).toLocaleDateString()}
                        </li>
                      )}
                    </ul>
                    <p>{container.description}</p>
                    <hr />
                    {container.updated_at && (
                      <div className="last-updated">
                        <span>Last updated: </span>
                        <span>
                          {new Date(container.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Similar Coupons */}
      {simlarcoupons && simlarcoupons.length > 0 && (
        <div className="similar-coupons">
          <h4>Similar Coupons</h4>
          {simlarcoupons.map((coupon) => (
            <div
              key={`similar-${coupon.id}`}
              className={`container-items ${coupon.highlight}`}
            >
              <div className="row d-flex align-items-center">
                <div className="col-sm-2 col-md-2 col-lg-2">
                  <div className="container-header">
                    <div className="container-type-percentage">
                      <div className="container-image">
                         
                        <img
                          src={coupon.store?.banner ? apiUrl + coupon.store.banner : couponImage}
                          alt="add image"
                        />

                        
                      </div>
                      <div className="container-type">
                        {coupon.highlight === 1
                          ? "Featured"
                          : coupon.highlight === 2
                            ? "Verified"
                            : coupon.highlight === 3
                              ? "Exclusive"
                              : ""}
                      </div>
                      <div className="container-percentage">
                        {renderIcon(coupon) && <>{renderIcon(coupon)}%</>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-7 col-md-7 col-lg-6 a-main">
                  <div className="container-main">
                    <p>{coupon.title}</p>
                    
                  </div>
                </div>

                <div className="col-sm-3 col-md-3 col-lg-4 viewbutton">
                  <div className="container-info">
                    {coupon.code === null ? (
                      <Link to={coupon.link} target="_blank" rel="noopener noreferrer" style={{ width: "100%" }}>
                        <button
                          className="card-button"
                          onClick={() => handleViewOffer(coupon)}
                          style={{ borderRadius: "5px" }}
                        >
                          See the promo
                        </button>
                      </Link>

                    ) : (
                     
                      <button
                        className="coupon-code-button"
                        onClick={(e) => {
                          e.preventDefault();  

                          handleViewOffer(coupon);   
                          const newTabEvent = new MouseEvent("click", {
                            bubbles: true,
                            cancelable: true,
                            view: window,
                            ctrlKey: true, 
                            metaKey: true, 
                          });
 
                          const anchor = document.createElement("a");
                          anchor.href = coupon.link; 
                          anchor.target = "_blank";
                          anchor.rel = "noopener noreferrer";
                          anchor.dispatchEvent(newTabEvent); 
                          anchor.click();
                        }}
                        style={{ borderRadius: "5px" }}
                      >
                        <span className="coupon-inner-text">{coupon.code}</span>
                        <span
                          className="coupon-blue-wrap"
                          style={{ borderRadius: "0px" }}
                        >
                          View code
                          <span
                            className="coupon-fold"
                            style={{ borderRadius: "5px" }}
                          ></span>
                        </span>
                      </button>
                    )}
                  </div>
                  <div>
                    <button
                      className="container-details"
                      onClick={() => toggleDetailsSimilar(coupon.id)}
                    >
                      Details{" "}
                      {openDetailsSimilar === coupon.id ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {openDetailsSimilar === coupon.id && (
                <div className="container-extra">
                  <div className="redemption-conditions">
                    <h3>Redemption conditions</h3>
                    <ul>
                      {coupon.highlight !== null && (
                        <li>
                          <FaCheckCircle /> Type of action:{" "}
                          {coupon.highlight === 1
                            ? "Featured"
                            : coupon.highlight === 2
                              ? "Verified"
                              : coupon.highlight === 3
                                ? "Exclusive"
                                : ""}
                        </li>
                      )}

                      {coupon.offer !== null && (
                        <li>
                          <FaCheckCircle /> Price reduction: {coupon.offer}%
                        </li>
                      )}

                      {coupon.start_date && (
                        <li>
                          <FaCheckCircle /> Start:{" "}
                          {new Date(coupon.start_date).toLocaleDateString()}
                        </li>
                      )}

                      {coupon.expire_date && (
                        <li>
                          <FaCheckCircle /> Expire:{" "}
                          {new Date(coupon.expire_date).toLocaleDateString()}
                        </li>
                      )}
                    </ul>
                    <p>{coupon.description}</p>
                    <hr />
                    {coupon.updated_at && (
                      <div className="last-updated">
                        <span>Last updated: </span>
                        <span>
                          {new Date(coupon.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Offer Popups */}
      {selectedOffer && (
        <OfferPopup
          offer={selectedOffer}
          storeName={storeName}
          containers={containers}
          bannerImage={bannerImage}
          popupModal={popupModal}
          onClose={handleClosePopup}
          storeData={storeData}
          simlarcoupons={simlarcoupons}
        />
      )}

      {selectedCodeOffer && (
        <CodePopup
          code={selectedCodeOffer}
          onClose={handleClosePopup}
          popupModal={popupModal}
          bannerImage={bannerImage}
          storeData={storeData}
        />
      )}
    </div>
  );
};

export default ContainerList;
