import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { PAGE_TITLE, PATH } from "../../constants/path";
import { useLocation } from "react-router-dom";
import styles from "./AuthLayout.module.scss";
import clsx from "clsx";
import { Outlet } from "react-router-dom";
import Comment from "../../pages/Home/Comment";
import images from "../../asset/images";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function AuthLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const breadcrumbData = {
    [PATH.LOGIN]: [
      { label: PAGE_TITLE.HOME, to: PATH.HOME },
      { label: PAGE_TITLE.LOGIN, to: PATH.LOGIN },
    ],
    [PATH.SIGN_UP]: [
      { label: PAGE_TITLE.HOME, to: PATH.HOME },
      { label: PAGE_TITLE.SIGN_UP, to: PATH.SIGN_UP },
    ],
  };

  const breadcrumbAuthLayout = breadcrumbData[currentPath] || [];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbAuthLayout} />

      <div className="container flex items-center mt-14 space-x-7">
        <div
          className={clsx("flex-1 aspect-[5/4]", styles["flip-box-container"])}
        >
          <div className={styles["flip-box-inner"]}>
            <div
              className={clsx("relative", styles["flip-box-front"])}
              style={{
                backgroundImage: `url(${images.homeReason})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className={styles["flip-box-back"]}
              style={{
                backgroundImage: `url(${images.home1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>

      <Comment />
      <Footer />
    </>
  );
}

export default AuthLayout;