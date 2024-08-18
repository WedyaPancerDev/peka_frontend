import axios from "axios";

import { getEnv } from "utils/helpers";
import { VITE_APP_BASE_URL_DEV, VITE_APP_BASE_URL_PROD } from "utils/env";

axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const env = getEnv();

const api = axios.create({
  baseURL: env === "dev" ? VITE_APP_BASE_URL_DEV : VITE_APP_BASE_URL_PROD,
});

export default api;
