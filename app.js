const currTemp = document.getElementById('currTemp');
const tempHi = document.getElementById('tempHi');
const tempLo = document.getElementById('tempLo');
const conditions = document.getElementById('conditions');
const cityName = document.getElementById('cityName');

let weatherData;

async function getWeather(location) {
    try{
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=6d2303fc6e291bdfc8c01fd07ded0995`)
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                weatherData = response;
                displayWeather(response)
                console.log(response);
            });
    } catch (error) {
        console.error(error)
    }
}

function displayWeather(data) {
    data.main == undefined ? cityName.innerText = 'City Not Found' : cityName.innerText = data.name;
    currTemp.innerText = data.main.temp;
    tempHi.innerText = data.main.temp_max;
    tempLo.innerText = data.main.temp_min;
    conditions.innerText = data.weather[0].main;
}

getWeather('denver')
