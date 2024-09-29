import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { durationMap } from "../../config/durationConfig";
import useColorClasses from "./../../hooks/useColorClasses";
import useResponsiveStyle from "../../hooks/useResponsiveStyle";

const DrawerMenu = ({
  isOpen = false,
  onClose,
  position = "left",
  width = "25%",
  height = "100%",
  renderContent,
  renderTitle = null,
  children,
  animationDuration = 1000,
  disableScroll = true,
  autoCloseTimeout = null,
  overlayColor = "rgba(0, 0, 0, 0.5)",
  bgColor = "white",
  textColor,
  borderColor = "yellow",
  handleOverlayClick,
  className,
}) => {
  const [open, setOpen] = useState(isOpen);
  const timeoutRef = useRef(null);

  const widthStyle = useResponsiveStyle(width, "w");
  const heightStyle = useResponsiveStyle(height, "h");

  useEffect(() => {
    if (disableScroll) {
      document.body.style.overflow = open ? "hidden" : "auto";
    }
  }, [open, disableScroll]);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (autoCloseTimeout) {
      if (open) {
        timeoutRef.current = setTimeout(() => {
          setOpen(false);
          if (onClose) onClose();
        }, autoCloseTimeout);
      } else {
        clearTimeout(timeoutRef.current);
      }
    }
    return () => clearTimeout(timeoutRef.current);
  }, [open, autoCloseTimeout, onClose]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        if (onClose) onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const positionStyles = {
    top: {
      classes: "-translate-y-full",
      style: { top: "0", width: "100%", ...heightStyle },
    },
    right: {
      classes: "translate-x-full h-full border",
      style: {
        right: "0",
        top: "0",
        height: "100%",
        borderRight: 0,
        borderTop: 0,
        borderBottom: 0,
        ...widthStyle,
      },
    },
    bottom: {
      classes: "translate-y-full",
      style: { bottom: "0", width: "100%", ...heightStyle },
    },
    left: {
      classes: "-translate-x-full h-full border-r",
      style: {
        left: "0",
        top: "0",
        borderLeft: 0,
        borderTop: 0,
        borderBottom: 0,
        height: "100%",
        ...widthStyle,
      },
    },
  };

  const { bgColor: newBgColor } = useColorClasses({ bgColor });
  const { textColor: newTextColor } = useColorClasses({ textColor });
  const { borderColor: newBorderColor } = useColorClasses({ borderColor });

  const { classes: positionClasses, style: positionStyle } =
    positionStyles[position];

  const drawerClasses = clsx(
    "fixed transition-transform overflow-auto",
    className,
    durationMap[animationDuration],
    newBgColor,
    newTextColor,
    newBorderColor,
    {
      "transform-none": open,
    },
    positionClasses
  );

  const drawerStyle = {
    ...positionStyle,
    zIndex: 1000,
  };

  const overlayClasses = clsx(
    "fixed inset-0 transition-opacity",
    durationMap[animationDuration],
    {
      "opacity-0 pointer-events-none": !open,
      "opacity-100 z-[1000]": open,
    }
  );

  return (
    <>
      {true && (
        <div
          className={overlayClasses}
          onClick={handleOverlayClick}
          style={{ backgroundColor: overlayColor }}
        />
      )}
      <div className={drawerClasses} style={drawerStyle}>
        {renderTitle && <div className="p-4">{renderTitle()}</div>}
        <div>{renderContent()}</div>
      </div>
      <>{children}</>
    </>
  );
};

export default DrawerMenu;
