import axios from "axios";
import { WEATHER_API_KEY } from "./constants";

const getWeather = (city: string, state: string) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},US-${state}&appid=${WEATHER_API_KEY}&units=imperial`
  );
};

const getHourlyForecast = (lat, lon) => {
  return axios.get(
    `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
  );
};
const get3HourlyForecast = (lat, lon) => {
  console.log("lat", lat, lon);
  return axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
  );
};

export default {
  getWeather,
  getHourlyForecast,
  get3HourlyForecast,
};
