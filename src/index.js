//calculate the date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElemnt = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#Weather-summary");
  temperature.innerHTML = `${temperatureElemnt}`;
  let h1 = document.querySelector("#currentCity");
  h1.innerHTML = response.data.name;
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;
  let humidityElement = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${humidityElement}%`;
  let windSpeedElement = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${windSpeedElement} km/h`;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let apiKey = "33bb3131faab8b8de402456e4193a0d1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
