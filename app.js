const currTemp = document.getElementById("currTemp");
const tempHi = document.getElementById("tempHi");
const tempLo = document.getElementById("tempLo");
const conditions = document.getElementById("conditions");
const cityName = document.getElementById("cityName");
const currTime = document.getElementById("currTime");
const weatherIcon = document.getElementById("weatherIcon");

let weatherData;

async function getWeather(location) {
  try {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=6d2303fc6e291bdfc8c01fd07ded0995`
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        weatherData = response;
        displayWeather(response);
        console.log(response);
      });
  } catch (error) {
    console.error(error);
  }
}

function displayWeather(data) {
  data.main == undefined
    ? (cityName.innerText = "City Not Found")
    : (cityName.innerText = data.name);
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  currTemp.innerText = `Current Temperature: ${data.main.temp}°F`;
  tempHi.innerText = `High: ${data.main.temp_max}`;
  tempLo.innerText = `Low: ${data.main.temp_min}`;
  conditions.innerText = data.weather[0].main;
  currTime.innerText = getTime(data.dt, data.timezone);
}
//since the offset is included, the UTC time is converted to the timezone of the weather data.
function getTime(unix, tzoffset) {
  let meridiem;
  let hrs = new Date((unix + tzoffset) * 1000).getUTCHours();
  let mins = new Date((unix + tzoffset) * 1000).getUTCMinutes();

  if (hrs > 12) {
    meridiem = "PM";
    hrs -= 12;
  } else {
    meridiem = "AM";
  }

  if (mins < 10) mins = `0${mins}`;

  let time = `As of ${hrs}:${mins} ${meridiem}`;
  return time;
}

getWeather("detroit");
