import React, { useState, useEffect } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa"; 
import "./CouponBar.css";
import { useNavigate } from 'react-router-dom';
const CouponBar = ({ onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [categorySearch, setCategorySearch] = useState("");
  const [storeSearch, setStoreSearch] = useState("");
  
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".coupon-dropdown")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setOpenDropdown(null);
  };

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    setOpenDropdown(null);
  };

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown((prevDropdown) =>
      prevDropdown === dropdown ? null : dropdown
    );
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };
 
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate(); 
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); 
  };
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/categorycoupon?search=${searchQuery}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="coupon-bar">
      <div className="coupon-all-coupon-div">
        <h2 className="coupon-heading">All Coupon</h2>
      </div>
      
      
      <div className="coupon-search-bar">
        <input
          type="text"
          placeholder="Search"
          className="coupon-search-input"
          value={searchQuery} 
          onChange={handleInputChange} 
          onKeyPress={handleKeyPress} 
        />
        <button onClick={handleSearch} className="coupon-search-button">
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default CouponBar;
