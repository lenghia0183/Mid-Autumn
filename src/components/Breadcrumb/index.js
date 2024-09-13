import React from "react";
import { Link } from "react-router-dom";
import images from "../../asset/images";
import { useTranslation } from "react-i18next";

const Breadcrumb = ({ items }) => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        backgroundImage: `url(${images?.slide2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
      className="flex items-center justify-center relative"
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.45)",
        }}
        className="h-full w-full relative inset-0 p-[100px]"
      >
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-[50px] font-medium text-white-100">
            {t(items?.[items?.length - 1]?.label)?.toUpperCase()}
          </h2>
          <nav className="flex items-center space-x-2 text-white-100 m-auto">
            {items?.map((item, index) => (
              <React.Fragment key={index}>
                {index < items?.length - 1 ? (
                  <Link
                    to={item?.to}
                    className="cursor-pointer hover:text-yellow text-xl font-medium"
                  >
                    {t(item?.label)}
                  </Link>
                ) : (
                  <span className="text-yellow text-xl font-medium">
                    {t(item?.label)}
                  </span>
                )}
                {index < items?.length - 1 && (
                  <span className="text-white-100">/</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
