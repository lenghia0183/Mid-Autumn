import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import Image from "../Image";
import Icon from "../Icon"; // Giả sử bạn có một component Icon để hiển thị sao
import IconButton from "../IconButton";

const ItemCard = ({ product }) => {
  const { id, name, image, price, rating } = product;

  const renderStars = (rating) => {
    const totalStars = 5;
    let stars = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(
          <Icon key={i} name="starContained" color="emerald" size={1.5} />
        );
      } else if (i === Math.ceil(rating)) {
        stars.push(<Icon key={i} name="starHalf" color="emerald" size={1.5} />);
      } else {
        stars.push(
          <Icon key={i} name="starEmpty" color="emerald" size={1.5} />
        );
      }
    }

    return stars;
  };

  return (
    <div className="group relative  shadow-md rounded-md overflow-hidden  bg-white-100">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          className="transition-transform duration-300 group-hover:scale-110 absolute inset-0"
        />
        {/* Options */}
        <div
          className="absolute inset-x-0 bottom-[20px] flex justify-center gap-5 transition-transform duration-300 transform translate-y-full opacity-0
        group-hover:translate-y-0 group-hover:opacity-100"
        >
          <IconButton
            iconName="bag"
            textColor="dark"
            width="40px"
            height="40px"
            className=" rounded-md   px-2 py-1 bg-yellow-500"
          />
          <IconButton
            iconName="search"
            textColor="dark"
            width="40px"
            height="40px"
            className=" rounded-md px-2 py-1 bg-yellow-500"
          />
          <IconButton
            iconName="eye"
            textColor="dark"
            width="40px"
            height="40px"
            className="rounded-md   px-2 py-1 bg-yellow-500"
          />
          <IconButton
            iconName="heart"
            textColor="dark"
            width="40px"
            height="40px"
            // iconSize={1.5}
            className=" rounded-md   px-2 py-1 bg-yellow-500"
          />
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-dark mt-2">{name}</h3>
        <div className="flex space-x-1 mt-2">{renderStars(rating)}</div>
        <p className="text-xl font-bold text-dark mt-2">{price}</p>
      </div>
    </div>
  );
};

ItemCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired, // Thêm thuộc tính rating
  }).isRequired,
};

export default ItemCard;
