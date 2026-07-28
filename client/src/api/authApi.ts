import axios from "axios";

import {
  API_BASE_URL,
} from "../config/api";

const AUTH_API_URL =
  `${API_BASE_URL}/auth`;

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await axios.post(
    `${AUTH_API_URL}/register`,
    {
      name,
      email,
      password,
    }
  );

  return response.data;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await axios.post(
    `${AUTH_API_URL}/login`,
    {
      email,
      password,
    }
  );

  return response.data;
};