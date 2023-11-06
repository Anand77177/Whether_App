// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//  App data
const weather = {};
weather.temperature = {
  unit: "celsius",
};
// App consts  and vars
// const Fahrenheit = 273;

// API key

const key = "ZSTVPUNSTT4U65MRCJYY7CUX6";
// http://api.openweathermap.org/data/2.5/weather?lat=${25.5941}&lon=${85.1376}&appid=${9f9328bee515929e5dc0ecda5965dc4e}

// check if browser supports geolocationn
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.getElementsByClassName.display = "black";
  notificationElement.innerHTML = "<p> Browser desn't support Geolocation </p>";
}

// set user's Position
function setPosition(position) {
  //let longitude =position.coords.longitude;
  //let latitude = position.coords.latitude;
  let longitude = 77.9868911; // Dehradun
   let latitude= 30.2671456;
     


  getweather(latitude, longitude);
}

// ea5352dcc6e44f09800135600221512
// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION  SERVICE
function showError(error) {
  notificationElement.getElementsByClassName.display = "block";
  notificationElement.innerHTML = "<p> ${error.message} </p>";
}
//
function getweather(latitude, longitude) {
  let api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=us&key=${key}`;
  // console.log(api);
  fetch(api)
    .then(function (response) {
      const data = response.json();
      return data;
    })
    .then(function (data) {
      // console.log(data);
      // console.log(data.description);
      weather.temperature.value = Math.floor(
        ((data.currentConditions.feelslike - 32) * 5) / 9
      );
      weather.description = data.description;
      weather.iconId = data.currentConditions.icon;
      // weather.city = data.timezone;
      // weather.country = data.sys.country;
    })
    .then(function () {
      displayweather();
    });

  let locationApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
  fetch(locationApi)
    .then(function (response) {
      const data = response.json();
      return data;
    })
    .then(function (data) {
      weather.city = data.city;
      weather.country = data.countryName;
      console.log(data);
    });
}

// DISPLAY WEATHER TO UI

function displayweather() {
  // console.log(weather);
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = `${weather.description}`;
  locationElement.innerHTML = `${weather.city} (${weather.country})`;
}
