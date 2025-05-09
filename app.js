import { fetchData } from "./utils/httpReq.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "db3335bf28072c6527bd233486220fbd";

const searchInput = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");

const searchHandeler = async () => {
  const cityName = searchInput.value;
  const URL = `${BASE_URL}weather?q=${cityName}&appid=${API_KEY}`;
  // console.log(URL);
  const data = await fetchData(URL);
  console.log(data);
};
searchButton.addEventListener("click", searchHandeler);
