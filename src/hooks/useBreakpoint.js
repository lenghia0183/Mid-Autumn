import { useState, useEffect, useMemo } from "react";

// Hook để kiểm tra kích thước màn hình với breakpoints của Tailwind
const useBreakpoint = (breakpoint = "sm") => {
  const breakpoints = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  };

  const [isLargerThanBreakpoint, setIsLargerThanBreakpoint] = useState(false);

  // Sử dụng useMemo để chỉ tạo mediaQuery khi breakpoint thay đổi
  const mediaQuery = useMemo(() => {
    return window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`);
  }, [breakpoint]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargerThanBreakpoint(mediaQuery.matches);
    };

    // Kiểm tra ngay khi component được mount
    handleResize();

    // Lắng nghe thay đổi kích thước màn hình
    mediaQuery.addEventListener("change", handleResize);

    // Cleanup khi component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [mediaQuery]); // Dependency là mediaQuery

  return isLargerThanBreakpoint;
};

export default useBreakpoint;
