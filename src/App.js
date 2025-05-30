import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebaseConfig";
import { useTranslation } from "react-i18next";

import { useRecordVisit } from "./service/https/visit";
import { useEffect } from "react";

function App() {
  const { i18n } = useTranslation();
  auth.languageCode = i18n.language;
  const { trigger: recordVisit } = useRecordVisit();
  useEffect(() => {
    recordVisit();
  }, []);

  return (
    <>
      <ToastContainer style={{ zIndex: "9999999999" }} />
      <RouterProvider router={router}>
        <div className="App"></div>
      </RouterProvider>
    </>
  );
}

export default App;
