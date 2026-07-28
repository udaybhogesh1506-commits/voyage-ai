import axios from "axios";

const API_KEY = process.env.WEATHER_API_KEY;

export const getWeather = async (city: string) => {
  if (!API_KEY) {
    throw new Error("WEATHER_API_KEY is missing");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`;

  const response = await axios.get(url);

  const data = response.data;

  return {
    city: data.name,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
};