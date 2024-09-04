import React from "react";
import clsx from "clsx";
import Image from "../../../components/Image";
import images from "../../../asset/images";
import styles from "./Reason.module.scss";
import { useTranslation } from "react-i18next";

function Reason() {
  const { t } = useTranslation();

  return (
    <div className="container flex gap-10 mt-14">
      <div
        className={clsx("flex-1 aspect-[5/4]", styles["flip-box-container"])}
      >
        <div className={styles["flip-box-inner"]}>
          <div className={styles["flip-box-front"]}>
            <Image src={images.homeReason} />
          </div>
          <div className={styles["flip-box-back"]}>
            <Image src={images.home1} />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-2xl text-emerald">{t("home.reason.title")}</h3>
        <h2 className="text-[42px] text-dark font-medium">
          {t("home.reason.whyChoiceUs")}
        </h2>
        <p className="mt-5 text-lg text-dark"> {t("home.reason.desc1")}</p>
        <p className="mt-5 text-lg text-dark"> {t("home.reason.desc2")}</p>
      </div>
    </div>
  );
}

export default Reason;
