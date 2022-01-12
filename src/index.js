//Functions

//This function is to get the current Date and time
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

//This function is for change the background imag .
//The "displayTemperature" function is calling it.
function backgroundImage(response) {
  let weatherCondition = response.data.weather[0].icon;
  let backgroundElement = document.querySelector(".card");
  switch (weatherCondition) {
    case "01d":
      backgroundElement.style.backgroundImage = "url(images/clear-sky-day.png)";
      backgroundElement.style.backgroundPosition = "bottom right";
      break;

    case "01n":
      backgroundElement.style.backgroundImage =
        "url(images/clear-sky-night.png)";
      backgroundElement.style.backgroundPosition = "bottom right";
      break;

    case "02d":
      backgroundElement.style.backgroundImage =
        "url(images/few-clouds-day.png)";
      backgroundElement.style.backgroundPosition = "bottom right";
      break;

    case "02n":
      backgroundElement.style.backgroundImage =
        "url(images/few-clouds-night.png)";
      backgroundElement.style.backgroundPosition = "bottom right";
      break;

    case "03d":
      backgroundElement.style.backgroundImage =
        "url(images/scattered-cloudes.png)";
      backgroundElement.style.backgroundPosition = "bottom right";
      break;

    case "03n":
      backgroundElement.style.backgroundImage =
        "url(images/scattered-cloudes.png)";
      backgroundElement.style.backgroundPosition = "bottom right";
      break;

    case "04d":
      backgroundElement.style.backgroundImage =
        "url(images/broken-cloudes.png)";
      backgroundElement.style.backgroundPosition = "bottom right";
      break;

    case "04n":
      backgroundElement.style.backgroundImage =
        "url(images/broken-cloudes.png)";
      backgroundElement.style.backgroundPosition = "bottom right";
      break;

    case "09d":
      backgroundElement.style.backgroundImage = "url(images/rain.jpg)";
      backgroundElement.style.backgroundPosition = "bottom right";
      break;

    case "09n":
      backgroundElement.style.backgroundImage = "url(images/rain.jpg)";
      backgroundElement.style.backgroundPosition = "bottom right";
      break;

    case "10d":
      backgroundElement.style.backgroundImage = "url(images/rain.jpg)";
      backgroundElement.style.backgroundPosition = "bottom right";
      break;
    case "10n":
      backgroundElement.style.backgroundImage = "url(images/rain.jpg)";
      backgroundElement.style.backgroundPosition = "bottom right";
      break;

    case "11d":
      backgroundElement.style.backgroundImage = "url(images/thunderstorm.png)";
      backgroundElement.style.backgroundPosition = "center";
      break;

    case "11n":
      backgroundElement.style.backgroundImage = "url(images/thunderstorm.png)";
      backgroundElement.style.backgroundPosition = "center";
      break;

    case "13d":
      backgroundElement.style.backgroundImage = "url(images/background.png)";
      backgroundElement.style.backgroundPosition = "bottom right";
      break;

    case "13n":
      backgroundElement.style.backgroundImage = "url(images/background.png)";
      backgroundElement.style.backgroundPosition = "bottom right";
      break;

    case "50d":
      backgroundElement.style.backgroundImage = "url(images/mist2.jpg)";
      break;

    case "50n":
      backgroundElement.style.backgroundImage = "url(images/mist2.jpg)";
      backgroundElement.style.backgroundPosition = "center";
  }
}

//This function works to fill the days name in the html forecast row function.
//The "function(forecastDay, index)"" inside the "displayForecast" is calling it.
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//This function works to fill all the Forecast Row
//The "getForcast" is calling it.
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
                  <h4 class="rectangle-title">${formatDay(forecastDay.dt)}</h3>
                   <br />
                  <h6 class="forecast-temp" id="temp-max">
                    ${Math.round(forecastDay.temp.max)}°C  </h6> 
                    <img src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png" 
                    class="weather-img" 
                    alt="weather-img" id="weather-icon"  />
                   <h6 class="forecast-temp" id="temp-min"> ${Math.round(
                     forecastDay.temp.min
                   )}°C
                  </h6>
                </div>
              </div>
              
              `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//display forecast for the searched city
//The "displayTemperature" function is calling it.
function getForcast(coordinates) {
  let apiKey = "33bb3131faab8b8de402456e4193a0d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

//display the searched city information
function displayTemperature(response) {
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
  backgroundImage(response);
}

//This function is to conect the api with the searched city.
//The "handelSearch" function it's calling it.
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
//The "getCurrentPosition" function it's calling it.
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

// Load Page
search("tehran");
