import React, { useState } from 'react';
import './WeatherApi.css'; // Importa el archivo de estilos

const api = {
    key: "d4e574babfdbcba1fc5f5cbedbb65a2a",
    base: "https://api.openweathermap.org/data/2.5/",
};

const WeatherApi = () => {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});

    // Search button is pressed. Make a fetch call to the Open Weather Map API.
    const searchPressed = () => {
        fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                setWeather(result);
            });
    };

    return (
        <div className="weather-card">
            <h1>CLIMA</h1>
            <div className='Mesage' >
             <p>Fijate el clima antes de salir!</p>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Ingrese una ciudad..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={searchPressed}>Buscar</button>
            </div>
            {typeof weather.main !== "undefined" ? (
                <div>
                    <p><strong>{weather.name}</strong></p>
                    <p>{weather.main.temp}°C</p>
                    <p>{weather.weather[0].main}</p>
                    <p>({weather.weather[0].description})</p>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default WeatherApi;

