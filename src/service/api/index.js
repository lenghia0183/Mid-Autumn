import axios from "axios";

const BASE_URL = process.env.REACT_APP_HOST + "/api/";
const REPORT_URL = process.env.REACT_APP_REPORT_HOST + "/api";

const HEADERS_MULTIPLE_PART = {
  "Content-Type": "multipart/form-data; boundary=something",
};

const REFRESH_TOKEN_URL = "/auth/token/refresh";

export const createInstance = (baseURL) => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      contentType: "application/json",
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  // Add a request interceptor
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      if (config.url !== REFRESH_TOKEN_URL && token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.data; // Trả về dữ liệu nếu thành công
      } else {
        return Promise.reject(response);
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export const createApi = (instance) => ({
  instance,

  post: (endpoint, params) => {
    return instance
      .post(endpoint, params)
      .catch((error) => Promise.reject(error));
  },

  postMultiplePart: (endpoint, params) => {
    return instance
      .post(endpoint, params, {
        headers: HEADERS_MULTIPLE_PART,
      })
      .catch((error) => Promise.reject(error));
  },

  get: (endpoint, params = {}, options = {}) => {
    return instance
      .get(endpoint, { ...options, params })
      .catch((error) => Promise.reject(error));
  },

  put: (endpoint, params) => {
    return instance
      .put(endpoint, params)
      .catch((error) => Promise.reject(error));
  },

  patch: (endpoint, params) => {
    return instance
      .patch(endpoint, params)
      .catch((error) => Promise.reject(error));
  },

  delete: (endpoint, params) => {
    return instance
      .delete(endpoint, {
        data: params,
      })
      .catch((error) => Promise.reject(error));
  },
});

const instance = createInstance(BASE_URL);
const reportInstance = createInstance(REPORT_URL);

const api = createApi(instance);
const reportApi = createApi(reportInstance);

export { api, reportApi };
