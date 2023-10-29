$(document).ready(function() {


// API variables
const cityName = document.getElementById('city-name');
var apiKey = '3b8d60dee3567443738880c9e96f75d9'
var searchBtn = document.getElementById('search-btn');
// var cities = ['Atlanta','Denver', 'Seattle', 'San Francisco','Orlando','New York', 'Chicago','Austin'];
// geo code api
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// 5 day forecase api
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// Initial API call
function getWeatherData(city) {
  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID='+apiKey+'&units=imperial'

fetch (requestUrl)
.then(function (response) {
  return response.json();
})

.then(function (data) {
  console.log ('fetch response \n------');
  console.log(data);
  cityName.textContent = data.name;
});

// return data?
// return {
//   city: city,
//   date: date,
//   temperature: data.main.temp 
//   wind: wind,
//   humidity: humidity,
  
// };

}

// make 5 day forecast function - use a loop


searchBtn.addEventListener('click', function(event) { 
  event.preventDefault();
var searchCity = document.querySelector('.search-bar').value;
document.querySelector('.search-bar').value='';
getWeatherData(searchCity);
// get 5 day search city
});



















});








// var userContainer = document.getElementById('users');
// var fetchButton = document.getElementById('fetch-button');

// function getApi() {
//   var requestUrl = 'https://api.github.com/users?per_page=5';

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       // Use the console to examine the response
//       console.log(data);
//       // TODO: Loop through the data and generate your HTML
//     });
// }
// fetchButton.addEventListener('click', getApi);


// My API Key: 3b8d60dee3567443738880c9e96f75d9


// Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

// Use the [5 Day Weather Forecast](https://openweathermap.org/forecast5) to retrieve weather data for cities. The base URL should look like the following: `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`. After registering for a new API key, you may need to wait up to 2 hours for that API key to activate.

// **Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

// You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).
