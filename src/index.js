let now = new Date();
const options = { weekday: "long" };
let apiKey = "1e0dcb1b35c33c85c8f53ba10ee78100";
let dataTime = document.querySelector("#data-time");
let hours = now.getHours();
let min = now.getMinutes();
hours = hours < 10 ? (hours = "0" + hours) : hours;
min = min < 10 ? (min = "0" + min) : min;
let time = hours + ":" + min;
dataTime.innerHTML =
  new Intl.DateTimeFormat("en-FR", options).format(now) + " " + time;

let city = document.querySelector("#city");
let currentTemp = document.querySelector("#current-temp");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");

function signUp(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let foundCity = inputCity.value;
  if (foundCity !== "") {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${foundCity}&units=metric`;

    function showWeather(response) {
      let temp = Math.round(response.data.main.temp);
      let humidityD = response.data.main.humidity;
      let windD = response.data.wind.speed;
      city.innerHTML = foundCity;
      currentTemp.innerHTML = temp;
      humidity.innerHTML = `Humidity: ${humidityD}%`;
      wind.innerHTML = `Wind: ${windD} km/h`;
    }

    axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
  } else {
    alert("Enter city please!");
  }
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", signUp);

function handlePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrlGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric`;

  function showCurrWeather(response) {
    let tempC = Math.round(response.data.main.temp);
    let humidityC = response.data.main.humidity;
    let windC = response.data.wind.speed;

    function showCurrWeather() {
      currentTemp.innerHTML = tempC;
      city.innerHTML = response.data.name;
      humidity.innerHTML = `Humidity: ${humidityC}%`;
      wind.innerHTML = `Wind: ${windC} km/h`;
    }

    let element = document.querySelector("#buttCurr");
    element.addEventListener("click", showCurrWeather);
  }
  axios.get(`${apiUrlGeo}&appid=${apiKey}`).then(showCurrWeather);
}

navigator.geolocation.getCurrentPosition(handlePosition);
//console.log(navigator);

/*
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
    currentTemp.innerHTML = "17";
  } else {
    if (eventName === "fahrenheit") currentTemp.innerHTML = "62.6";
  }
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", clickingC);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", clickingF);
*/
