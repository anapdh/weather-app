import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import '../assets/styles/style.css';

// DOM

const apiKey = '6122d350292c9bfc5150c7ce08ef1c41';
const setTempType = document.getElementById('temps-section');
const setTemp = document.getElementById('temp');

const displayWeather = (data) => {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  document.getElementById('city').innerText = `Weather in ${name}`;
  document.getElementById('temp').innerText = `${temp}°C`;
  document.getElementById('icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  document.getElementById('description').innerText = description;
  document.getElementById('humidity').innerText = `humidity: ${humidity}%`;
  document.getElementById('wind').innerText = `wind: ${speed}km/h`;

  document.querySelector('.weather').classList.remove('loading');
  document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;

  // LOGIC

  const Fahrenheit = (temp * (9 / 5)) + 32;

  setTempType.addEventListener('click', () => {
    if (setTemp.textContent === `${temp}°C`) {
      setTemp.textContent = (`${Fahrenheit}°F`);
    } else {
      setTemp.textContent = `${temp}°C`;
    }
  });
};

window.addEventListener('load', () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      long = pos.coords.longitude;
      lat = pos.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
      fetch(api)
        .then((response) => response.json())
        .then((data) => displayWeather(data));
    });
  }
});

const weather = {
  fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => displayWeather(data));
  },
  search() {
    this.fetchWeather(document.getElementById('search-input').value);
  },
};

// EVENTS

document.getElementById('search-btn').addEventListener('click', () => {
  weather.search();
});

document.getElementById('search-input').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    weather.search();
  }
});
