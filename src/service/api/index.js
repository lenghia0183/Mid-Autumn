import axios from "axios";
import { validateStatus } from "../../utils/api";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { CONFIG_COOKIES } from "../../constants";
import { getLocalStorageItem } from "../../utils/localStorage";

const cookies = new Cookies();
const BASE_URL = process.env.REACT_APP_BASE_URL + "/api/";

const BASE_URL_GHN = process.env.REACT_APP_BASE_URL_GHN;
const TOKEN_GHN = process.env.REACT_APP_GHN_API_KEY;
const SHOP_ID_GHN = process.env.REACT_APP_GHN_SHOP_ID;

const HEADERS_MULTIPLE_PART = {
  "Content-Type": "multipart/form-data; boundary=something",
};

const REFRESH_TOKEN_URL = "/auth/token/refresh";

export const createInstance = (baseURL, customHeaders = {}) => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      contentType: "application/json",
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      ...customHeaders,
    },
  });

  // Add a request interceptor
  instance.interceptors.request.use(
    (config) => {
      const token = getLocalStorageItem("token"); // Lấy token từ localStorage

      if (config.url !== REFRESH_TOKEN_URL && token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      toast.error(error);
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      if (validateStatus(response?.status)) {
        if (response?.config?.getHeaders) {
          return { data: response?.data, header: response?.headers }; // Trả về cả data và headers nếu được yêu cầu
        }
        return response.data; // Trả về dữ liệu nếu thành công
      } else if (response.status === 500) {
        toast.error("Đã xảy ra lỗi không xác định, vui lòng thử lại sau.");
      } else {
        toast.info("Bạn không có quyền truy cập.");
      }
    },
    (error) => {
      const response = error.response;
      if (
        response?.status === 403 &&
        response.config &&
        !response.config._isRefreshBefore &&
        response.config.url !== REFRESH_TOKEN_URL &&
        localStorage.getItem("refreshToken")
      ) {
        return refreshAccessToken()
          .then((refresh) => {
            if (refresh.statusCode === 200) {
              axios.defaults.headers.common["Authorization"] =
                refresh.data.accessToken.token;
              // Lưu vào cookies
              cookies.set(
                "token",
                refresh.data.accessToken.token,
                CONFIG_COOKIES
              );
              cookies.set(
                "refreshToken",
                refresh.data.refreshToken.token,
                CONFIG_COOKIES
              );

              // Lưu vào localStorage
              localStorage.setItem("token", refresh.data.accessToken.token);
              localStorage.setItem(
                "refreshToken",
                refresh.data.refreshToken.token
              );
              response.config._isRefreshBefore = true;
              return instance(response.config);
            } else {
              startLogout(); // Đăng xuất nếu refresh token không hợp lệ
            }
          })
          .catch(() => {
            startLogout(); // Đăng xuất nếu có lỗi xảy ra trong quá trình refresh token
          });
      } else if (
        response?.status === 401 &&
        response.config.baseURL !== BASE_URL_GHN
      ) {
        startLogout(); // Đăng xuất nếu không được ủy quyền
      } else {
        // toast.error(response?.data?.message || error?.message);
        return Promise.reject(error);
      }
    }
  );

  return instance;
};

const startLogout = () => {
  // Xóa token khỏi localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  // Xóa token khỏi cookies
  cookies.remove("token");
  cookies.remove("refreshToken");
  cookies.remove("user");

  // Hiển thị thông báo đăng xuất (tùy chọn)
  toast.info("Bạn đã đăng xuất thành công.");

  // Chuyển hướng đến trang đăng nhập (nếu cần thiết)
  // Ví dụ: sử dụng react-router-dom
  // history.push('/login');
};

export const createApi = (instance) => ({
  instance,

  post: (endpoint, params) => {
    return instance
      .post(endpoint, params)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err?.response?.data || err;
      });
  },

  postMultiplePart: (endpoint, params) => {
    return instance
      .post(endpoint, params, {
        headers: HEADERS_MULTIPLE_PART,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err?.response?.data || err;
      });
  },

  get: (endpoint, params = {}, options = {}) => {
    return instance
      .get(endpoint, { ...options, params })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err?.response?.data || err;
      });
  },

  put: (endpoint, params) => {
    return instance
      .put(endpoint, params)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err?.response?.data || err;
      });
  },

  patch: (endpoint, params) => {
    return instance
      .patch(endpoint, params)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err?.response?.data || err;
      });
  },

  delete: (endpoint, params) => {
    return instance
      .delete(endpoint, {
        data: params,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err?.response?.data || err;
      });
  },
});

export const refreshAccessToken = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return instance.get(REFRESH_TOKEN_URL, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      "x-auth-token": `Bearer ${refreshToken}`,
    },
  });
};

const instance = createInstance(BASE_URL);

const instanceGhn = createInstance(BASE_URL_GHN, {
  Token: TOKEN_GHN,
  ShopId: SHOP_ID_GHN,
});

const api = createApi(instance);
const ghnApi = createApi(instanceGhn);

export { api, ghnApi };
