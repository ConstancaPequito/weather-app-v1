function selectLocation(event) {
    event.preventDefault();
    let currentLocation = document.querySelector("#current-location");
    let searchInput = document.querySelector("#search-input");
    currentLocation.innerHTML = `${searchInput.value}`;
  
    getCity(searchInput.value);
  }
  let form = document.querySelector("#search-form");
  
  form.addEventListener("submit", selectLocation);
  
  // DATE //
  
  let now = new Date();
  
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let weekDay = now.getDay(); //Not needed
  weekDay = weekDays[now.getDay()];
  
  let day = now.getDate();
  
  let month = now.getMonth();
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  month = months[now.getMonth()];
  
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  
  let currentDate = document.querySelector("#current-date");
  
  currentDate.innerHTML = `${weekDay}, ${day} of ${month}, ${hours}:${minutes}`;
  
  // Celcius to Fahrenheit //
  
  let tempCelcius = 16;
  let tempFahr = (tempCelcius * 9) / 5 + 32;
  
  function setCelcius() {
    let temperatureC = document.querySelector(".current-degrees");
    temperatureC.innerHTML = `${tempCelcius}`;
  }
  
  let celciusButton = document.querySelector("#celcius-button");
  celciusButton.addEventListener("click", setCelcius);
  
  function setFahrenheit() {
    let temperature = document.querySelector(".current-degrees");
    temperature.innerHTML = `${tempFahr}`;
  }
  
  let fahrenheitButton = document.querySelector("#fahrenheit-button");
  fahrenheitButton.addEventListener("click", setFahrenheit);
  
  // Show Temperature in Written City // > IT'S NOT WORKING ??
  
  function showWeatherCity(response) {
    document.querySelector("#current-location").innerHTML = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    let currentDegrees = document.querySelector(".current-degrees");
    currentDegrees.innerHTML = `${temperature}`;
    document.querySelector("#current-location").innerHTML = response.data.name;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speead
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
  }
  
  function getCity(cityName) {
    let apiKey = "b3a8eb2418e5e4cf6a6ab375ca013626";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}$units=metric`;
    axios.get(apiUrl).then(showWeatherCity);
  }
  
  // Show Temperature in Current Location Button // > ITS NOT WORKING
  
  function getActualPosition(position) {
    let apiKey = "b3a8eb2418e5e4cf6a6ab375ca013626";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://aapi.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}$units=metric`;
    axios.get(apiUrl).then(showWeatherCity);
  }
  
  function getMyPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getActualPosition);
  }
  
  let currentLocationButton = document.querySelector("#my-location-button");
  currentLocationButton.addEventListener("click", getMyPosition);
  