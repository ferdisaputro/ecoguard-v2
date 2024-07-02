import axios from "axios"

export const getWeatherData = async (q) => {
   const url = `http://api.weatherapi.com/v1/current.json?key=ee29834376484fea8ec92755242606&q=${q}&aqi=no`
   const response = await axios.get(url);
   return response.data;
}