import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp, FaAngleRight } from "react-icons/fa";
import axios from "axios";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import { useTranslation } from "react-i18next";

const StoreDropdown = ({ dropdownRef, open, setOpen }) => {
  const { t } = useTranslation();
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedStoreCoupons, setSelectedStoreCoupons] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStores = async () => {
      let response = await axios.get(apiUrl + "api/coupons");
      let storesData = response.data.stores.map((store) => ({
        name: store.name,
        id: store.id,
        icon: store.icon,
        coupons: store.coupons,
        banner: store.banner,
        slug: store.slug,
      }));

      setStores(storesData);
      if (storesData.length > 0) {
        setSelectedStore(storesData[0].id);
        setSelectedStoreCoupons(storesData[0].coupons || []);
      }
    };
    fetchStores();
  }, []);

  const handleStoreClick = (storeId) => {
    setSelectedStore(storeId);
    const store = stores.find((s) => s.id === storeId);
    setSelectedStoreCoupons(store?.coupons || []);
  };

  return (
    <li
      className="navbar-item dropdown"
      ref={dropdownRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="navbar-button" onClick={() => setOpen(!open)}>
        {t("nav_store")}
        {open ? <FaAngleUp style={{ marginLeft: "3px" }} /> : <FaAngleDown style={{ marginLeft: "3px" }} />}
      </button>

      <div className={`new-dropdown-content ${open ? "show" : ""}`}>
        <div className="first-section">
          <p>{t("popular_store")}</p>
          {!stores || stores.length === 0 ? (
            <Loader />
          ) : (
            stores.slice(0, 9).map((store) => (
              <button
                key={store.id}
                onClick={() => handleStoreClick(store.id)}
                className={`category-button ${selectedStore === store.id ? "active" : ""}`}
              >
                {store.name} <FaAngleRight />
              </button>
            ))
          )}
          <Link to={"/gutscheine"} target="_blank" className="see-all-categories">
            {t("see_all_store")}
          </Link>
        </div>

        <div className="second-section">
          {stores.filter((e) => e.id === selectedStore).map((store) => (
            <div key={store.id}>
              <div className="d-flex justify-content-between align-items-baseline">
                <p>{t("top_store", { storeName: store.name })}</p>
                <Link to={`/gutscheine/${store.slug}`} target="_blank" className="see-all-clothing-apparel">
                  {t("see_all")} {store.name}
                </Link>
              </div>
              {selectedStoreCoupons.length === 0 ? (
                <NotFound />
              ) : (
                <div className="stores-list">
                  {selectedStoreCoupons.slice(0, 6).map((coupon) => (
                    <Link
                      to={`/gutscheine/${store.slug}`}
                      key={coupon.id}
                      className="store-link"
                    >
                      <div className="store-image">
                        <img src={apiUrl + store.banner} alt={store.name} />
                      </div>
                      <span>{coupon.title || "No Title Available"}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </li>
  );
};

export default StoreDropdown;
