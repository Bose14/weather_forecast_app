// obtaining date and time
function getTodayDate() {
    let date = currentDate.getDate();
    let hour = currentDate.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minute = currentDate.getMinutes();
    if (minute < 10) {
      minute = `0${minute}`;
    }
    let year = currentDate.getFullYear();
  
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[currentDate.getDay()];
  
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];
    let month = months[currentDate.getMonth()];
  
    return `${day} ${month} ${date}, ${year}, ${hour}:${minute}`;
  }
  
  let currentDate = new Date();
  let dateElement = document.querySelector("#current-date-time");
  dateElement.innerHTML = getTodayDate(currentDate);
  
  // next 6 days forecast
  function getForecastDays() {
    let weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun","Mon","Tue","Wed","Thu","Fri","Sat",];
    document.querySelector("#day-1").innerHTML = `${
      weekDays[currentDate.getDay() + 1]
    }`;
    document.querySelector("#day-2").innerHTML = `${
      weekDays[currentDate.getDay() + 2]
    }`;
    document.querySelector("#day-3").innerHTML = `${
      weekDays[currentDate.getDay() + 3]
    }`;
    document.querySelector("#day-4").innerHTML = `${
      weekDays[currentDate.getDay() + 4]
    }`;
    document.querySelector("#day-5").innerHTML = `${
      weekDays[currentDate.getDay() + 5]
    }`;
    document.querySelector("#day-6").innerHTML = `${
      weekDays[currentDate.getDay() + 6]
    }`;
  }
  getForecastDays();
  // DEFAULT LOCATION ON LOAD ... searches for a specific city weather
  function searchCity(city) {
    let apiKey = "a5c1a8d6ca8307bb18045a8ofa2at259";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
  // SEARCH ENGINE sends to search(city) which sends to displayWeather
  function citySubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-city-input").value;
    searchCity(city);
  }
  // Receiving current location from geolocation api
  function searchLocation(position) {
    let apiKey = "a5c1a8d6ca8307bb18045a8ofa2at259";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
  // RETRIEVE CURRENT LOCATION WHEN CURRENT LOCATION BUTTON CLICKED
  function retrieveLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  // RECEIVING DATA FROM DEFAULT LOAD OR SEARCH
  function displayWeather(response) {
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    document.querySelector("#current-city").innerHTML = response.data.city;
    document.querySelector("#current-conditions").innerHTML =response.data.condition.description;
    document.querySelector("#current-conditions-icon").innerHTML = `<img src="${response.data.condition.icon_url}">`;
    document.querySelector("#selected-unit").innerHTML = `°C`;
    celsiusTemperature = Math.round(response.data.temperature.current);
    document.querySelector("#current-temperature").innerHTML = Math.round(response.data.temperature.current);
    feelsLikeCelsius = Math.round(response.data.temperature.feels_like);
    //document.querySelector("#feels-like").innerHTML = `${Math.round(response.data.temperature.feels_like)}`;
    document.querySelector("#windspeed").innerHTML = `${Math.round(response.data.wind.speed * 3.6)}`;
    document.querySelector("#humidity").innerHTML = `${response.data.temperature.humidity}`;
    document.querySelector("#search-city-input").value = ``;
    //document.querySelector("#format-date").innerHTML = formatDate(response.data.time * 1000);
    getForecast(response);
  }
  // getting Forecast for current or searched city
  function getForecast(response) {
    let apiKey = "a5c1a8d6ca8307bb18045a8ofa2at259";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${response.data.city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
    console.log(apiUrl);
  }
  // displaying forecast for current or searched city
  function displayForecast(response) {
    let forecastDay = response.data.daily;
    document.querySelector("#forecast-temp-1").innerHTML = `${Math.round(forecastDay[1].temperature.day)}`;
    document.querySelector("#forecast-icon-1").innerHTML = `<img src="${forecastDay[1].condition.icon_url}">`;
    celsiusForecast1 = Math.round(forecastDay[1].temperature.day);
    document.querySelector("#forecast-temp-2").innerHTML = `${Math.round(forecastDay[2].temperature.day)}`;
    document.querySelector("#forecast-icon-2").innerHTML = `<img src="${forecastDay[2].condition.icon_url}">`;
    celsiusForecast2 = Math.round(forecastDay[2].temperature.day);
    document.querySelector("#forecast-temp-3").innerHTML = `${Math.round(forecastDay[3].temperature.day)}`;
    document.querySelector("#forecast-icon-3").innerHTML = `<img src="${forecastDay[3].condition.icon_url}">`;
    celsiusForecast3 = Math.round(forecastDay[3].temperature.day);
    document.querySelector("#forecast-temp-4").innerHTML = `${Math.round(forecastDay[4].temperature.day)}`;
    document.querySelector("#forecast-icon-4").innerHTML = `<img src="${forecastDay[4].condition.icon_url}">`;
    celsiusForecast4 = Math.round(forecastDay[4].temperature.day);
    document.querySelector("#forecast-temp-5").innerHTML = `${Math.round(forecastDay[5].temperature.day)}`;
    document.querySelector("#forecast-icon-5").innerHTML = `<img src="${forecastDay[5].condition.icon_url}">`;
    celsiusForecast5 = Math.round(forecastDay[5].temperature.day);
    document.querySelector("#forecast-temp-6").innerHTML = `${Math.round(forecastDay[6].temperature.day)}`;
    document.querySelector("#forecast-icon-6").innerHTML = `<img src="${forecastDay[6].condition.icon_url}">`;
    celsiusForecast6 = Math.round(forecastDay[6].temperature.day);
  }
  //converts to fahrenheit
  function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
    document.querySelector("#current-temperature").innerHTML =fahrenheitTemperature;
    document.querySelector("#selected-unit").innerHTML = `°F`;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let feelsLikeFahrenheit = Math.round((feelsLikeCelsius * 9) / 5 + 32);
    document.querySelector("#feels-like").innerHTML = feelsLikeFahrenheit;
    let forecast1 = Math.round((celsiusForecast1 * 9) / 5 + 32);
    document.querySelector("#forecast-temp-1").innerHTML = forecast1;
    let forecast2 = Math.round((celsiusForecast2 * 9) / 5 + 32);
    document.querySelector("#forecast-temp-2").innerHTML = forecast2;
    let forecast3 = Math.round((celsiusForecast3 * 9) / 5 + 32);
    document.querySelector("#forecast-temp-3").innerHTML = forecast3;
    let forecast4 = Math.round((celsiusForecast4 * 9) / 5 + 32);
    document.querySelector("#forecast-temp-4").innerHTML = forecast4;
    let forecast5 = Math.round((celsiusForecast5 * 9) / 5 + 32);
    document.querySelector("#forecast-temp-5").innerHTML = forecast5;
    let forecast6 = Math.round((celsiusForecast6 * 9) / 5 + 32);
    document.querySelector("#forecast-temp-6").innerHTML = forecast6;
  }
  // converts to celsius
  function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    document.querySelector("#current-temperature").innerHTML = celsiusTemperature;
    document.querySelector("#selected-unit").innerHTML = `°C`;
    document.querySelector("#feels-like").innerHTML = feelsLikeCelsius;
    document.querySelector("#forecast-temp-1").innerHTML = celsiusForecast1;
    document.querySelector("#forecast-temp-2").innerHTML = celsiusForecast2;
    document.querySelector("#forecast-temp-3").innerHTML = celsiusForecast3;
    document.querySelector("#forecast-temp-4").innerHTML = celsiusForecast4;
    document.querySelector("#forecast-temp-5").innerHTML = celsiusForecast5;
    document.querySelector("#forecast-temp-6").innerHTML = celsiusForecast6;
  }
  // global definitions for unit conversion referral
  let celsiusTemperature = null;
  let feelsLikeCelsius = null;
  let celsiusForecast1 = null;
  let celsiusForecast2 = null;
  let celsiusForecast3 = null;
  let celsiusForecast4 = null;
  let celsiusForecast5 = null;
  let celsiusForecast6 = null;
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", citySubmit);
  let currentLocationBtn = document.querySelector("#current-location-btn");
  currentLocationBtn.addEventListener("click", retrieveLocation);
  let fahrenheitLink = document.querySelector("#units-fahrenheit");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
  let celsiusLink = document.querySelector("#units-celsius");
  celsiusLink.addEventListener("click", displayCelsiusTemperature);
  //sending to default load
  searchCity("Vancouver");
  