import { fetchData } from "./utils/httpReq.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "db3335bf28072c6527bd233486220fbd";

const searchInput = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const currentWeatherDiv = document.getElementById("currentWeather");

const showData = (data) => {
  currentWeatherDiv.innerHTML = `<h1 id="currentWeather-top">${data.name}, ${data.sys.country}</h1>
      <div id="currentWeather-middle">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" id="currentWeather-logo" />
        <span id="currentWeather-status">${data.weather[0].main}</span>
        <span id="currentWeather-temp">${data.main.temp}&deg;C</span>
      </div>
      <div id="currentWeather-bottom">
        <span id="humidity">Humidity: <span id="humidity-value">${data.main.humidity}%</span> </span>
        <span id="wind-speed">Wind Speed: <span id="wind-value">${data.wind.speed}m/s</span></span>
      </div>`;
};

const searchHandeler = async () => {
  const cityName = searchInput.value;
  const URL = `${BASE_URL}weather?q=${cityName}&appid=${API_KEY}&units=metric`;
  // console.log(URL);
  const data = await fetchData(URL);
  showData(data);
};
searchButton.addEventListener("click", searchHandeler);
