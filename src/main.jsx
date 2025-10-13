import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App';
import "./index.css";
import "./Components/LanguageSelecctor/i18n";
import { I18nextProvider } from "react-i18next";
import i18n from "./Components/LanguageSelecctor/i18n";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index";

ReactDOM.createRoot(document.getElementById("root")).render(
  <I18nextProvider i18n={i18n}>
    <RouterProvider router={router} />
  </I18nextProvider>
);
