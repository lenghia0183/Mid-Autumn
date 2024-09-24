import Slider from "react-slick";

import { useRef } from "react";
import IconButton from "../IconButton";
import ItemCard from "../ItemCard";
import images from "../../asset/images";
import clsx from "clsx";

function RelatedProducts({ className }) {
  const slider = useRef();

  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
    <section className={clsx("container mt-14", className)}>
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

export default RelatedProducts;
