import {
  Request,
  Response,
} from "express";

import {
  getWeather,
} from "../services/weatherService";

export const getWeatherByCity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cityParameter =
      req.params.city;

    const city = Array.isArray(
      cityParameter
    )
      ? cityParameter[0]
      : cityParameter;

    if (!city) {
      res.status(400).json({
        message:
          "City name is required",
      });

      return;
    }

    const weather =
      await getWeather(city);

    res.status(200).json(
      weather
    );
  } catch (error: any) {
    console.error(
      "WEATHER ERROR:",
      error.response?.data ||
        error.message
    );

    res.status(500).json({
      message:
        "Failed to fetch weather",
      error:
        error.response?.data ||
        error.message,
    });
  }
};