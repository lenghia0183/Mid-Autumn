import React, { createContext, useContext, useCallback, useMemo } from "react";
import {
  useAddProductToCart,
  useDeleteCartDetail,
  useUpdateCartDetail,
  useGetMyCart,
} from "../service/https/cart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { trigger: addProductToCart, isMutating: isAdding } =
    useAddProductToCart();
  const { trigger: deleteCartDetail, isMutating: isDeleting } =
    useDeleteCartDetail();
  const { trigger: updateCartDetail, isMutating: isUpdating } =
    useUpdateCartDetail();
  const {
    data: cartData,
    isLoading,
    isValidating: isValidatingGetMyCart,
    mutate: refreshCart,
  } = useGetMyCart();

  const loading = useMemo(
    () =>
      isLoading ||
      isAdding ||
      isDeleting ||
      isUpdating ||
      isValidatingGetMyCart,
    [isLoading, isAdding, isDeleting, isUpdating, isValidatingGetMyCart]
  );

  const refreshCartData = useCallback(() => {
    refreshCart();
  }, [refreshCart]);

  return (
    <CartContext.Provider
      value={{
        cartData,
        addProductToCart,
        deleteCartDetail,
        updateCartDetail,
        refreshCart: refreshCartData,
        loading,
        isValidatingGetMyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
