import axios from "axios";

import {
  API_BASE_URL,
} from "../config/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});

API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

export const getDashboardTrips = () => {
  return API.get("/trips");
};

export const getTripById = (
  id: string
) => {
  return API.get(
    `/trips/${id}`
  );
};

export const toggleFavoriteTrip = (
  id: string
) => {
  return API.patch(
    `/trips/${id}/favorite`
  );
};

export const deleteTrip = (
  id: string
) => {
  return API.delete(
    `/trips/${id}`
  );
};