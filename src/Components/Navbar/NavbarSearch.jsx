import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../LanguageSelecctor/LanguageSelector";

const NavbarSearch = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => setSearchQuery(e.target.value);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/gutscheine?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchQuery.trim()) handleSearch();
    }, 300);
    return () => clearTimeout(delay);
  }, [searchQuery]);

  return (
    <div className="d-flex align-items-center mainSM">
      <LanguageSelector />
      <div className="navbar-search">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={t("search_for_store")}
          className="search-input"
        />
        <FaSearch className="search-icon" onClick={handleSearch} />
      </div>
      <button className="menu-button">
        <IoMenu />
      </button>
    </div>
  );
};

export default NavbarSearch;
