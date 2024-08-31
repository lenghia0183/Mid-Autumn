import React, { forwardRef, useState } from "react";
import clsx from "clsx";
import images from "../../asset/images";
import useResponsiveStyle from "./../../hooks/useResponsiveStyle";

const Image = (
  {
    src = images?.fallBack,
    alt,
    width = "100%",
    height = "100%",
    className,
    onErrorSrc = images?.fallBack,
    loading = "lazy",
    style,
    onLoad,
    onClick,
    onMouseEnter,
    onMouseLeave,
    rounded = false,
    shadow = false,
    fadeIn = true,
    transitionDuration = 300,
    ...props
  },
  ref
) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const widthStyle = useResponsiveStyle(width, "w");
  const heightStyle = useResponsiveStyle(height, "h");

  const handleError = () => {
    if (!hasError) {
      setImgSrc(onErrorSrc);
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = (e) => {
    setIsLoading(false);
    if (onLoad) {
      onLoad(e);
    }
  };

  return (
    <img
      src={imgSrc}
      ref={ref}
      alt={alt}
      loading={loading}
      onError={handleError}
      onLoad={handleLoad}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clsx("object-cover", className, {
        "rounded-lg": rounded,
        "shadow-lg": shadow,
        "opacity-0": fadeIn && isLoading,
        "opacity-100 transition-opacity": fadeIn && !isLoading,
        [`transition-opacity duration-${transitionDuration} ease-in-out`]:
          fadeIn,
      })}
      style={{
        ...style,
        ...widthStyle,
        ...heightStyle,
      }}
      {...props}
    />
  );
};

export default forwardRef(Image);
