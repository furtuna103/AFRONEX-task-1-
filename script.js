const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');
const cityName = document.querySelector('.weather-box .city-name'); // New element for displaying city name

search.addEventListener('click', () => {
  const APIkey = '3b35f28b5653b9ced574c81bb91999c0'; // Replace with your OpenWeatherMap API key
  const cityInput = document.querySelector('.search-box input');
  const city = cityInput.value;

  if (city === '') {
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${APIkey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod === '404') {
        container.style.height = '400px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error.classList.add('active');
        return;
      }

      container.style.height = '555px';
      weatherBox.classList.add('active');
      weatherDetails.classList.add('active');
      error.classList.remove('active');

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'images/clear.png'; // Replace with the correct image path for clear weather
          break;
        case 'Rain':
          image.src = 'images/rain.png'; // Replace with the correct image path for rain
          break;
        case 'Snow':
          image.src = 'images/snow.png'; // Replace with the correct image path for snow
          break;
        case 'Clouds':
          image.src = 'images/cloud.png'; // Replace with the correct image path for clouds
          break;
        case 'Mist':
        case 'Haze':
          image.src = 'images/mist.png'; // Replace with the correct image path for mist or haze
          break;
        default:
          image.src = 'images/cloud.png'; // Replace with the correct image path for other weather conditions
      }

      temperature.innerHTML = `${parseInt(json.main.temp)} <span>ºC</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
      cityName.innerHTML = `${json.name}`; // Display the city name

      // Clear the search input
      cityInput.value = '';
    })
    .catch(error => {
      console.log('Error:', error);
    });
});