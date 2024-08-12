import React, { useState } from "react";
import clsx from "clsx";

const Image = ({
  src = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
  alt,
  width,
  height,
  className,
  onErrorSrc = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
  loading = "lazy",
  style,
  onLoad,
  onClick,
  onMouseEnter,
  onMouseLeave,
  rounded = false,
  shadow = false,
  fadeIn = true,
  transitionDuration = "0.5s",
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      alt={alt}
      width={width}
      height={height}
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
        width: width,
        height: height,
      }}
      {...props}
    />
  );
};

export default Image;
