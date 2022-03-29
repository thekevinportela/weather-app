import axios from 'axios';
import { WEATHER_API_KEY } from './constants';

const getWeather = (city: string, state: string) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},US-${state}&appid=${WEATHER_API_KEY}&units=imperial`
  );
};

export default {
  getWeather,
};
