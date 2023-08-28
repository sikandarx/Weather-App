const WeatherInfo = ({ weatherData }) => {
  if (!weatherData) {
    return <div className="m-5 text-center">Add cities to view their wheater.</div>;
  }

  const { location, current, forecast} = weatherData;
  const { name, country } = location;
  const { temp_c, condition, feelslike_c, wind_kph, cloud, last_updated, uv, vis_km, is_day, humidity} = current;
  const {forecastday} = forecast;

    function hours(time){
      let hr = []
      for(let i=time+1;i<24;i++){
        hr[i] = (
      <div className="hour">
        {i>10 ? <div className="sval">{i}:00</div> : <div className="sval">0{i}:00</div>}
      <img src={forecastday[0].hour[i].condition.icon} alt=' ' className="simg" />
      <div className="h-temp">{forecastday[0].hour[i].temp_c} °C</div>
      <div className="shead">{forecastday[0].hour[i].condition.text}</div>
      </div>
        )
      }
      return hr
    }

    function fhours(d){
      let hr = []
      for(let i=0;i<24;i++){
        hr[i] = (
      <div className="hour">
        {i>10 ? <div className="sval">{i}:00</div> : <div className="sval">0{i}:00</div>}
      <img src={forecastday[d].hour[i].condition.icon} alt=' ' className="simg" />
      <div className="h-temp">{forecastday[d].hour[i].temp_c} °C</div>
      <div className="shead">{forecastday[d].hour[i].condition.text}</div>
      </div>
        )
      }
      return hr
    }

  return (
    <>
    <div className="modal" id="myModal">
      <div className="modal-content">
            <span className="close">&times;</span>
            <div className="hour1" id="h1">
            <h3>{dt(forecastday[1].date)}:</h3>
            <div className="d-flex h">{fhours(1)}</div>
            </div>
            <div className="hour2" id="h2">
            <h3>{dt(forecastday[2].date)}:</h3>
            <div className="d-flex h">{fhours(2)}</div>
            </div>
      </div>
    </div>
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


      <div className="d-flex h">
        {hours(min_hour(last_updated))}
      </div>

      <div className="d-flex h">
        <div className="day" onClick={() => perDay(1)}>
          <h3>{dt(forecastday[1].date)}</h3>
        <img src={forecastday[1].day.condition.icon} alt=' ' className="simg" />
        <div className="h-temp">{forecastday[1].day.avgtemp_c}°C</div>
        <div className="shead">{forecastday[1].day.condition.text}</div>
        </div>
        <div className="day" onClick={() => perDay(2)}>
          <h3>{dt(forecastday[2].date)}</h3>
        <img src={forecastday[2].day.condition.icon} alt=' ' className="simg" />
        <div className="h-temp">{forecastday[2].day.avgtemp_c}°C</div>
        <div className="shead">{forecastday[2].day.condition.text}</div>
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
        <div className="b"><div className="shead">Humidity</div><div className="sval">{humidity} %</div></div>
        <div className="b"><div className="shead">Visibilty</div><div className="sval">{vis_km} km</div></div>
        </div>

        <div className="d-flex small">
        <div className="b"><div className="shead">Sunrise</div><div className="sval">{forecastday[0].astro.sunrise}</div></div>
        <div className="b"><div className="shead">Sunset</div><div className="sval">{forecastday[0].astro.sunset}</div></div>
        </div>
        
      </div>
    <pre className="text-white">{JSON.stringify(weatherData, null, 2)}</pre>
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
function min_hour(last_updated){
  let last = []
  for(let i=11;i<=12;i++)
  {
    last[i] = last_updated[i]
  }
  const concatenatedString = last.join("");
const resultInteger = parseInt(concatenatedString)
return resultInteger
}
function dt(str){
  const dateStr = str;
  const dateObj = new Date(dateStr);
    const dayOfWeekNumeric = dateObj.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeekString = daysOfWeek[dayOfWeekNumeric];
  return dayOfWeekString
}
const perDay = (str) =>{
    
  const modal = document.getElementById("myModal")
  const h1 = document.getElementById("h1")
  const h2 = document.getElementById("h2")


  function openModal() {
      modal.style.display = "flex"
      if(str === 1)
      {
        h1.style.display = "block"
      }
      else if(str === 2)
      {
        h2.style.display = "block"
      }
  }

  function closeModal() {
      modal.style.display = "none"
      h1.style.display = "none"
      h2.style.display = "none"
  }

  window.onclick = function (event) {
      if (event.target === modal) {
          closeModal()
      }
  }
  document.querySelector(".close").addEventListener("click", closeModal)
  openModal()
  
  }

export default WeatherInfo;
