import axios from 'axios';

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const KEY_API = 'f90e6e025d0245525af016507d10d795';

export const fetchWeather = async (query = false, lat, long) => {
    if (query) {
        var params = { q: query, appid: KEY_API, lang: 'pt', units: 'metric' }
    } else {
        var params = { lat: lat, lon: long, appid: KEY_API, lang: 'pt', units: 'metric' }
    }
    const { data } = await axios.get(BASE_URL, 
        { params: params })
        .catch(function (error) {
        if (error.response) {
            return error.response
      }
    });
    return data;
}