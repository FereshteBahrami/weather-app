function fomatDate(timesTemp) {
  //calculate the date
  return "Friday 05:00";
}

function displayTemperature(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  let temperatureElemnt = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#Weather-summary");
  temperature.innerHTML = `${temperatureElemnt}`;
  let h1 = document.querySelector("#currentCity");
  h1.innerHTML = response.data.name;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = fomatDate(response.data.dt * 1000);
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;
  let humidityElement = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${humidityElement}%`;
  let windSpeedElement = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${windSpeedElement} km/h`;
}

let apiKey = "33bb3131faab8b8de402456e4193a0d1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
