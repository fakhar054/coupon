import axios from "axios";
import { useState, useEffect } from "react";
import LogoBar1 from "./Components/Home/LogoBar1";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Home/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

import { Outlet } from "react-router-dom";
import ScrollToTop from "./Components/Home/ScrollToTop";
function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [logo, setLogo] = useState("");
  const [footerLogo, setFooterLogo] = useState("");
  const [favicon, setFavicon] = useState("");
  const [footer, setFooter] = useState("");
  const [footerSocialLinks, setFooterSocialLinks] = useState([]);
  const [customPages, setCustomPages] = useState([]);

  useEffect(() => {
    fetchSettings();
    fetchCustomPages();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${apiUrl}api/settings`);

      const { logo, footer_logo, favicon, theme_one, theme_two } =
        response.data.setting;
      const { footer, footerSocialLinks } = response.data;

      setLogo(logo);
      setFooterLogo(footer_logo);
      setFavicon(favicon);
      setFooter(footer);
      setFooterSocialLinks(footerSocialLinks);

      document.documentElement.style.setProperty("--primary", theme_one);
      document.documentElement.style.setProperty(
        "--btn-primary-hover",
        theme_two
      );

      if (favicon) {
        const faviconLink = document.getElementById("favicon");
        if (faviconLink) faviconLink.href = `${apiUrl}${favicon}`;
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const fetchCustomPages = async () => {
    try {
      const response = await fetch(`${apiUrl}api/custom-pages`);
      const data = await response.json();
      setCustomPages(data);
    } catch (error) {
      console.error("Error fetching custom pages:", error);
    }
  };

  return (
    <>
      {/* <ScrollToTop /> */}
      <Navbar logo={logo} />
      <Outlet />
      <Footer
        footerLogo={footerLogo}
        footer={footer}
        footerSocialLinks={footerSocialLinks}
        customPages={customPages}
      ></Footer>
    </>
  );
}

export default App;
