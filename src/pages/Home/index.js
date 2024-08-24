import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import Banner from "../../components/Banner";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Banner />
      <div className="py-[100px]"></div>
      <Footer />
    </>
  );
};

export default Home;
