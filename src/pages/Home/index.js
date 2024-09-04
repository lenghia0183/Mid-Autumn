import React from "react";

import { useTranslation } from "react-i18next";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import Banner from "../../components/Banner";
import images from "../../asset/images";
import Button from "../../components/Button";
import { PATH } from "../../constants/path";
import PopularDishes from "./PopularDishes";
import Reason from "./Reason";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Banner />
      <main className="py-10 md:py-20 bg-white">
        {/* section 1 */}
        <section className="container grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6">
          {/*  Div đầu tiên trải dài 2 cột và 2 hàng*/}
          <div className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 overflow-hidden rounded-xl relative">
            <div className="relative w-full aspect-[5/4] overflow-hidden">
              <div
                className="absolute inset-0 transform scale-100 hover:scale-110 duration-500"
                style={{
                  backgroundImage: `url(${images.home1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

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

          {/* Div thứ hai chiếm phần còn lại của hàng thứ nhất, cột thứ nhất  */}
          <div className="relative w-full aspect-[5/4] overflow-hidden">
            <div
              className="absolute inset-0 transform scale-100 hover:scale-110 duration-500"
              style={{
                backgroundImage: `url(${images.home2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

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

          {/* Div thứ ba chiếm phần còn lại của hàng thứ hai, cột thứ hai */}
          <div className="relative w-full aspect-[5/4] overflow-hidden">
            <div
              className="absolute inset-0 transform scale-100 hover:scale-110 duration-500"
              style={{
                backgroundImage: `url(${images.slide3})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

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

        <section className="container mt-20">
          <PopularDishes />
        </section>

        <section
          style={{
            backgroundImage: `url(${images.slide1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
          className="py-[150px] flex items-center justify-center mt-10 relative"
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.19)",
            }}
            className="h-full w-full absolute inset-0 pointer-events-none"
          ></div>
          <div className="text-center w-[40%] p-10 z-[1000]">
            <p className="text-xl text-yellow font-semibold">
              Mid Autumn Festival
            </p>
            <h2 className="text-[50px] font-semibold text-white mt-3">
              ĂN BÁNH TRUNG THU <br /> <span className="block">NGỌT NGÀO</span>
            </h2>
            <Button
              rounded
              textColor="white"
              bgColor="emerald"
              bgHoverColor="yellow"
              size="large"
              className="m-auto hover:text-dark font-semibold px-10 mt-5"
            >
              XEM MENU
            </Button>
          </div>
        </section>

        <Reason />
      </main>
      <Footer />
    </>
  );
};

export default Home;
