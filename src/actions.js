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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Curacao");
