import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { durationMap } from "../../config/durationConfig";
import useColorClasses from "./../../hooks/useColorClasses";

const DrawerMenu = ({
  isOpen = false,
  onClose,
  position = "left",
  width = "25%",
  height = "100%",
  renderContent,
  renderTitle = null,
  children,
  animationDuration = 3000,
  disableScroll = true,
  autoCloseTimeout = null,
  preventOverlayClick = false,
  overlayColor = "rgba(0, 0, 0, 0.5)",
  bgColor = "white",
  textColor,
  borderColor = "dark",
  className,
}) => {
  const [open, setOpen] = useState(isOpen);
  const timeoutRef = useRef(null);

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

  const handleToggle = () => {
    setOpen(!open);
    if (!open && onClose) onClose();
  };

  const handleOverlayClick = () => {
    if (!preventOverlayClick) {
      setOpen(false);
      if (onClose) onClose();
    }
  };

  const positionStyles = {
    top: {
      classes: "-translate-y-full",
      style: { top: "0", width: "100%", height },
    },
    right: {
      classes: "translate-x-full h-full",
      style: {
        right: "0",
        top: "0",
        height: "100%",
        borderLeft: "1px solid",
        width,
      },
    },
    bottom: {
      classes: "translate-y-full",
      style: { bottom: "0", width: "100%", height },
    },
    left: {
      classes: "-translate-x-full h-full border-r",
      style: {
        left: "0",
        top: "0",
        borderRight: "1px solid",
        height: "100%",
        width,
      },
    },
  };

  const colorClasses = useColorClasses({ bgColor, textColor, borderColor });

  const { classes: positionClasses, style: positionStyle } =
    positionStyles[position];

  const drawerClasses = clsx(
    `fixed transition-transform ${className} ${durationMap[animationDuration]} ${colorClasses}`,
    open ? "transform-none" : positionClasses
  );

  const drawerStyle = {
    ...positionStyle,
    zIndex: 1000,
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-10"
          onClick={handleOverlayClick}
          style={{ backgroundColor: overlayColor }}
        />
      )}
      <div className={drawerClasses} style={drawerStyle}>
        {renderTitle && <div className="p-4">{renderTitle()}</div>}
        <div>{renderContent()}</div>
      </div>
      <div className="drawer-trigger" onClick={handleToggle}>
        {children}
      </div>
    </>
  );
};

DrawerMenu.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  position: PropTypes.oneOf(["left", "right", "top", "bottom"]),
  overlay: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  renderContent: PropTypes.func.isRequired,
  renderTitle: PropTypes.func,
  children: PropTypes.node.isRequired,
  disableScroll: PropTypes.bool,
  renderCloseButton: PropTypes.func,
  autoCloseTimeout: PropTypes.number,
  preventOverlayClick: PropTypes.bool,
  overlayColor: PropTypes.string,
  drawerColor: PropTypes.string,
  drawerBorderColor: PropTypes.string,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  borderColor: PropTypes.string,
};

export default DrawerMenu;
