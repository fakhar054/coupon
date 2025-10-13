import React from "react";
import "./CardLogoSection.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CardLogoSection = ({ data }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { t } = useTranslation();
  return (
    <div className="mainLogo">
      <div className="card-logo-section">
        <h2>{t("where_you_save")}</h2>
        <div className="card-logo-container">
          {data.slice(0, 36).map((logo, index) => (
            <Link
              to={"/gutscheine/" + logo.slug}
              key={index}
              className="card-logo"
            >
              <img
                src={apiUrl + logo.banner}
                alt={logo.alt || "Voucher Logo"}
                className="card-logo-image"
                loading="lazy"
              />
              <p>{logo.coupons_count + " " + t("vouchers")}</p>
            </Link>
          ))}
        </div>

        <Link to="/gutscheine" className="card-logo-button">
          {t("All_Stores")}
        </Link>
      </div>
    </div>
  );
};

export default CardLogoSection;
