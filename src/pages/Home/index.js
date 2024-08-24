import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import Banner from "../../components/Banner";
import images from "../../asset/images";
import Button from "../../components/Button";
import { PATH } from "../../constants/path";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Banner />
      <div className="py-10 md:py-20">
        <section className="container grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4">
          {/* The first div spans 2 columns and 2 rows */}
          <div className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 overflow-hidden rounded-xl relative">
            <div className="relative w-full aspect-[5/4] overflow-hidden">
              {/* Phần tử chứa hình ảnh */}
              <div
                className="absolute inset-0 transform scale-100 hover:scale-110 duration-500"
                style={{
                  backgroundImage: `url(${images.home1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Phần tử chứa nội dung */}
              <div className="absolute p-4 md:p-6 text-center md:text-left">
                <h2 className="text-xl md:text-3xl font-semibold text-white">
                  {t("home.section1.title1")}
                </h2>
                <p className="text-sm md:text-lg font-medium text-white mt-2">
                  {t("home.section1.desc1")}
                </p>
                <Button
                  rounded
                  to={PATH.HOME}
                  bgColor="white"
                  textColor="emerald"
                  className="font-medium mt-4"
                  bgHoverColor="yellow"
                >
                  {t("common.byNow")}
                </Button>
              </div>
            </div>
          </div>

          {/* Second div occupies the remaining first row, first column */}
          <div className="relative w-full aspect-[5/4] overflow-hidden">
            {/* Phần tử chứa hình ảnh */}
            <div
              className="absolute inset-0 transform scale-100 hover:scale-110 duration-500"
              style={{
                backgroundImage: `url(${images.home2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Phần tử chứa nội dung */}
            <div className="absolute p-4 md:p-6 text-center">
              <h2 className="text-lg md:text-xl font-semibold text-white">
                {t("home.section1.title2")}
              </h2>

              <Button
                rounded
                to={PATH.HOME}
                bgColor="white"
                textColor="emerald"
                className="font-medium mt-2"
                bgHoverColor="yellow"
              >
                {t("common.byNow")}
              </Button>
            </div>
          </div>

          {/* Third div occupies the remaining second row, second column */}
          <div className="relative w-full aspect-[5/4] overflow-hidden">
            {/* Phần tử chứa hình ảnh */}
            <div
              className="absolute inset-0 transform scale-100 hover:scale-110 duration-500"
              style={{
                backgroundImage: `url(${images.slide3})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Phần tử chứa nội dung */}
            <div className="absolute p-4 md:p-6 text-center">
              <h2 className="text-lg md:text-xl font-semibold text-dark">
                {t("home.section1.title3")}
              </h2>

              <Button
                rounded
                to={PATH.HOME}
                bgColor="white"
                textColor="emerald"
                className="font-medium mt-2"
                bgHoverColor="yellow"
              >
                {t("common.byNow")}
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
