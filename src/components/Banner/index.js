import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import images from "../../asset/images";
import Button from "./../Button/index";
import { useTranslation } from "react-i18next";

// Dữ liệu cho các banner
const bannerData = [
  {
    id: 1,
    src: images.slide1,

    alt: "Banner 1",
  },
  {
    id: 2,
    src: images.slide2,
    alt: "Banner 2",
  },
  {
    id: 3,
    src: images.slide3,
    alt: "Banner 3",
  },
];

const Banner = () => {
  const { t } = useTranslation();

  const settings = {
    infinite: true,
    speed: 7000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {bannerData.map((banner) => {
          console.log("test", `url("${banner.src}")`);
          return (
            <>
              <div
                className="w-full h-[700px]"
                style={{
                  backgroundImage: `url(${banner.src})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </>
          );
        })}
      </Slider>
      <div
        className="absolute top-[60%] right-0 w-[25%] aspect-square animate-slide-horizontal pointer-events-none"
        style={{
          backgroundImage: `url(${images.childrenBanner1})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div
        className="-translate-y-1/2 absolute top-1/2 right-[20%] w-[750px] p-[30px]"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      >
        <h1 className="text-white text-[50px] font-medium hover:text-yellow text-center duration-500">
          {t("banner.title")}
        </h1>
        <p className="text-[22px] text-yellow text-center font-medium">
          {t("banner.desc")}
        </p>
        <Button
          rounded
          bgColor="yellow"
          textColor="dark"
          bgHoverColor="emerald"
          className="text-[18px] h-[45px] font-medium mt-5 px-[40px] duration-500 hover:text-white m-auto"
        >
          {t("banner.itemBtn")}
        </Button>
      </div>
    </div>
  );
};

export default Banner;
