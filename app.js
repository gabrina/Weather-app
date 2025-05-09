import { fetchData } from "./utils/httpReq.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "db3335bf28072c6527bd233486220fbd";
const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const searchInput = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const currentWeatherDiv = document.getElementById("currentWeather");
const location = document.getElementById("location");
const forcastSection = document.getElementById("forcast");

const showData = (data) => {
  currentWeatherDiv.innerHTML = `<h1 id="currentWeather-top">${data.name}, ${data.sys.country}</h1>
      <div id="currentWeather-middle">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" id="currentWeather-logo" />
        <span id="currentWeather-status">${data.weather[0].main}</span>
        <span id="currentWeather-temp">${data.main.temp}°C</span>
      </div>
      <div id="currentWeather-bottom">
        <span id="humidity">Humidity: <span id="humidity-value">${data.main.humidity}%</span> </span>
        <span id="wind-speed">Wind Speed: <span id="wind-value">${data.wind.speed}m/s</span></span>
      </div>`;
};

const showForcastData = (forcastData) => {
  const data = forcastData.list.filter((obj) =>
    obj.dt_txt.endsWith("12:00:00")
  );
  forcastSection.innerHTML = "";

  data.forEach((element) => {
    const forcastCard = document.createElement("div");
    forcastCard.innerHTML = ` <img src="https://openweathermap.org/img/wn/${
      element.weather[0].icon
    }@2x.png" alt="" id="forcast-icon">
        <h4 id="forcast-day">${DAYS[new Date(element.dt * 1000).getDay()]}</h4>
        <span id="forcast-temp">${element.main.temp}C</span>
        <span id="forcast-status">${element.weather[0].main}</span>`;
    forcastCard.id = "forcast-card";
    forcastSection.append(forcastCard);
  });
};

const searchHandeler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    alert("Enter City name!");
    return;
  }
  const URL = `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
  const data = await fetchData(URL);
  searchInput.value = "";
  showData(data);
  const forcastURL = `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;
  const forcastData = await fetchData(forcastURL);
  showForcastData(forcastData);
};

const getWeatherByPositions = async (lat, lon) => {
  const URL = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const data = await fetchData(URL);
  showData(data);
  const forcastURL = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const forcastData = await fetchData(forcastURL);
  showForcastData(forcastData);
};

const locationHandeler = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    getWeatherByPositions(position.coords.latitude, position.coords.longitude);
  });
};

searchButton.addEventListener("click", searchHandeler);
window.addEventListener("DOMContentLoaded", locationHandeler);
location.addEventListener("click", locationHandeler);
