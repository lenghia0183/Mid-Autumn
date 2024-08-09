import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const DrawerMenu = ({
  isOpen = false,
  onClose,
  position = "top",
  overlay = true,
  width = "30%",
  height = "100%",
  renderContent,
  children,
  animationDuration = 200,
  disableScroll = true,
  renderCloseButton = null,
  autoCloseTimeout = null,
  preventOverlayClick = false,
  overlayColor = "rgba(0, 0, 0, 0.5)",
  drawerColor = "bg-white",
  drawerBorderColor = "border-gray-300",
}) => {
  const [open, setOpen] = useState(isOpen);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (disableScroll) {
      document.body.style.overflow = open ? "hidden" : "auto";
    }
  }, [open, disableScroll]);

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
      style: { right: "0", top: "0", height: "100%", width },
    },
    bottom: {
      classes: "translate-y-full", 
      style: { bottom: "0", width: "100%", height },
    },
    left: {
      classes: "-translate-x-full h-full", 
      style: { left: "0", top: "0", height: "100%", width },
    },
  };

  const { classes: positionClasses, style: positionStyle } =
    positionStyles[position];

  const drawerClasses = `fixed transition-transform duration-${animationDuration} ${
    open ? "transform-none" : positionClasses
  } ${drawerColor} ${drawerBorderColor} shadow-lg`;

  const drawerStyle = {
    ...positionStyle,
    zIndex: 1000,
  };
  return (
    <>
      {overlay && open && (
        <div
          className="fixed inset-0 z-10"
          onClick={handleOverlayClick}
          style={{ backgroundColor: overlayColor }}
        />
      )}
      <div className={drawerClasses} style={drawerStyle}>
        {renderCloseButton && (
          <div
            className="absolute top-2 right-2 z-50 cursor-pointer"
            onClick={handleToggle}
          >
            {renderCloseButton()}
          </div>
        )}
        <div className="p-4 mt-5">{renderContent()}</div>
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
  children: PropTypes.node.isRequired,
  animationDuration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disableScroll: PropTypes.bool,
  renderCloseButton: PropTypes.func,
  autoCloseTimeout: PropTypes.number,
  preventOverlayClick: PropTypes.bool,
  overlayColor: PropTypes.string,
  drawerColor: PropTypes.string,
  drawerBorderColor: PropTypes.string,
  transitionEffect: PropTypes.oneOf(["slide", "fade"]),
};

export default DrawerMenu;
