import React, { useState, useEffect } from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp, FaAngleRight } from "react-icons/fa";
import axios from "axios";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import { useTranslation } from "react-i18next";

const CategoryDropdown = ({ dropdownRef, open, setOpen }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      let response = await axios.get(apiUrl + "api/coupons");
      let cats = response.data.categories.map((c) => ({
        name: c.name,
        id: c.id,
        icon: c.icon,
        coupons: c.coupon_store,
        slug: c.slug,
      }));
      setCategories(cats);
      if (cats.length > 0) {
        setSelectedCategory(cats[0].id);
        setSelectedCoupons(cats[0].coupons || []);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (id) => {
    const category = categories.find((c) => c.id === id);
    setSelectedCategory(id);
    setSelectedCoupons(category?.coupons || []);
  };

  return (
    <li
      className="navbar-item dropdown"
      ref={dropdownRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="navbar-button" onClick={() => setOpen(!open)}>
        {t("nav_category")}
        {open ? <FaAngleUp style={{ marginLeft: "3px" }} /> : <FaAngleDown style={{ marginLeft: "3px" }} />}
      </button>

      <div className={`new-dropdown-content ${open ? "show" : ""}`}>
        <div className="first-section">
          <p>{t("popular_category")}</p>
          {!categories || categories.length === 0 ? (
            <Loader />
          ) : (
            categories.slice(0, 9).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`category-button ${selectedCategory === category.id ? "active" : ""}`}
              >
                <i className={category.icon}></i> {category.name} <FaAngleRight />
              </button>
            ))
          )}
          <Link to={"/kategorie"} target="_blank" className="see-all-categories">
            {t("see_all_category")}
          </Link>
        </div>

        <div className="second-section">
          {categories.filter((c) => c.id === selectedCategory).map((cat) => (
            <div key={cat.id}>
              <div className="d-flex justify-content-between align-items-baseline">
                <p>{t("top_category", { categoryName: cat.name })}</p>
                <Link
                  to={{ pathname: "/gutscheine", search: `?kategorie=${cat.id}` }}
                  target="_blank"
                  className="see-all-clothing-apparel"
                >
                  {t("see_all")} {cat.name}
                </Link>
              </div>
              {selectedCoupons.length === 0 ? (
                <NotFound />
              ) : (
                <div className="stores-list">
                  {selectedCoupons.slice(0, 6).map((coupon) => (
                    <Link to={`/gutscheine/${coupon.slug}`} key={coupon.id} className="store-link">
                      <div className="store-image">
                        <img src={apiUrl + coupon.banner} alt={coupon.name} />
                      </div>
                      <span>{coupon.name}</span>
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

export default CategoryDropdown;
