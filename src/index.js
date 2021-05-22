import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import '../assets/styles/style.css';

window.addEventListener('load', () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      long = pos.coords.longitude;
      lat = pos.coords.latitude;
      
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=6122d350292c9bfc5150c7ce08ef1c41`;
      fetch(api)
      .then((response) => response.json())
      .then((data) => displayWeather(data));
    });
  }
});

const weather = {
  apiKey: '6122d350292c9bfc5150c7ce08ef1c41',
  fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
      .then((response) => response.json())
      .then((data) => displayWeather(data));
  },

  search() {
    this.fetchWeather(document.getElementById('search-input').value);
  },
};

const displayWeather = (data) => {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  document.getElementById('city').innerText = `Weather in ${name}`;
  document.getElementById('tempC').innerText = `${temp}°C`;
  document.getElementById('icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  document.getElementById('description').innerText = description;
  document.getElementById('humidity').innerText = `humidity: ${humidity}%`;
  document.getElementById('wind').innerText = `wind: ${speed}km/h`;

  document.querySelector('.weather').classList.remove('loading');
  document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
};

document.getElementById('search-btn').addEventListener('click', () => {
  weather.search();
});

document.getElementById('search-input').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    weather.search();
  }
});

document.getElementById('temp-btn').addEventListener('click', () => {
  //weather.search();
});

//weather.fetchWeather('Paris');
