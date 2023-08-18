const WeatherInfo = ({ weatherData }) => {
  if (!weatherData) {
    return <div className="m-5 text-center">No data available</div>;
  }

  const { location, current, forecast} = weatherData;
  const { name, country } = location;
  const { temp_c, condition, feelslike_c, wind_kph, cloud, last_updated, uv, vis_km, is_day} = current;
  const {forecastday} = forecast;

  function isDay(){
    if (is_day){
        return "Day"
    }
    else{
      return "Night"
    }
    }

  return (
    <>
      <div className="tcont">
        <div className="city text-center">{name}</div>
        <div className="country text-center">{country}</div>
        <div className="d-flex temp">
        <div><div className="temprature">{temp_c}°C</div>
        <div className="temp-line">{condition.text}</div>
        <div className="rain">{cloud}% chance of rain</div></div>
        <img src={condition.icon} alt=' ' className="icn"/>
        </div>
      </div>
      <div className="scont">
      <div className="text-right">Last Updated: <span className="font-weight-heavy">{lastU(last_updated)}</span></div>

        <div className="d-flex small">
        <div className="b"><div className="shead">Feels like</div><div className="sval">{feelslike_c}°C</div></div>
        <div className="b"><div className="shead">Wind Speed</div><div className="sval">{wind_kph} kph</div></div>
        </div>

        <div className="d-flex small">
        <div className="b"><div className="shead">Chance of rain</div><div className="sval">{cloud} %</div></div>
        <div className="b"><div className="shead">UV Index</div><div className="sval">{uv}</div></div>
        </div>

        <div className="d-flex small">
        <div className="b"><div className="shead">Humidity</div><div className="sval">{forecastday[0].day.avghumidity} %</div></div>
        <div className="b"><div className="shead">Visibilty</div><div className="sval">{vis_km} km</div></div>
        </div>

        <div className="d-flex small">
        <div className="b"><div className="shead">Sunrise</div><div className="sval">{forecastday[0].astro.sunrise}</div></div>
        <div className="b"><div className="shead">Sunset</div><div className="sval">{forecastday[0].astro.sunset}</div></div>
        </div>

      {/* <div>Time of the Day</div><div>{isDay()}</div> */}
      </div>
    {/* <pre>{JSON.stringify(weatherData, null, 2)}</pre> */}
    </>
  );
};



function lastU(last_updated){
  let last=[]
  for(let i=11;i<16;i++){
   last[i]= last_updated[i]
  }
  return last
}

export default WeatherInfo;
