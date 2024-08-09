import React, { useState } from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import clsx from "clsx";
import Button from "../Button";

const AccordionItem = ({
  title,
  children,
  isOpen,
  onClick,
  iconOpen,
  iconClosed,
}) => (
  <div className="border-b w-full">
    <button
      className={clsx(
        "flex items-center justify-between w-full p-4 text-left focus:outline-none",
        {
          "border-b-2 border-b-gray-200": isOpen,
          "border-b-2 border-b-transparent": !isOpen,
        }
      )}
      onClick={onClick}
    >
      <span className="flex-1">{title}</span>
      <span
        className={`transition-transform duration-300 ${
          isOpen ? "rotate-0" : "rotate-90"
        }`}
      >
        {isOpen ? iconOpen : iconClosed}
      </span>
    </button>
    <div
      className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
        isOpen ? "max-h-screen" : "max-h-0"
      }`}
    >
      <div className="p-4">{children}</div>
    </div>
  </div>
);

const Accordion = ({
  items,
  allowMultipleOpen,
  iconOpen = <Icon name="arrowDown" size="1em" />,
  iconClosed = <Icon name="arrowDown" size="1em" />,
  width,
  className,
}) => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const handleToggle = (index) => {
    if (allowMultipleOpen) {
      setOpenIndexes((prevIndexes) =>
        prevIndexes.includes(index)
          ? prevIndexes.filter((i) => i !== index)
          : [...prevIndexes, index]
      );
    } else {
      setOpenIndexes((prevIndexes) =>
        prevIndexes.includes(index) ? [] : [index]
      );
    }
  };

  const toggleAll = (open) => {
    setOpenIndexes(open ? items.map((_, i) => i) : []);
  };

  return (
    <div className={`accordion ${className}`} style={{ width }}>
      {items.length > 1 && (
        <div className="flex justify-between mb-4">
          <Button variant="outlined" onClick={() => toggleAll(true)}>
            Mở Tất Cả
          </Button>
          <Button
            variant="text"
            onClick={() => toggleAll(false)}
            bgColor="bg-transparent"
            textColor="text-red-300"
          >
            Đóng Tất Cả
          </Button>
        </div>
      )}
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndexes.includes(index)}
          onClick={() => handleToggle(index)}
          iconOpen={iconOpen}
          iconClosed={iconClosed}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  allowMultipleOpen: PropTypes.bool,
  iconOpen: PropTypes.node,
  iconClosed: PropTypes.node,
};

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  iconOpen: PropTypes.node.isRequired,
  iconClosed: PropTypes.node.isRequired,
};

export default Accordion;
