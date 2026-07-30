import axios from "axios";

import {
  API_BASE_URL,
} from "../config/api";

const ADMIN_API =
  axios.create({
    baseURL:
      `${API_BASE_URL}/admin`,
  });

ADMIN_API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

export const getAdminDashboard =
  () => {
    return ADMIN_API.get(
      "/dashboard"
    );
  };