import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import Image from "../Image";
import images from "../../asset/images";
import Button from "./../Button";
import useColorClasses from "../../hooks/useColorClasses";
import { PAGE_TITLE, PATH } from "../../constants/path";
import Icon from "../Icon";
import IconButton from "./../IconButton/index";

const Header = ({
  userOptions,
  bgColor = "emerald",
  textColor = "white",
  className,
}) => {
  const { bgColor: newBgColor } = useColorClasses({ bgColor });
  const { textColor: newTextColor } = useColorClasses({ textColor });
  const navItems = [
    { label: PAGE_TITLE.HOME, path: PATH.HOME },
    { label: PAGE_TITLE.ABOUT, path: PATH.ABOUT },
    { label: PAGE_TITLE.PRODUCT, path: PATH.PRODUCT },
    { label: PAGE_TITLE.OTHER, path: PATH.OTHER },
    { label: PAGE_TITLE.CONTACT, path: PATH.CONTACT },
    { label: PAGE_TITLE.TEST, path: PATH.TEST },
  ];
  return (
    <header
      className={clsx(
        `w-full  h-[110px] text-2xl`,
        newBgColor,
        newTextColor,
        className
      )}
    >
      <div className="container flex h-full items-center justify-between">
        {/* Navigation Menu */}
        <nav className="space-x-4 text-xl font-medium">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                clsx("hover:text-yellow", isActive && "text-yellow")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logo Section */}
        <div className="flex items-center">
          <Button textLink to="/" className="hover:scale-110">
            <Image
              src={images.logo}
              width="xl:w-[85px] 55px"
              height="xl:h-[85px] 55px"
            />
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            href="tel:0966859061"
            className="text-2xl hover:text-yellow"
            textColor="white"
            startIcon={<Icon name="phone" size="1em" />}
          >
            0966 859 061
          </Button>
        </div>

        {/* language options */}
        <div className="flex gap-2">
          <IconButton
            size="zeroPadding"
            icon={<Icon name="vietnamFlag" width="25px" height="20px" />}
          />
          <IconButton
            size="zeroPadding"
            icon={<Icon name="chinaFlag" width="25px" height="20px" />}
          />
          <IconButton
            size="zeroPadding"
            icon={<Icon name="japanFlag" width="25px" height="20px" />}
          />
          <IconButton
            size="zeroPadding"
            icon={<Icon name="englandFlag" width="25px" height="20px" />}
          />
        </div>

        {/* User Options */}
        <div className="flex items-center space-x-4">
          {userOptions.map((option, index) => (
            <Link key={index} to={option.path} className="hover:text-blue-500">
              {option.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  logo: PropTypes.node.isRequired,
  userOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  className: PropTypes.string,
};

export default Header;
