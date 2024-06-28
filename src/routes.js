import axios from "axios"

export const getWeatherData = async (q) => {
   const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${q}&aqi=no`
   const response = await axios.get(url);
   return response.data;
}