import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import { useTranslation } from "react-i18next";
import StoreDropdown from "./StoreDropdown";
import CategoryDropdown from "./CategoryDropdown";

const NavbarMenu = ({ logo }) => {
  const { t } = useTranslation();
  const dropdownRefs = {
    stores: useRef(null),
    categories: useRef(null),
  };

  const [storesDropdownOpen, setStoresDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  return (
    <ul className="navbar-menu">
      <li className="navbar-item innerlogo-1">
        <Link to="/" className="d-flex align-items-center atag">
          <img src={import.meta.env.VITE_API_URL + logo} alt="logo" />
        </Link>
      </li>

      <li className="navbar-item">
        <Link to="/">
          <button className="navbar-button">{t("nav_welcome")}</button>
        </Link>
      </li>

      {/* Stores Dropdown */}
      <StoreDropdown
        dropdownRef={dropdownRefs.stores}
        open={storesDropdownOpen}
        setOpen={setStoresDropdownOpen}
      />

      {/* Categories Dropdown */}
      <CategoryDropdown
        dropdownRef={dropdownRefs.categories}
        open={categoriesDropdownOpen}
        setOpen={setCategoriesDropdownOpen}
      />
    </ul>
  );
};

export default NavbarMenu;
