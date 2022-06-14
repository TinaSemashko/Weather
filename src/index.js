let now = new Date();
const options = { weekday: "long" };
let apiKey = "1e0dcb1b35c33c85c8f53ba10ee78100";
let dataTime = document.querySelector("#data-time");
let hours = now.getHours();
let min = now.getMinutes();
hours = hours < 10 ? (hours = `0${hours}`) : hours;
min = min < 10 ? (min = `0${min}`) : min;
let time = `${hours}:${min}`;
dataTime.innerHTML = `${new Intl.DateTimeFormat("en-FR", options).format(
  now
)} ${time}`;

let city = document.querySelector("#city");
let currentTemp = document.querySelector("#current-temp");
let sHumidity = document.querySelector("#humidity");
let sWind = document.querySelector("#wind");
let iconMain = document.querySelector("#icon-main");
let description = document.querySelector("#description");

function showWeatherAll(response, cityNew) {
  let temp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  celsiusTemperature = temp;
  city.innerHTML = cityNew;
  currentTemp.innerHTML = temp;
  sHumidity.innerHTML = `Humidity: ${humidity}%`;
  sWind.innerHTML = `Wind: ${wind} km/h`;
  description.innerHTML = response.data.weather[0].description;
  iconMain.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconMain.setAttribute("alt", response.data.weather[0].description);
}

function signUp(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let foundCity = inputCity.value;
  if (foundCity !== "") {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${foundCity}&units=metric`;

    function showWeather(response) {
      showWeatherAll(response, foundCity);
    }

    axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
  } else {
    alert("Enter city please!");
  }
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", signUp);

function showCurrWeather() {
  function handlePosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiUrlGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric`;

    function showCurrWeatherData(response) {
      showWeatherAll(response, response.data.name);
    }

    axios.get(`${apiUrlGeo}&appid=${apiKey}`).then(showCurrWeatherData);
  }

  navigator.geolocation.getCurrentPosition(handlePosition);
}

let element = document.querySelector("#buttCurr");
element.addEventListener("click", showCurrWeather);

function clickingC(event) {
  event.preventDefault();
  countDegrees("celsius");
}

function clickingF(event) {
  event.preventDefault();
  countDegrees("fahrenheit");
}

function countDegrees(eventName) {
  let currentTemp = document.querySelector("#current-temp");
  if (eventName === "celsius") {
    currentTemp.innerHTML = celsiusTemperature;
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
  } else {
    if (eventName === "fahrenheit")
      currentTemp.innerHTML = (celsiusTemperature * 9) / 5 + 32;
    fahrenheit.classList.add("active");
    celsius.classList.remove("active");
  }
}
let celsiusTemperature = null;

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", clickingC);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", clickingF);
