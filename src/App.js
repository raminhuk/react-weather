import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  const BASE_API = "http://api.openweathermap.org/data/2.5/weather";

  let getWeather = async (lat, long) => {
    let res = await axios.get(BASE_API, {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
    console.log(res.data);
  }

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    })
  }, [])

  if (location == false){
    return (
      <Fragment>
        {/* Você precisa habilitar a localização no browser o/ */}
      </Fragment>
    )

  } else if (weather == false){
    return(
      <Fragment>
        <span className="center"><svg width="70" height="50" version="1.1" id="L4" x="0px" y="0px" viewBox="0 0 100 100">
        <circle fill="#000" stroke="none" cx="6" cy="50" r="6">
          <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1"></animate>    
        </circle>
        <circle fill="#000" stroke="none" cx="26" cy="50" r="6">
          <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2"></animate>       
        </circle>
        <circle fill="#000" stroke="none" cx="46" cy="50" r="6">
          <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3"></animate>     
        </circle>
      </svg></span>
        
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div className="center">
          <h1>Clima nas suas coordenadas - {weather['name']}</h1>
          <h2>({weather['weather'][0]['description']})</h2>
          <ul>
            <li>Temperatura atual: <span>{weather['main']['temp']}°</span></li>
            <li>Temperatura máxima: <span>{weather['main']['temp_max']}°</span></li>
            <li>Temperatura minima: <span>{weather['main']['temp_min']}°</span></li>
            <li>Pressão: <span>{weather['main']['pressure']} hpa</span></li>
            <li>Unidade: <span>{weather['main']['humidity']}%</span></li>
          </ul>  
        </div>
      </Fragment>
    );
  }
}

export default App;
