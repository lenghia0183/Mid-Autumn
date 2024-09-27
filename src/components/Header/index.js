import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import Image from "../Image";
import images from "../../asset/images";
import Button from "./../Button";
import useColorClasses from "../../hooks/useColorClasses";
import { PAGE_TITLE, PATH } from "../../constants/path";
import Icon from "../Icon";
import IconButton from "./../IconButton/index";
import DrawerMenu from "./../DrawerMenu/index";
import Divider from "../Devider";
import { useTranslation } from "react-i18next";
import useChangeLanguage from "../../hooks/useChangeLanguage";

const Header = ({ bgColor = "emerald", textColor = "white", className }) => {
  const { bgColor: newBgColor } = useColorClasses({ bgColor });
  const { textColor: newTextColor } = useColorClasses({ textColor });
  const [isShowCart, setIsShowCart] = useState(false);
  const [isShowNavDrawer, setIsShowNavDrawer] = useState(false);

  const { pathname } = useLocation();

  const { t } = useTranslation();
  const changeLanguage = useChangeLanguage();

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
  };

  const navItems = [
    { label: PAGE_TITLE.HOME, path: PATH.HOME, isArrow: false },
    { label: PAGE_TITLE.ABOUT, path: PATH.ABOUT, isArrow: false },
    { label: PAGE_TITLE.PRODUCT, path: PATH.PRODUCTS, isArrow: true },
    { label: PAGE_TITLE.OTHER, path: PATH.OTHER, isArrow: true },
    { label: PAGE_TITLE.CONTACT, path: PATH.CONTACT, isArrow: false },
  ];

  const renderTitleDrawer = () => {
    return (
      <div>
        <div className="flex items-center justify-between w-full mt-5">
          <h4 className="text-dark text-2xl font-semibold">
            {t("cart.title")}
          </h4>
          <IconButton
            iconName="close"
            textColor="dark"
            onClick={() => {
              setIsShowCart(false);
            }}
          />
        </div>
      </div>
    );
  };

  const renderTitleNavDrawer = () => {
    return (
      <div className="">
        <div className="flex items-center justify-between w-full mt-2">
          <h4 className="text-white text-2xl font-semibold">
            {t("common.midAutumnFestival")}
          </h4>
          <IconButton
            iconName="close"
            textColor="white"
            onClick={() => {
              setIsShowCart(false);
            }}
          />
        </div>
      </div>
    );
  };

  const renderContentDrawer = () => {
    return (
      <div className="p-4 pt-0">
        <Divider marginTop="10px" />

        <p className="text-dark-800 text-xl font-medium">{t("cart.empty")}</p>
        <div className="flex justify-between mt-5">
          <div className="text-dark text-xl font-medium ">
            {t("cart.total")}
          </div>
          <div className="text-crimson text-xl font-medium">0đ</div>
        </div>

        <Divider marginTop="10px" marginBottom="20px" />

        <Button
          full
          bgColor="crimson"
          bgHoverColor="crimson-hover"
          textColor="white"
          className="text-xl font-medium"
          to={PATH.CART}
        >
          {t("cart.cartBtn")}
        </Button>

        <Button
          full
          bgColor="yellow"
          bgHoverColor="yellow-hover"
          className="mt-3 text-xl font-medium"
          to={PATH.CHECKOUT}
          textColor="white"
        >
          {t("cart.checkoutBtn")}
        </Button>
      </div>
    );
  };

  const renderNavBar = () => {
    return (
      <div className="p-4 pt-0">
        <Divider className="mt-2" />
        <nav className="flex flex-col text-base font-semibold">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  "flex items-center py-3 hover:text-yellow group duration-500 border-b border-white",
                  isActive && "text-yellow"
                )
              }
            >
              {t(item.label)}
              {item?.isArrow && (
                <Icon
                  name="arrowDown"
                  size="0.6em"
                  strokeWidth={5}
                  className="transition-transform transform group-hover:rotate-180 ml-1"
                />
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    );
  };

  return (
    <header
      className={clsx(`w-full h-[110px]`, newBgColor, newTextColor, className)}
    >
      <div className="container relative h-full text-base">
        {/* Navigation Menu */}
        <nav className="absolute left-0 top-1/2 -translate-y-1/2 space-x-4 text-base font-semibold xl:flex sm:hidden">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  "flex items-center hover:text-yellow group duration-500",
                  isActive && "text-yellow"
                )
              }
            >
              {t(item.label)}
              {item?.isArrow && (
                <Icon
                  name="arrowDown"
                  size="0.6em"
                  strokeWidth={5}
                  className="transition-transform transform group-hover:rotate-180 ml-1"
                />
              )}
            </NavLink>
          ))}
        </nav>

        <div className="absolute left-0 top-1/2 -translate-y-1/2 xl:hidden">
          <IconButton
            iconName="menu"
            textColor="white"
            textHoverColor="yellow"
            onClick={() => {
              setIsShowNavDrawer(true);
            }}
          />
        </div>

        {/* Logo Section */}
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
          <Button to={PATH.HOME} className="hover:scale-110">
            <Image
              src={images.logo}
              width="xl:w-[85px] 55px"
              height="xl:h-[85px] 55px"
            />
          </Button>
        </div>

        <div className="flex absolute right-0 top-1/2 -translate-y-1/2 space-x-3">
          {/* Contact Number */}
          <Button
            href="tel:0966859061"
            className=" hover:text-yellow font-sourceSansPro font-semibold text-xl xl:flex sm:hidden"
            textColor="white"
            startIcon={<Icon name="phone" size="1.5em" />}
          >
            {t("shopInfo.phoneNumber")}
          </Button>

          {/* Search Button */}
          <IconButton
            iconName="search"
            textColor="white"
            iconSize="1.6"
            textHoverColor="yellow"
          />

          {/* Profile Button */}
          <IconButton
            iconName="user"
            textColor={pathname?.includes(PATH.PROFILE) ? "yellow" : "white"}
            iconSize="1.5"
            textHoverColor="yellow"
            to={PATH.PROFILE_EDIT}
          />

          {/* Cart Button */}
          <IconButton
            iconName="bag"
            textColor="white"
            iconSize="1.7"
            textHoverColor="yellow"
            onClick={() => {
              setIsShowCart(true);
            }}
          />

          {/* Language Options */}
          <div className="flex gap-2">
            <IconButton
              iconName="vietnamFlag"
              iconWidth="30px"
              iconHeight="25px"
              onClick={() => handleLanguageChange("vi")}
            />
            <IconButton
              iconName="chinaFlag"
              iconWidth="30px"
              iconHeight="25px"
              onClick={() => handleLanguageChange("zh")}
            />
            <IconButton
              iconName="japanFlag"
              iconWidth="30px"
              iconHeight="25px"
              onClick={() => handleLanguageChange("jp")}
            />
            <IconButton
              iconName="englandFlag"
              iconWidth="30px"
              iconHeight="25px"
              onClick={() => handleLanguageChange("en")}
            />
          </div>
        </div>
      </div>

      <DrawerMenu
        renderTitle={renderTitleDrawer}
        renderContent={renderContentDrawer}
        isOpen={isShowCart}
        position="right"
        width="350px"
        borderColor="transparent"
        bgColor="white"
        handleOverlayClick={() => {
          setIsShowCart(false);
        }}
      />

      <DrawerMenu
        renderTitle={renderTitleNavDrawer}
        renderContent={renderNavBar}
        isOpen={isShowNavDrawer}
        position="left"
        width="350px"
        borderColor="transparent"
        bgColor="emerald"
        handleOverlayClick={() => {
          setIsShowNavDrawer(false);
        }}
      />
    </header>
  );
};

Header.propTypes = {
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  className: PropTypes.string,
};

export default Header;
