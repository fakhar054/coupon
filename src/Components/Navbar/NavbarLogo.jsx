import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NavbarLogo = ({ logo }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <div className="innerlogo-2">
      <Link to="" className="d-flex align-items-center atag">
        <img src={apiUrl + logo} alt="logo" />
      </Link>
    </div>
  );
};

export default NavbarLogo;
    