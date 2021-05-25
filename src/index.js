import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import '../assets/styles/style.css';

// DOM

const apiKey = '6122d350292c9bfc5150c7ce08ef1c41';

const displayWeather = (data) => {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  document.getElementById('city').innerText = `Weather in ${name}`;
  document.getElementById('temp').innerText = `${temp} C`;
  document.getElementById('icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  document.getElementById('description').innerText = description;
  document.getElementById('humidity').innerText = `humidity: ${humidity}%`;
  document.getElementById('wind').innerText = `wind: ${speed}km/h`;

  document.querySelector('.weather').classList.remove('loading');
  document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${description}')`;

  const temperature = document.getElementById('temp');
  temperature.addEventListener('click', () => {
  setTemp(data.main.temp, temperature);
  console.log(data.main.temp);
  console.log(temperature);
  });
};

// LOGIC

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
};

const setTemp = (temp, unit) => {
  const Fahrenheit = ((temp * (9 / 5)) + 32).toFixed(2);
  const Celsius = temp;
  const convert = document.getElementById('convert');
  const findS = unit.innerText.slice(-1);

  console.log(findS);

  if (findS == "C") {
    unit.textContent = Fahrenheit + "F";
    convert.textContent = "click for Celsius"
  } else if (findS == "F") {
    unit.textContent = Celsius + "C";
    convert.textContent = "click for Fahrenheint"
  }
};

document.getElementById('search-btn').addEventListener('click', () => {
  weather.fetchWeather(document.getElementById('search-input').value);
  console.log(document.getElementById('search-input').value);
});

document.getElementById('search-input').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    weather.fetchWeather(document.getElementById('search-input').value);
  }
});
