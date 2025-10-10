// import axios from "axios";
// import { useState, useEffect } from "react";
// import LogoBar1 from "./Components/Home/LogoBar1";
// import Navbar from "./Components/Navbar/Navbar";
// import Footer from "./Components/Home/Footer";
// import "bootstrap/dist/css/bootstrap.min.css";

// import { Outlet } from "react-router-dom";
// import ScrollToTop from "./Components/Home/ScrollToTop";
// function App() {
//   const apiUrl = import.meta.env.VITE_API_URL;
//   const [logo, setLogo] = useState("");
//   const [footerLogo, setFooterLogo] = useState("");
//   const [favicon, setFavicon] = useState("");
//   const [footer, setFooter] = useState("");
//   const [footerSocialLinks, setFooterSocialLinks] = useState([]);
//   const [themeColors, setThemeColors] = useState();
//   const [customPages, setCustomPages] = useState([]);
//   useEffect(() => {
//     // Fetch the settings from your API
//     axios
//       .get(`${apiUrl}api/settings`)
//       .then((response) => {
//         const { logo, footer_logo, favicon, theme_one, theme_two } =
//           response.data.setting;
//         const { footer } = response.data;
//         const { footerSocialLinks } = response.data;
//         setFooterSocialLinks(footerSocialLinks);
//         setFooter(footer);
//         setLogo(logo);
//         setFooterLogo(footer_logo);
//         setFavicon(favicon);
//         setThemeColors({ themeOne: theme_one, themeTwo: theme_two });

//         document.documentElement.style.setProperty("--primary", theme_one);
//         document.documentElement.style.setProperty(
//           "--btn-primary-hover",
//           theme_two
//         );
//         // Update the favicon in the index.html
//         if (favicon) {
//           const faviconLink = document.getElementById("favicon");
//           if (faviconLink) {
//             faviconLink.href = `${apiUrl}${favicon}`;
//           }
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching settings:", error);
//       });
//   }, []);

//   useEffect(() => {
//     fetch(`${apiUrl}api/custom-pages`)
//       .then((response) => response.json())
//       .then((data) => setCustomPages(data))
//       .catch((error) => console.error("Error fetching custom pages:", error));
//   }, []);
//   return (
//     <>
//       {/* <ScrollToTop /> */}
//       <Navbar logo={logo} />
//       <Outlet />
//       {/*  <Footer
//         footerLogo={footerLogo}
//         footer={footer}
//         footerSocialLinks={footerSocialLinks}
//         customPages={customPages}
//       ></Footer> */}
//     </>
//   );
// }

// export default App;

/////////////
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState({
    logo: "",
    footerLogo: "",
    favicon: "",
    footer: "",
    footerSocialLinks: [],
    themeColors: {},
    customPages: [],
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Run both API calls in parallel
        const [settingsRes, pagesRes] = await Promise.all([
          axios.get(`${apiUrl}api/settings`),
          fetch(`${apiUrl}api/custom-pages`).then((res) => res.json()),
        ]);

        const { logo, footer_logo, favicon, theme_one, theme_two } =
          settingsRes.data.setting;
        const { footer, footerSocialLinks } = settingsRes.data;

        setData({
          logo,
          footerLogo: footer_logo,
          favicon,
          footer,
          footerSocialLinks,
          themeColors: { themeOne: theme_one, themeTwo: theme_two },
          customPages: pagesRes,
        });

        // Apply theme colors
        document.documentElement.style.setProperty("--primary", theme_one);
        document.documentElement.style.setProperty(
          "--btn-primary-hover",
          theme_two
        );

        // Update favicon dynamically
        if (favicon) {
          const faviconLink = document.getElementById("favicon");
          if (faviconLink) faviconLink.href = `${apiUrl}${favicon}`;
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [apiUrl]);

  return (
    <>
      <Navbar logo={data.logo} />
      <Outlet />
      {/* Uncomment when needed */}
      {/* <Footer
        footerLogo={data.footerLogo}
        footer={data.footer}
        footerSocialLinks={data.footerSocialLinks}
        customPages={data.customPages}
      /> */}
    </>
  );
}

export default App;
