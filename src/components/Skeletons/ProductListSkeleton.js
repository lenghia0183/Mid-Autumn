import clsx from "clsx";

import ProductCardSkeleton from "./ProductCartSkeleton";

export default function ProductListSkeleton({ count = 6, className = "" }) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2",
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
