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

//display forecast for the searched city
function getForcast(coordinates) {
  console.log(coordinates);
  let apiKey = "33bb3131faab8b8de402456e4193a0d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//display the searched city information
function displayTemperature(response) {
  console.log(response.data);
  let temperature = document.querySelector("#current-temperature");
  let description = document.querySelector("#weather-description");
  let h1 = document.querySelector("#currentCity");
  let humidityElement = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  let windSpeedElement = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperature.innerHTML = Math.round(response.data.main.temp);
  h1.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${humidityElement}%`;
  windSpeed.innerHTML = `${windSpeedElement} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForcast(response.data.coord);
}

function search(city) {
  let apiKey = "33bb3131faab8b8de402456e4193a0d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

//choose searched city to display information
function handelSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#showCity");
  search(searchInput.value);
}

let form = document.querySelector("#searchCities");
form.addEventListener("click", handelSearch);

//celsius to farenheit conversion
function displayFarenheitTemperature(event) {
  event.preventDefault();
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  //remove the active class from the celsius link
  celsiusLink.classList.remove("active");
  //add the active class to the  farenheit link
  farenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}
let celsiusTemperature = null;

let farenheitLink = document.querySelector("#fahrenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

//farenheit to celsius conversion
function displayCelsiusTemperature(event) {
  event.preventDefault();
  //add the active class to the celsius link
  celsiusLink.classList.add("active");
  //remove the active class from the farenheit link
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

// search the weather information of current location
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "33bb3131faab8b8de402456e4193a0d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#btnCurrent");
currentButton.addEventListener("click", getCurrentPosition);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

// fill forecast row
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ` <div class="box">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
                <div class="rectangle" id="1">
                  <h3 class="rectangle-title">${formatDay(forecastDay.dt)}</h3>
                   <br />
                  <h4 class="forecast-temp" id="temp-max">
                    ${Math.round(forecastDay.temp.max)}°C  </h4> 
                    <img src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png" 
                    class="weather-img" 
                    alt="weather-img" id="weather-icon"  />
                   <h4 class="forecast-temp" id="temp-min"> ${Math.round(
                     forecastDay.temp.min
                   )}°C
                  </h4>
                </div>
              </div>
              
              `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

// Load Page
search("tehran");
