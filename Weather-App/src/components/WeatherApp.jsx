import React, { useState } from 'react';
import WeatherInfo from './WeatherInfo';



const WeatherApp = () => {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  let cities = []
  const citiesFromLocalStorage = JSON.parse( localStorage.getItem("cities") )

if (citiesFromLocalStorage) {
  cities = citiesFromLocalStorage
};

  const apiKey = 'b81396097959448ca09125916231708';
  const baseUrl = 'https://api.weatherapi.com/v1/forecast.json';

  function dele(){

  if (cities[0] && !cityName) {

    const apiUrl = `${baseUrl}?key=${apiKey}&q=${cities[0]}&aqi=no`;

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
      return (<button type='button' className='btn btn-danger' onClick={del}>&times;</button>)
  }
}
dele()

  const fetchWeatherData = () => {
    if(cityName){
    cities.push(cityName)
    localStorage.setItem("cities", JSON.stringify(cities))

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

function del(){
  localStorage.clear()
  location.reload();
};

  return (
    <>
    <div className='sbar'>
      <input
        type="text"
        value={cityName}
        onChange={e => setCityName(e.target.value)}
        placeholder="Enter city name"
      />
      <button className='btn btn-primary' onClick={fetchWeatherData}>Add</button>
    </div>
    <div className='del-div'>{dele()}</div>
    <div className='cont'>
      <WeatherInfo weatherData={weatherData} />
      {error && <div>{error}</div>}
    </div>
    </>
  );
};

export default WeatherApp;
