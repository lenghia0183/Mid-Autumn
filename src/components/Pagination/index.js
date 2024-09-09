import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import Icon from "../Icon";

const Pagination = ({
  pageCount,
  pageRangeDisplayed = 2,
  marginPagesDisplayed = 1,
  onPageChange,
  forcePage = 0,
  previousLabel = "Previous",
  nextLabel = "Next",
  breakLabel = "...",
  className,
  buttonWidth = "2.5rem", // Default width (40px)
  buttonHeight = "2.5rem", // Default height (40px)
  buttonClassName, // Custom class for buttons
  labelClassName, // Custom class for labels
  previousComponent: PreviousComponent = () => (
    <Icon name="previousPage" size={1} strokeWidth={40} />
  ),
  nextComponent: NextComponent = () => (
    <Icon name="nextPage" size={1} strokeWidth={40} />
  ),
  firstLabel = "First",
  lastLabel = "Last",
  firstComponent: FirstComponent = () => (
    <Icon name="firstPage" size={1} strokeWidth={40} />
  ),
  lastComponent: LastComponent = () => (
    <Icon name="lastPage" size={1} strokeWidth={40} />
  ),
}) => {
  const [ulWidth, setUlWidth] = useState("auto");
  const ulRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (ulRef.current && buttonRef.current) {
      const calculateWidth = () => {
        const buttonCount = ulRef.current.children.length;
        const buttonWidthPx = parseFloat(
          getComputedStyle(buttonRef.current).width
        );
        const buttonGapPx = parseFloat(getComputedStyle(ulRef.current).gap);
        const width =
          buttonCount * buttonWidthPx + (buttonCount - 1) * buttonGapPx;
        setUlWidth(`${width}px`);
      };
      calculateWidth();
      window.addEventListener("resize", calculateWidth);
      return () => window.removeEventListener("resize", calculateWidth);
    }
  }, [pageCount, forcePage, buttonWidth, buttonHeight]);

  const handlePageClick = (selectedPage) => {
    if (selectedPage !== forcePage) {
      onPageChange({ selected: selectedPage });
    }
  };

  const handlePreviousClick = () => {
    if (forcePage > 0) {
      handlePageClick(forcePage - 1);
    }
  };

  const handleNextClick = () => {
    if (forcePage < pageCount - 1) {
      handlePageClick(forcePage + 1);
    }
  };

  const handleFirstClick = () => {
    if (forcePage !== 0) {
      handlePageClick(0);
    }
  };

  const handleLastClick = () => {
    if (forcePage !== pageCount - 1) {
      handlePageClick(pageCount - 1);
    }
  };

  const renderPages = () => {
    const pages = [];
    for (let i = 0; i < pageCount; i++) {
      const isActive = i === forcePage;
      const inRange =
        i >= Math.max(0, forcePage - pageRangeDisplayed) &&
        i <= Math.min(pageCount - 1, forcePage + pageRangeDisplayed);
      const isMargin =
        i < marginPagesDisplayed || i >= pageCount - marginPagesDisplayed;

      if (inRange || isMargin) {
        pages.push(
          <li
            key={i}
            style={{ width: buttonWidth, height: buttonHeight }}
            ref={i === forcePage ? buttonRef : null}
            className={clsx(
              "flex items-center justify-center flex-shrink-0 text-emerald font-semibold border cursor-pointer rounded-md border-emerald-50 hover:bg-emerald hover:text-white transition duration-300",
              buttonClassName,
              { "bg-emerald text-white": isActive }
            )}
            onClick={() => handlePageClick(i)}
          >
            <span className={labelClassName}>{i + 1}</span>
          </li>
        );
      } else if (
        i === Math.max(0, forcePage - pageRangeDisplayed) - 1 ||
        i === Math.min(pageCount - 1, forcePage + pageRangeDisplayed) + 1
      ) {
        pages.push(
          <li
            key={`break-${i}`}
            style={{ width: buttonWidth, height: buttonHeight }}
            className={clsx(
              "flex items-center justify-center text-emerald font-semibold",
              buttonClassName
            )}
          >
            <span className={labelClassName}>{breakLabel}</span>
          </li>
        );
      }
    }

    return pages;
  };

  return (
    <ul
      ref={ulRef}
      style={{ width: ulWidth }}
      className={clsx(
        "flex gap-2 items-center transition-all duration-300",
        className
      )}
    >
      <li
        style={{ width: buttonWidth, height: buttonHeight }}
        className={clsx(
          "flex items-center justify-center cursor-pointer flex-shrink-0 rounded-md border border-emerald-50 text-emerald hover:bg-emerald hover:text-white transition duration-300",
          buttonClassName,
          { "opacity-50 cursor-not-allowed": forcePage === 0 }
        )}
        onClick={handleFirstClick}
      >
        {FirstComponent ? (
          <FirstComponent />
        ) : (
          <span className={labelClassName}>{firstLabel}</span>
        )}
      </li>

      <li
        style={{ width: buttonWidth, height: buttonHeight }}
        className={clsx(
          "flex items-center justify-center cursor-pointer flex-shrink-0 rounded-md border border-emerald-50 text-emerald hover:bg-emerald hover:text-white transition duration-300",
          buttonClassName,
          { "opacity-50 cursor-not-allowed": forcePage === 0 }
        )}
        onClick={handlePreviousClick}
      >
        {PreviousComponent ? (
          <PreviousComponent />
        ) : (
          <span className={labelClassName}>{previousLabel}</span>
        )}
      </li>

      {renderPages()}

      <li
        style={{ width: buttonWidth, height: buttonHeight }}
        className={clsx(
          "flex items-center justify-center cursor-pointer flex-shrink-0 rounded-md border border-emerald-50 text-emerald hover:bg-emerald hover:text-white transition duration-300",
          buttonClassName,
          { "opacity-50 cursor-not-allowed": forcePage === pageCount - 1 }
        )}
        onClick={handleNextClick}
      >
        {NextComponent ? (
          <NextComponent />
        ) : (
          <span className={labelClassName}>{nextLabel}</span>
        )}
      </li>

      <li
        style={{ width: buttonWidth, height: buttonHeight }}
        className={clsx(
          "flex items-center justify-center cursor-pointer flex-shrink-0 rounded-md border border-emerald-50 text-emerald hover:bg-emerald hover:text-white transition duration-300",
          buttonClassName,
          { "opacity-50 cursor-not-allowed": forcePage === pageCount - 1 }
        )}
        onClick={handleLastClick}
      >
        {LastComponent ? (
          <LastComponent />
        ) : (
          <span className={labelClassName}>{lastLabel}</span>
        )}
      </li>
    </ul>
  );
};

export default Pagination;
