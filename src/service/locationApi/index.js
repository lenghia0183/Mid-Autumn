import axios from "axios";

// Tạo instance axios
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_GHN,
  headers: {
    "Content-Type": "application/json",
    Token: process.env.REACT_APP_GHTK_API_KEY || "", // Lấy token từ biến môi trường
  },
});

// Hàm gọi API để lấy thông tin địa điểm
export const getProvinceData = async () => {
  const url = "province";

  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {}
};

export const getDistrictData = async (provinceId) => {
  const url = "district";

  try {
    const response = await api.get(url, {
      params: {
        province_id: provinceId,
      },
    });

    return response.data;
  } catch (error) {}
};

export const getWardData = async (districtID) => {
  const url = "ward";

  try {
    const response = await api.get(url, {
      params: {
        district_id: districtID,
      },
    });

    return response.data;
  } catch (error) {}
};
