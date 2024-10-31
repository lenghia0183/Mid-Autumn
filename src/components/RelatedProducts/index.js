import Slider from "react-slick";

import { useEffect, useRef } from "react";
import IconButton from "../IconButton";
import ItemCard from "../ItemCard";
import clsx from "clsx";
import { useGetProduct } from "../../service/https";

function RelatedProducts({ className, categoryId, manufacturerId, productId }) {
  const { data, mutate: refreshData } = useGetProduct({
    categoryId,
    manufacturerId: [manufacturerId],
    limit: 6,
    page: 1,
  });

  const saleItems = data?.data?.products || [];

  useEffect(() => {
    refreshData();
  }, [productId, categoryId, manufacturerId]);

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
    responsive: [
      {
        breakpoint: 1024, // 1024px
        settings: {
          slidesToShow: 2, // Hiển thị 3 slide
        },
      },
      {
        breakpoint: 480, // 480px
        settings: {
          slidesToShow: 1, // Hiển thị 1 slide
        },
      },
    ],
  };

  return (
    <section className={clsx("container sm:mt-14 mt-10", className)}>
      {saleItems.length > 2 ? (
        <div className="relative">
          <IconButton
            type="button"
            className="absolute top-1/2 -translate-y-1/2 left-[-50px] hidden sm:flex"
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
            type="button"
            className="rotate-180 absolute top-1/2 -translate-y-1/2 right-[-50px] hidden sm:flex"
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
                <div key={index}>
                  <ItemCard product={item} className="mx-2" />
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        <div className="flex justify-center gap-4">
          {saleItems?.map((item, index) => (
            <div className="w-[25%]" key={index}>
              <ItemCard product={item} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default RelatedProducts;
