import axios from "axios";

import {
  API_BASE_URL,
} from "../config/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// Attach authentication token
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

// Generate AI trip
export const generateAITrip = (
  data: {
    destination: string;
    budget: string;
    travelers: string;
  }
) => {
  return API.post(
    "/ai/generate",
    data
  );
};

// Save trip
export const createTrip = (
  data: {
    destination: string;
    budget: string;
    travelers: string;
    itinerary: string;
  }
) => {
  return API.post(
    "/trips/save",
    data
  );
};

// Get user trips
export const getTrips = () => {
  return API.get("/trips");
};

// Delete trip
export const deleteTrip = (
  id: string
) => {
  return API.delete(
    `/trips/${id}`
  );
};

export default API;