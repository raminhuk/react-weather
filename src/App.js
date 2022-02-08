import React, { Fragment, useState, useEffect } from 'react';
import { fetchWeather } from './api/fetchWeather';


function App() {
    const [location, setLocation] = useState(false);
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition((position)=> {
        const { latitude, longitude } = position.coords;
        const searchGeo = async (e) => {
            const data = await fetchWeather(false, latitude, longitude);
            setWeather(data);
            setLocation(true);
        }
        searchGeo();
        });

    }, [])

    const search = async (e) => {
        if(e.key === 'Enter') {
            const data = await fetchWeather(query);
            setWeather(data);
            setQuery('');
        }
    }


  return (
    <Fragment>
        <div className="box">
            <div className="container">
            <span className="form-search">
                <input type="text"className="search" placeholder="Buscar" value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search}/>
            </span>
            
                {weather.main && (
                    <div className="box-city">
                        <h2 className="city-name">
                            <span>{weather.name}</span>
                            <sup>{weather.sys.country}</sup>
                        </h2>
                        <div className="city-temp">
                            {Math.round(weather.main.temp)}
                            <sup>&deg;C</sup>
                        </div>
                        <div className="info">
                            <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                            <p>{weather.weather[0].description}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </Fragment>
  );
}

export default App;
