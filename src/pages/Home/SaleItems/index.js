import Slider from "react-slick";
import ItemCard from "../../../components/ItemCard";
import images from "../../../asset/images";
import IconButton from "../../../components/IconButton";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

function SaleItems() {
  const slider = useRef();
  const { t } = useTranslation();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    arrow: false,
  };

  const saleItems = [
    {
      id: 1,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish1,
      rating: 2.5,
      alt: "Banner 1",
    },
    {
      id: 2,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish2,
      rating: 5,
      alt: "Banner 1",
    },
    {
      id: 3,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish3,
      rating: 4,
      alt: "Banner 1",
    },
    {
      id: 4,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish4,
      rating: 5,
      alt: "Banner 1",
    },
    {
      id: 5,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish4,
      rating: 5,
      alt: "Banner 1",
    },
    {
      id: 6,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish4,
      rating: 5,
      alt: "Banner 1",
    },
  ];

  return (
    <section className="container mt-14">
      <h4 className="text-xl text-emerald font-medium text-center">
        {t("common.midAutumnFestival")}
      </h4>
      <h3 className="text-[42px] font-semibold text-dark text-center">
        {t("home.saleItems.title")}
      </h3>
      <p className="text-xl text-dark font-medium text-center w-[70%] m-auto  mb-7">
        {t("home.saleItems.desc")}
      </p>
      <div className="relative">
        <IconButton
          className="absolute top-1/2 -translate-y-1/2 left-[-50px]"
          iconName="arrowSlider"
          variant="contained"
          size="small"
          bgColor="emerald"
          textColor="white"
          bgHoverColor="yellow"
          iconSize={1.5}
          onClick={() => {
            slider?.current?.slickPrev();
          }}
        />

        <IconButton
          className="rotate-180 absolute top-1/2 -translate-y-1/2 right-[-50px]"
          iconName="arrowSlider"
          variant="contained"
          size="small"
          bgColor="emerald"
          textColor="white"
          bgHoverColor="yellow"
          iconSize={1.5}
          onClick={() => {
            slider?.current?.slickNext();
          }}
        />

        <Slider ref={slider} {...settings}>
          {saleItems.map((item, index) => {
            return (
              <div className="" key={index}>
                <ItemCard product={item} className="mx-2" />
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
}

export default SaleItems;