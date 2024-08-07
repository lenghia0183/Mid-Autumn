import clsx from "clsx";
import { Form, Formik } from "formik";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import React, { useCallback } from "react";

const Dialog = ({
  title = "",
  maxWidth = "max-w-md",
  fullWidth = true,
  open,
  children,
  renderFooter,
  onCancel,
  cancelLabel = "",
  cancelProps = {},
  onSubmit,
  submitLabel = "",
  submitProps = {},
  disableBackdropClick = true,
  noBorderBottom = false,
  noBorderTop = false,
  formikProps,
  titleProps,
}) => {
  const handleBackdropClick = () => {
    if (!disableBackdropClick) {
      onCancel();
    }
  };

  const DialogWrapper = useCallback(
    ({ children }) =>
      !isEmpty(formikProps) ? (
        <Formik {...formikProps}>
          {() => (
            <Form className="flex flex-col overflow-y-auto">{children}</Form>
          )}
        </Formik>
      ) : (
        children
      ),
    [formikProps]
  );

  const DialogInner = () => (
    <>
      <div
        className={clsx("p-6", {
          "border-b-2 border-gray-200": !noBorderBottom,
          "border-t-2 border-gray-200": !noBorderTop,
        })}
      >
        {children}
      </div>
      {(cancelLabel || submitLabel || typeof renderFooter === "function") && (
        <div className="p-4 flex justify-end">
          {renderFooter ? (
            renderFooter()
          ) : (
            <>
              {cancelLabel && (
                <button
                  onClick={onCancel}
                  className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
                  {...cancelProps}
                >
                  {cancelLabel}
                </button>
              )}
              {submitLabel && (
                <button
                  type={formikProps ? "submit" : "button"}
                  onClick={formikProps ? undefined : onSubmit}
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                  {...submitProps}
                >
                  {submitLabel}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div
        className={clsx(
          "bg-white rounded-lg shadow-lg w-full",
          maxWidth,
          { "max-w-full": fullWidth },
          "max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <h2 className={clsx("text-lg font-semibold", titleProps)}>{title}</h2>
        </div>
        <DialogWrapper>
          <DialogInner />
        </DialogWrapper>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  title: PropTypes.string,
  maxWidth: PropTypes.string,
  fullWidth: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  cancelLabel: PropTypes.string,
  cancelProps: PropTypes.object,
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
  submitProps: PropTypes.object,
  disableBackdropClick: PropTypes.bool,
  children: PropTypes.node,
  renderFooter: PropTypes.func,
  noBorderBottom: PropTypes.bool,
  noBorderTop: PropTypes.bool,
  formikProps: PropTypes.object,
  titleProps: PropTypes.string,
};

export default Dialog;
