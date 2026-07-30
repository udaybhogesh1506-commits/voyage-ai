import axios from "axios";

import {
  API_BASE_URL,
} from "../config/api";

const USER_API =
  axios.create({
    baseURL:
      `${API_BASE_URL}/user`,
  });

USER_API.interceptors.request.use(
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

export const getUserProfile =
  () => {
    return USER_API.get(
      "/profile"
    );
  };

export const updateUserProfile =
  (name: string) => {
    return USER_API.patch(
      "/profile",
      {
        name,
      }
    );
  };