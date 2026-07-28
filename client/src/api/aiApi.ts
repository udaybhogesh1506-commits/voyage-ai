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

interface GenerateItineraryData {
  destination: string;
  budget: string;
  travelers: string;
}

interface GeneratePackingListData {
  destination: string;
  travelers: string;
  itinerary?: string;
}

interface GenerateHotelsData {
  destination: string;
  budget: string;
  travelers: string;
  itinerary?: string;
}

interface GenerateLocalGuideData {
  destination: string;
  budget: string;
  travelers: string;
  itinerary?: string;
}

interface GenerateBudgetEstimateData {
  destination: string;
  budget: string;
  travelers: string;
  itinerary?: string;
}

export const generateAIItinerary = (
  data: GenerateItineraryData
) => {
  return API.post(
    "/ai/generate",
    data
  );
};

export const generateAIPackingList = (
  data: GeneratePackingListData
) => {
  return API.post(
    "/ai/packing-list",
    data
  );
};

export const generateAIHotels = (
  data: GenerateHotelsData
) => {
  return API.post(
    "/ai/hotels",
    data
  );
};

export const generateAILocalGuide = (
  data: GenerateLocalGuideData
) => {
  return API.post(
    "/ai/local-guide",
    data
  );
};

export const generateAIBudgetEstimate = (
  data: GenerateBudgetEstimateData
) => {
  return API.post(
    "/ai/budget-estimate",
    data
  );
};