import React from "react";
import Image from "../Image";
import images from "../../asset/images";
import { useTranslation } from "react-i18next";
import useColorClasses from "../../hooks/useColorClasses";
import clsx from "clsx";
import Icon from "../Icon";
import Button from "../Button";
import { PATH } from "../../constants/path";
import Divider from "../Devider";

const Footer = ({
  textColor = "white-100",
  bgColor = "dark-900",
  className,
}) => {
  const { t } = useTranslation();
  const { bgColor: newBgColor } = useColorClasses({ bgColor });
  const { textColor: newTextColor } = useColorClasses({ textColor });

  return (
    <footer
      className={clsx("w-full py-10", newBgColor, newTextColor, className)}
    >
      <div className="container mx-auto gap-x-10 flex items-start justify-between">
        {/* Column 1 */}
        <div className="mb-4 flex-1">
          {/* Logo */}
          <Button to={PATH.HOME} className="mb-4 hover:scale-110">
            <Image
              src={images.logo}
              width="w-[150px]"
              height="h-[150px]"
              alt="Shop Logo"
            />
          </Button>

          {/* shop Info */}
          <div className="flex flex-col gap-y-5">
            <div className="flex items-center gap-2">
              <Icon name="location" size="1.5em" color="yellow" />
              <p>{t("shopInfo.address")}</p>
            </div>

            <div className="flex items-center gap-2">
              <Icon name="phone" size="1.5em" color="yellow" />
              <p className="">{t("shopInfo.phoneNumber")}</p>
            </div>

            <div className="flex items-center gap-2">
              <Icon name="email" size="1.5em" color="yellow" />
              <p>{t("shopInfo.email")}</p>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex-1">
          <h3 className="text-2xl font-medium">{t("footer.itemList.title")}</h3>
          <Divider marginTop="10px" marginBottom="30px" color="dark-600" />
          <div className="flex flex-col gap-y-3 justify-start ">
            <Button
              to={PATH.HOME}
              size="zeroPadding"
              textColor="white"
              className="hover:text-yellow"
            >
              {t("footer.itemList.item1")}
            </Button>

            <Button
              to={PATH.HOME}
              size="zeroPadding"
              textColor="white"
              className="hover:text-yellow "
            >
              {t("footer.itemList.item2")}
            </Button>

            <Button
              to={PATH.HOME}
              size="zeroPadding"
              textColor="white"
              className="hover:text-yellow "
            >
              {t("footer.itemList.item3")}
            </Button>

            <Button
              to={PATH.HOME}
              size="zeroPadding"
              textColor="white"
              className="hover:text-yellow "
            >
              {t("footer.itemList.item4")}
            </Button>

            <Button
              to={PATH.HOME}
              size="zeroPadding"
              textColor="white"
              className="hover:text-yellow "
            >
              {t("footer.itemList.item5")}
            </Button>

            <Button
              to={PATH.HOME}
              size="zeroPadding"
              textColor="white"
              className="hover:text-yellow"
            >
              {t("footer.itemList.item6")}
            </Button>
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex-1">
          <h3 className="text-2xl font-medium">
            {t("footer.serviceList.title")}
          </h3>
          <Divider marginTop="10px" marginBottom="30px" color="dark-600" />
          <div className="flex flex-col gap-y-3 justify-start ">
            <Button
              to={PATH.HOME}
              size="zeroPadding"
              textColor="white"
              className="hover:text-yellow "
            >
              {t("footer.serviceList.service1")}
            </Button>

            <Button
              to={PATH.HOME}
              size="zeroPadding"
              textColor="white"
              className="hover:text-yellow "
            >
              {t("footer.serviceList.service2")}
            </Button>
          </div>
        </div>

        {/* Column 4 */}
        <div className="flex-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7456.6298516158995!2d105.88085536557655!3d20.859352998337474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135b1798a40dc27%3A0xf7c2339b14b010fc!2zTGnDqm4gUGjGsMahbmcsIFRoxrDhu51uZyBUw61uLCBIYW5vaSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1724488545942!5m2!1sen!2s"
            style={{ width: "100%", aspectRatio: "1/1" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="container mt-10">
        <Divider color="dark-600" />
      </div>

      <div className="container flex justify-center gap-x-20 mt-14">
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full">
            <Image src={images.truck} width="50px" height="50px" />
          </div>

          <div className="">
            <h4 className="text-2xl font-medium">
              {t("footer.freeShipTitle")}
            </h4>
            <p className="text-base">{t("footer.freeShipDesc")}</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center  w-[70px] h-[70px] rounded-full">
            <Image src={images.payment} width="50px" height="50px" />
          </div>

          <div className="">
            <h4 className="text-2xl font-medium">{t("footer.paymentTitle")}</h4>
            <p className="text-base">{t("footer.paymentDesc")}</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center  w-[70px] h-[70px] rounded-full">
            <Image src={images.refund} width="50px" height="50px" />
          </div>

          <div className="">
            <h4 className="text-2xl font-medium">{t("footer.refundTitle")}</h4>
            <p className="text-base">{t("footer.refundDesc")}</p>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="w-full text-center mt-10">
        <p className="text-white text-base">
          &copy; {new Date().getFullYear()} {t("footer.copyRight")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
