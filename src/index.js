import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { CartProvider, UserProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <I18nextProvider i18n={i18n}>
    <CartProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </CartProvider>
  </I18nextProvider>
);
