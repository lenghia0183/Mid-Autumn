import { useMemo } from "react";

const useParseDimension = (dimensionString) => {
  return useMemo(() => {
    const value = parseFloat(dimensionString);
    const unit = dimensionString.replace(value, "").trim() || "rem"; // Mặc định là rem nếu không có đơn vị

    return { value, unit };
  }, [dimensionString]);
};

export default useParseDimension;
