import React from "react";
import "./Navbar.css";
import NavbarLogo from "./NavbarLogo";
import NavbarMenu from "./NavbarMenu";
import NavbarSearch from "./NavbarSearch";
import NavbarSidebar from "./NavbarSidebar";
import "./Navbar.css";


function Navbar({ logo }) {
  return (
    <nav className="navbar">
      <NavbarLogo logo={logo} />
      <div className="container">
        <NavbarMenu logo={logo} />
        <NavbarSearch />
      </div>
      <NavbarSidebar />
    </nav>
  );
}

export default Navbar;
