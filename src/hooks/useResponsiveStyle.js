import { useMemo, useEffect, useState } from "react";

// Ánh xạ các lớp Tailwind CSS tới giá trị CSS
const valueMapping = {
  0: "0px",
  full: "100%",
  "1/2": "50%",
  "1/3": "33.3333%",
  "1/4": "25%",
  "1/5": "20%",
  "1/6": "16.6667%",
  // Thêm các lớp khác nếu cần
};

const propertyMapping = {
  w: "width",
  h: "height",
  "min-w": "min-width",
  "min-h": "min-height",
  "max-w": "max-width",
  "max-h": "max-height",
};

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const parseStyleString = (styleString, windowWidth, failBackProperty) => {
  const style = {};
  const entries = styleString?.split(" ");

  const appliedStyles = {};

  const defaultStyles = {};

  entries?.forEach((entry) => {
    const [breakpoint, classValue] = entry?.split(":");

    if (breakpoint && classValue && breakpoints[breakpoint]) {
      const [property, value] = classValue?.split("-");

      if (breakpoints[breakpoint] <= windowWidth) {
        const cssProperty = propertyMapping[property];
        const cssValue = valueMapping[value] || value?.slice(1, -1);
        if (
          !appliedStyles[cssProperty] ||
          breakpoints[breakpoint] > appliedStyles[cssProperty]?.breakpoint
        ) {
          appliedStyles[cssProperty] = {
            value: cssValue,
            breakpoint: breakpoints[breakpoint],
          };
        }
      }
    } else if (!breakpoints[breakpoint]) {
      const [property, value] = entry?.split("-");

      if (property && value) {
        const cssProperty = propertyMapping[property];
        const cssValue = valueMapping[value] || value?.slice(1, -1);
        defaultStyles[cssProperty] = cssValue;
      } else {
        const cssProperty = propertyMapping[failBackProperty];
        const cssValue = entry;
        defaultStyles[cssProperty] = cssValue;
      }
    }
  });

  Object.keys(appliedStyles).forEach((cssProperty) => {
    style[cssProperty] = appliedStyles[cssProperty].value;
  });

  Object.keys(defaultStyles).forEach((cssProperty) => {
    if (!style[cssProperty]) {
      style[cssProperty] = defaultStyles[cssProperty];
    }
  });

  return style;
};

const useResponsiveStyle = (styleString, failBackProperty) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const style = useMemo(
    () => parseStyleString(styleString, windowWidth, failBackProperty),
    [styleString, windowWidth, failBackProperty]
  );

  return style;
};

export default useResponsiveStyle;
