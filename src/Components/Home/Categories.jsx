import React from "react";
import "./Categories.css";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
 
const apiUrl = import.meta.env.VITE_API_URL;
const Categories = ({ data }) => { 

  const { t } = useTranslation(); 
  return (
    <div className="categories-container">
      <h2>{t('browse_the_categories')}</h2>
      <div className="categories-home">
        {data.map((category, index) => (
          <Link
            key={index}
            className="category-card-home"
            to={{
              pathname: "/gutscheine", 
              search: `?kategorie=${category.id}`,
            }}
          > 

            <img
              src={apiUrl + category.category_image}
              alt={category.category_image}
            />

            <div className="category-name-home">{category.name}</div>
          </Link>
        ))}
      </div>
      <Link to={"/kategorie"} className="all-categories-button">
        {t('all_categories')}
      </Link>
    </div>
  );
};

export default Categories;
