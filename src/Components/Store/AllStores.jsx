import React, { useState, useEffect } from "react";
import "./AllStores.css";
import Loader from "../Loader/Loader";
import { Link, useLoaderData } from "react-router-dom"; 
import NotFound from "../NotFound/NotFound";
import { useTranslation } from 'react-i18next';
const AllStores = ({ heading }) => {
  const { search } = useLoaderData(); 
  const [stores, setStores] = useState([]);
  const { category } = useLoaderData();
  const [loading, setLoading] = useState(true); 
  const apiUrl = import.meta.env.VITE_API_URL; 
  const [currentPage, setCurrentPage] = useState(0); 
  const storesPerPage = 14; 
  const { t } = useTranslation(); 
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(
          `${apiUrl}api/stores?search=${encodeURIComponent(
            search || ""
          )}&category=${encodeURIComponent(category || "")}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch stores");
        }

        const data = await response.json();
        setStores(data); 
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchStores();
  }, [search]); 
 
  const displayedStores = stores.slice(
    currentPage * storesPerPage,
    (currentPage + 1) * storesPerPage
  );

  const handleNext = () => {
    if ((currentPage + 1) * storesPerPage < stores.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mainStoreLogo">
      <div className="card-store-section">
        <h2>{t('store')}</h2>
        <div className="card-store-container">
          {loading ? (  
            <Loader />
          ) : displayedStores.length === 0 ? (  
            <NotFound />
          ) : (
            displayedStores.map((logo, index) => (
              <Link
                to={"/gutscheine/" + logo.slug}
                key={index}
                className="store-logo"
              >
                <img
                  src={apiUrl + logo.banner}
                  alt={logo.name}
                  className="store-logo-image"
                />
                <p>{logo.name}</p>
              </Link>
            ))
          )}
        </div>
        {stores.length > storesPerPage && (
          <div className="pagination-buttons"> 
            {currentPage > 0 && (
              <button
                onClick={handlePrevious}
                className="pagination-btn previous-btn"
              >
                {t('previous')}
              </button>
            )}
 
            {(currentPage + 1) * storesPerPage < stores.length && (
              <button onClick={handleNext} className="pagination-btn next-btn">
                {t('next')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllStores;
