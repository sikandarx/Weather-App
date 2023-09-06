import React, { useState, useEffect } from 'react';
import WeatherInfo from './WeatherInfo';
import logo from '../assets/android-chrome-512x512.png';



const WeatherApp = () => {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  function useEffect(){
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  let cities = []
  const citiesFromLocalStorage = JSON.parse( localStorage.getItem("cities") )

  
if (citiesFromLocalStorage) {
  cities = citiesFromLocalStorage
};

  const apiKey = '205603f624374e61880135126233108';
  const baseUrl = 'https://api.weatherapi.com/v1/forecast.json';

  function dele(){

    
  if (cities[0] && !cityName) {

    const apiUrl = `${baseUrl}?key=${apiKey}&q=${cities[0]}&days=3&aqi=no`;

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
      })
      .finally(() => {
        setLoading(false);
      });
      return (<button type='button' className='btn btn-danger' onClick={del}>&times;</button>)
  }
  else{
    useEffect()
  }
}
dele()

  const fetchWeatherData = () => {
    if(cityName){

      setLoading(true)

    cities.push(cityName)
    localStorage.setItem("cities", JSON.stringify(cities))

      const apiUrl = `${baseUrl}?key=${apiKey}&q=${cityName}&days=3&aqi=no`;
  
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
        })
        .finally(() => {
          setLoading(false);
        });
    
  
    }
  };

function del(){
  localStorage.clear()
  location.reload();
};


  return (
    <>
    <div className={citiesFromLocalStorage == null ? "sbar" : "ssbar"}>
      <input
        type="text"
        value={cityName}
        onChange={e => setCityName(e.target.value)}
        placeholder="Enter city name"
      />
      <button className='btn btn-primary' onClick={fetchWeatherData}>{citiesFromLocalStorage == null ? "add" : "Search"}</button>
    </div>
    <div className='del-div'>{dele()}</div>
    <div className='cont'>
        {loading ? (
          <div className='loading-overlay'>
            <img className='loading-spinner' src={logo} alt=' '/>
          </div>
        ) : (
          <>
            <WeatherInfo weatherData={weatherData} />
            {error && <div>{error}</div>}
          </>
        )}
      </div>
    </>
  );
};

export default WeatherApp;