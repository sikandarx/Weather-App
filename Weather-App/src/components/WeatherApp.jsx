import React, { useState } from 'react';
import WeatherInfo from './WeatherInfo';

const WeatherApp = () => {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'b81396097959448ca09125916231708';
  const baseUrl = 'https://api.weatherapi.com/v1/forecast.json';

  const fetchWeatherData = () => {
    if (cityName) {
      const apiUrl = `${baseUrl}?key=${apiKey}&q=${cityName}&aqi=no`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          setWeatherData(data);
          setError(null);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setWeatherData(null);
          setError('An error occurred. Please try again later.');
        });
      
    }
  };
  return (
    <>
    <div className='cont'>
      <div className='sbar'>
      <input
        type="text"
        value={cityName}
        onChange={e => setCityName(e.target.value)}
        placeholder="Enter city name"
      />
      <button className='btn btn-primary' onClick={fetchWeatherData}>Add</button>
      </div>
      <WeatherInfo weatherData={weatherData} />
      {error && <div>{error}</div>}
    </div>
    </>
  );
};

export default WeatherApp;
