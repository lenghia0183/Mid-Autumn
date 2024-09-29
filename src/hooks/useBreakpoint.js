import { useState, useEffect, useMemo } from "react";
import { breakpoints } from "../config/breakpointConfig";

// Hook để kiểm tra kích thước màn hình với breakpoints của Tailwind
const useBreakpoint = (breakpoint = "sm") => {
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
