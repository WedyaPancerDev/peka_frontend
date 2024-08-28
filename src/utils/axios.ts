import axios, { AxiosInstance } from "axios";
import nookies from "nookies";

import { getEnv } from "./helpers";
import { exceptionResponse } from "./exception";
import { VITE_APP_BASE_URL_DEV, VITE_APP_BASE_URL_PROD } from "./env";

axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const handleUseInterceptors = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (err) => {
      exceptionResponse(err);

      throw err;
    }
  );
};

const env = getEnv();
const getCurrentCookie = (): string | null => {
  const key = "@access-point";
  const currentToken = nookies.get();

  return currentToken[key] || null;
};

const currentToken = getCurrentCookie();

const api = axios.create({
  baseURL: env === "dev" ? VITE_APP_BASE_URL_DEV : VITE_APP_BASE_URL_PROD,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

handleUseInterceptors(api);

api.defaults.headers.common.Authorization = `Bearer ${currentToken}`;
export const setTokenBearer = (token: string): void => {
  api.defaults.headers.common.Authorization = `Bearer ${currentToken || token}`;
};

export default api;
