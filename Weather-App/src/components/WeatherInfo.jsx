const WeatherInfo = ({ weatherData }) => {
  if (!weatherData) {
    return <div className="m-5 text-center">Add cities to view their wheater.</div>;
  }

  const { location, current, forecast} = weatherData;
  const { name, country } = location;
  const { temp_c, condition, feelslike_c, wind_kph, cloud, last_updated, uv, vis_km, humidity} = current;
  const {forecastday} = forecast;

    function hours(time){
      let hr = []
      for(let i=time+1;i<24;i++){
        hr[i] = (
      <div className="hour">
        {i>12 ? <div className="sval">{parseInt(i)-12} pm</div> : <div className="sval">{parseInt(i)} am</div>}
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
        {i==0 || i==12 ? <div className="sval">12 {i==0 ? "am" : "pm"}</div> : i>12 ? <div className="sval">{parseInt(i)-12} pm</div> : <div className="sval">{parseInt(i)} am</div>}
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
            <h3 className="ml4">{dt(forecastday[1].date)}:</h3>
            <div className="d-flex h">{fhours(1)}</div>
            </div>
            <div className="hour2" id="h2">
            <h3 className="ml4">{dt(forecastday[2].date)}:</h3>
            <div className="d-flex h">{fhours(2)}</div>
            </div>
      </div>
    </div>
      <div className="tcont">
        <div className="city text-center">{name}</div>
        <div className="country text-center">{country}</div>
        <div className="d-flex temp">
        <div className="d-flex">
          <div className="temprature">{temp_c}°C</div>
          <img src={condition.icon} alt=' ' className="icn"/>
        </div>
        <div className="d-flex main">
          <div className="sssval">{condition.text}</div>
          <div className="sshead">Feels like: {feelslike_c}°C</div>
        </div>
        </div>
      </div>


      <div className="d-flex h">
        {hours(min_hour(last_updated))}
      </div>

      <div className="d-flex h d">
        <div className="day" onClick={() => perDay(1)}>
          <h4>{dt(forecastday[1].date)}</h4>
        <img src={forecastday[1].day.condition.icon} alt=' ' className="simg" />
        <div className="h-temp">{forecastday[1].day.avgtemp_c}°C</div>
        <div className="shead">{forecastday[1].day.condition.text}</div>
        </div>
        <div className="day" onClick={() => perDay(2)}>
          <h4>{dt(forecastday[2].date)}</h4>
        <img src={forecastday[2].day.condition.icon} alt=' ' className="simg" />
        <div className="h-temp">{forecastday[2].day.avgtemp_c}°C</div>
        <div className="shead">{forecastday[2].day.condition.text}</div>
        </div>
      </div>


      <div className="scont">
      <div className="text-right">Last Updated: <span className="font-weight-heavy">{lastU(last_updated)}</span></div>

        <div className="d-flex small">
        <div className="b"><div className="shead">Feels like</div><div className="ssval">{feelslike_c}°C</div></div>
        <div className="b"><div className="shead">Wind Speed</div><div className="ssval">{wind_kph} kph</div></div>
        </div>

        <div className="d-flex small">
        <div className="b"><div className="shead">Chance of rain</div><div className="ssval">{cloud} %</div></div>
        <div className="b"><div className="shead">UV Index</div><div className="ssval">{uv}</div></div>
        </div>

        <div className="d-flex small">
        <div className="b"><div className="shead">Humidity</div><div className="ssval">{humidity} %</div></div>
        <div className="b"><div className="shead">Visibilty</div><div className="ssval">{vis_km} km</div></div>
        </div>

        <div className="d-flex small">
        <div className="b"><div className="shead">Sunrise</div><div className="ssval">{forecastday[0].astro.sunrise}</div></div>
        <div className="b"><div className="shead">Sunset</div><div className="ssval">{forecastday[0].astro.sunset}</div></div>
        </div>
        
      </div>
    {/* <pre className="text-white">{JSON.stringify(weatherData, null, 2)}</pre> */}
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