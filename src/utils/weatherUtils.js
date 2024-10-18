// src/utils/weatherUtils.js
import axios from 'axios';

export const fetchWeatherData = async (cities, apiKey) => {
  const promises = cities.map(city =>
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}`)
  );
  const responses = await Promise.all(promises);
  return responses.map(response => response.data);
};

export const kelvinToCelsius = (kelvin) => {
  return kelvin - 273.15;
};

export const processWeatherData = (data) => {
  return data.reduce((acc, cityData) => {
    acc[cityData.name] = {
      main: cityData.weather[0].main,
      temp: kelvinToCelsius(cityData.main.temp),
      feels_like: kelvinToCelsius(cityData.main.feels_like),
      dt: cityData.dt
    };
    return acc;
  }, {});
};