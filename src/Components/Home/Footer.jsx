import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { IoIosPhonePortrait } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { FaRegCopyright } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const socialLabels = {
  "fab fa-facebook": "Facebook",
  "fab fa-twitter": "Twitter",
  "fab fa-linkedin": "LinkedIn",
  "fab fa-instagram": "Instagram",
};
const Footer = ({ footerLogo, footer, footerSocialLinks, customPages }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { t } = useTranslation();
  return (
    <>
      <footer className="footer">
        <div className="footer-section">
          <h2>{t("help")}</h2>
          <ul>
            <li>
              <Link to="/kontaktierensieuns">{t("contact_us")}</Link>
            </li>
            <li>
              <Link to="/Datenschutzerklärung">{t("privacy_policy")}</Link>
            </li>
            <li>
              <Link to="/allgemeinegeschäftsbedingungen">
                {t("terms_condition")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <>
            <h4 className="custom-page-title" style={{ visibility: "hidden" }}>
              {t("custom_pages")}
            </h4>
            <style>
              {`
          @media (max-width: 992px) {
            .custom-page-title {
              display: none;
            }
          }
        `}
            </style>
          </>
          <ul>
            {customPages.map((page, index) => (
              <li key={page.id || index}>
                <Link
                  to={`/Seite/${page.slug}`}
                  style={{ marginRight: "10px" }}
                >
                  {page.page_name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h2>{t("pursue")}</h2>
          <ul>
            <li>
              <Link to="/überuns">{t("About_us")}</Link>
            </li>
            <li>
              <Link to="/gutscheine">{t("All_Stores")}</Link>
            </li>
            <li>
              <Link to="/kategorie">{t("all_categories")}</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section footer-logo-section">
          <Link to="/">
            <img
              src={apiUrl + footerLogo}
              alt="Logo"
              width={142}
              height={40}
              className="footer-logo"
            />
          </Link>
          <ul>
            <li>
              <span>
                <IoIosPhonePortrait /> {footer.phone}.
              </span>
            </li>
            <li>
              <span>
                {" "}
                <CiMail /> {footer.email}.
              </span>
            </li>
            <li>
              <span>
                <CiLocationOn /> {footer.address}.
              </span>
            </li>
          </ul>

          <div className="footer-icons">
            {footerSocialLinks.map((footerSocialLink, index) => (
              <a
                key={footerSocialLink.id || index}
                href={footerSocialLink.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white" }}
                aria-label={socialLabels[footerSocialLink.icon]} // accessibility fix
              >
                <i className={footerSocialLink.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </footer>

      <div className="footer-end">
        <FaRegCopyright />
        {footer.copyright}
      </div>
      {/* <LanguageSelector/> */}
    </>
  );
};

export default Footer;
