import React, { useEffect, useRef, useState } from "react";
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
import useBreakpoint from "./../../hooks/useBreakpoint";

const Header = ({ bgColor = "emerald", textColor = "white", className }) => {
  const containerRef = useRef();
  const [padding, setPadding] = useState({});
  const isLargerThanSm = useBreakpoint("sm");

  const { bgColor: newBgColor } = useColorClasses({ bgColor });
  const { textColor: newTextColor } = useColorClasses({ textColor });
  const [isOpenCartDrawer, setIsOpenCartDrawer] = useState(false);
  const [isOpenNavDrawer, setIsOpenNavDrawer] = useState(false);

  const { pathname } = useLocation();

  const handleOpenNavDrawer = () => {
    setIsOpenNavDrawer(true);
  };

  const handleCloseNavDrawer = () => {
    setIsOpenNavDrawer(false);
  };

  const handleOpenCartDrawer = () => {
    setIsOpenCartDrawer(true);
  };

  const handleCloseCartDrawer = () => {
    setIsOpenCartDrawer(false);
  };

  useEffect(() => {
    if (containerRef.current) {
      const computedStyle = getComputedStyle(containerRef.current);
      setPadding({
        top: computedStyle.paddingTop,
        right: computedStyle.paddingRight,
        bottom: computedStyle.paddingBottom,
        left: computedStyle.paddingLeft,
      });
    }
  }, []);

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

  const renderTitleCartDrawer = () => {
    return (
      <div>
        <div className="flex items-center justify-between w-full mt-5">
          <h4 className="text-dark text-2xl font-semibold">
            {t("cart.title")}
          </h4>
          <IconButton
            iconName="close"
            textColor="dark"
            onClick={handleCloseCartDrawer}
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
            onClick={handleCloseNavDrawer}
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

  const renderContentNavBarDrawer = () => {
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
        <div className="flex gap-3 mt-3">
          <IconButton
            className="sm:hidden"
            iconName="vietnamFlag"
            iconWidth="40px"
            iconHeight="30px"
            onClick={() => handleLanguageChange("vi")}
          />
          <IconButton
            className="sm:hidden"
            iconName="chinaFlag"
            iconWidth="40px"
            iconHeight="30px"
            onClick={() => handleLanguageChange("zh")}
          />
          <IconButton
            className="sm:hidden"
            iconName="japanFlag"
            iconWidth="40px"
            iconHeight="30px"
            onClick={() => handleLanguageChange("jp")}
          />
          <IconButton
            className="sm:hidden"
            iconName="englandFlag"
            iconWidth="40px"
            iconHeight="30px"
            onClick={() => handleLanguageChange("en")}
          />
        </div>
      </div>
    );
  };

  return (
    <header
      className={clsx(`w-full h-[110px]`, newBgColor, newTextColor, className)}
    >
      <div ref={containerRef} className="container relative h-full text-base">
        {/* Navigation Menu */}
        <nav
          className="absolute top-1/2 -translate-y-1/2 space-x-4 text-base font-semibold xl:flex hidden"
          style={{
            left: padding.left,
          }}
        >
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

        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 xl:hidden"
          style={{
            left: padding.left,
          }}
        >
          <IconButton
            iconName="menu"
            textColor="white"
            textHoverColor="yellow"
            onClick={() => {
              setIsOpenNavDrawer(true);
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

        <div
          className="flex absolute right-0 top-1/2 -translate-y-1/2 space-x-3"
          style={{
            right: padding.right,
          }}
        >
          {/* Contact Number */}
          <Button
            href="tel:0966859061"
            className=" hover:text-yellow font-sourceSansPro font-semibold text-xl xl:flex hidden"
            textColor="white"
            startIcon={<Icon name="phone" size="1.5em" />}
          >
            {t("shopInfo.phoneNumber")}
          </Button>

          {/* Search Button */}
          <IconButton
            className="sm:block hidden"
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
            onClick={handleOpenCartDrawer}
          />

          {/* Language Options */}
          <div className="flex gap-2">
            <IconButton
              className="sm:block hidden"
              iconName="vietnamFlag"
              iconWidth="30px"
              iconHeight="25px"
              onClick={() => handleLanguageChange("vi")}
            />
            <IconButton
              className="sm:block hidden"
              iconName="chinaFlag"
              iconWidth="30px"
              iconHeight="25px"
              onClick={() => handleLanguageChange("zh")}
            />
            <IconButton
              className="sm:block hidden"
              iconName="japanFlag"
              iconWidth="30px"
              iconHeight="25px"
              onClick={() => handleLanguageChange("jp")}
            />
            <IconButton
              className="sm:block hidden"
              iconName="englandFlag"
              iconWidth="30px"
              iconHeight="25px"
              onClick={() => handleLanguageChange("en")}
            />
          </div>
        </div>
      </div>

      <DrawerMenu
        renderTitle={renderTitleCartDrawer}
        renderContent={renderContentDrawer}
        handleClose={handleCloseCartDrawer}
        handleOpen={handleOpenCartDrawer}
        handleOverlayClick={handleCloseCartDrawer}
        isOpen={isOpenCartDrawer}
        position={isLargerThanSm ? "right" : "bottom"}
        width={isLargerThanSm ? "350px" : "100%"}
        borderColor="transparent"
        bgColor="white"
      />

      <DrawerMenu
        renderTitle={renderTitleNavDrawer}
        renderContent={renderContentNavBarDrawer}
        handleOverlayClick={handleCloseNavDrawer}
        handleClose={handleCloseNavDrawer}
        handleOpen={handleOpenNavDrawer}
        isOpen={isOpenNavDrawer}
        position={isLargerThanSm ? "left" : "top"}
        width={isLargerThanSm ? "350px" : "100%"}
        borderColor="transparent"
        bgColor="emerald"
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
