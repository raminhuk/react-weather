import React, { Fragment, useState, useEffect } from 'react';
import { fetchWeather } from './api/fetchWeather';



function App() {
    const [location, setLocation] = useState(false);
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation(true);
            const { latitude, longitude } = position.coords;
            const searchGeo = async (e) => {
                const data = await fetchWeather(false, latitude, longitude);
                setWeather(data);
            }
            searchGeo();
        });

    }, [])

    const search = async (e) => {
        if (e.key === 'Enter') {
            const data = await fetchWeather(query);
            setWeather(data);
            setQuery('');
        }
    }
 
    return (
        <Fragment>
            <a href="https://github.com/raminhuk/react-weather" className="icon-github" target="_blanck">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
            </a>
            <div className="box">
                <div className="container">
                    <span className="form-search">
                        <input type="text" className="search" placeholder="Digite uma cidade" value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search} />
                    </span>
                    {weather.cod == 404 && (
                        <p className="not">
                            Cidade ou localização não encontrado
                        </p>
                    )}
                    {(typeof weather.main != "undefined") ? (
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
                    ) : ('')}
                </div>
            </div>
        </Fragment>
    );
}

export default App;
