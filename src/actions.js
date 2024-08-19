function updateWeather(response) {
  let temperatureVariable = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityVariable = document.querySelector("#city");
  let descriptionVariable = document.querySelector("#weather-description");
  let humidityVariable = document.querySelector("#humidity");
  let windSpeedVariable = document.querySelector("#wind-speed");
  let timeVariable = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconVariable = document.querySelector("#icon");

  cityVariable.innerHTML = response.data.city;
  timeVariable.innerHTML = formatDate(date);
  iconVariable.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
  temperatureVariable.innerHTML = Math.round(temperature);
  descriptionVariable.innerHTML = response.data.condition.description;
  humidityVariable.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedVariable.innerHTML = `${response.data.wind.speed}km/h`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "bc71af9e0b8fdta73d8ebob24352d13f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-form-input");

  searchCity(searchFormInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "bc71af9e0b8fdta73d8ebob24352d13f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <img src="${day.condition.icon_url}"
      class="weather-forecast-icon"/>
      <div class="weather-forecast-temp">
      <div class="weather-forecast-temp-high"><strong>${Math.round(
        day.temperature.maximum
      )}°</strong></div>
      <div class="weather-forecast-temp-min">${Math.round(
        day.temperature.minimum
      )}°</div>
                </div>
            </div>
  `;
    }
  });

  let forecastVariable = document.querySelector("#forecast");
  forecastVariable.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Curacao");
