import axios from 'axios';

const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
const KEY_API = process.env.REACT_APP_OPEN_WEATHER_KEY;

export const fetchWeather = async (query = false, lat, long) => {
    if (query) {
        var params = {q: query,appid: KEY_API,lang: 'pt',units: 'metric'}
    } else {
        var params = {lat: lat,lon: long,appid: KEY_API,lang: 'pt',units: 'metric'}
    }
    const {data} = await axios.get(BASE_URL,{params: params});
    console.log(data);
    return data;
}