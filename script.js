$(document).ready(function() {

  // API variables
  const cityName = document.getElementById('city-name');
  const temp = document.getElementById('temp');
  const wind = document.getElementById('wind');
  const humidity = document.getElementById('humidity');
  const searchBtn = document.getElementById('search-btn');
  const apiKey = '3b8d60dee3567443738880c9e96f75d9';
  

  // Get the current date
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const year = currentDate.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  // Set up local storage
  var recentlySearchedCities = [];

  if (localStorage.getItem('recentCities')) {
    recentlySearchedCities = JSON.parse(localStorage.getItem('recentCities'));
    renderRecentlySearchedCities();
  }

  // Function to add a city to the recently searched list
  function addToRecentlySearched(city) {
    if (!recentlySearchedCities.includes(city)) {
      recentlySearchedCities.push(city);
      localStorage.setItem('recentCities', JSON.stringify(recentlySearchedCities));
      renderRecentlySearchedCities();
    }
  }

  // Function to render recently searched cities as buttons
  function renderRecentlySearchedCities() {
    var bottomDiv = document.querySelector('.bottom-div');
    bottomDiv.innerHTML = '';

    recentlySearchedCities.forEach(function(city) {
      var cityButton = document.createElement('button');
      cityButton.textContent = city;
      cityButton.className = 'recent-city-button btn-spacing';

      cityButton.addEventListener('click', function() {
        // When a recently searched city button is clicked, search for it again
        getWeatherData(city);
        getFiveDayForecast(city);
      });

      bottomDiv.appendChild(cityButton);
    });
  }

  // geo code API
  // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

  // 5-day forecast API
  // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

  // Initial API call
  function getWeatherData(city) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=imperial`;

    fetch(requestUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log('fetch response \n------');
        console.log(data);
        cityName.textContent = `${data.name} - ${formattedDate}`;

              // Create an img element for the weather icon
      var weatherIcon = document.createElement('img');
      var iconCode = data.weather[0].icon;
      weatherIcon.src = `http://openweathermap.org/img/w/${iconCode}.png`;

      // Append the weather icon and date to the capital-weather-display
      var capitalWeatherDisplay = document.querySelector('.info-div');
     
      capitalWeatherDisplay.appendChild(weatherIcon); // Add the weather icon
      
      


        temp.textContent = `Temp: ${data.main.temp} °F`;
        wind.textContent = `Wind: ${data.wind.speed} MPH`;
        humidity.textContent = `Humidity: ${data.main.humidity} %`;

      });
  }

  // Make 5-day forecast function
  function getFiveDayForecast(city) {
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=imperial`;

    fetch(forecastUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log('5-day forecast response \n------');
        console.log(data);

        // Clear the existing forecast boxes
        var forecastDiv = document.querySelector('.forecast-div');
        forecastDiv.innerHTML = '';

        // Loop through the forecast data for the next 5 days
        for (var i = 0; i < data.list.length; i += 8) {
          var forecastData = data.list[i];
          var date = new Date(forecastData.dt * 1000); // Convert the timestamp to a Date object
          var formattedDate = date.toDateString();

          // Create a new div element for the forecast box
          var forecastBox = document.createElement('div');
          forecastBox.className = 'forecast-box';

          // Create separate elements for date, temperature, wind, and humidity
          var dateElement = document.createElement('h5');
          dateElement.textContent = ` ${formattedDate}`;
          var weatherIcon = document.createElement('img');
        var iconCode = forecastData.weather[0].icon;
        weatherIcon.src = `http://openweathermap.org/img/w/${iconCode}.png`;
          var tempElement = document.createElement('p');
          tempElement.textContent = `Temp: ${forecastData.main.temp} °F`;
          var windElement = document.createElement('p');
          windElement.textContent = `Wind: ${forecastData.wind.speed} MPH`;
          var humidityElement = document.createElement('p');
          humidityElement.textContent = `Humidity: ${forecastData.main.humidity} %`;

          // Append these elements to the forecastBox
          forecastBox.appendChild(dateElement);
          forecastBox.appendChild(weatherIcon);
          forecastBox.appendChild(tempElement);
          forecastBox.appendChild(windElement);
          forecastBox.appendChild(humidityElement);

          // Append the forecastBox to the .forecast-div
          forecastDiv.appendChild(forecastBox);
        }
      });
  }

  searchBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var searchCity = document.querySelector('.search-bar').value;
    document.querySelector('.search-bar').value = '';
    getWeatherData(searchCity);
    getFiveDayForecast(searchCity);
    addToRecentlySearched(searchCity);
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
