import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import '../assets/styles/style.css';

// DOM

const apiKey = '6122d350292c9bfc5150c7ce08ef1c41';
const buttonF = document.getElementById('changeF');
const buttonC = document.getElementById('changeC');

const displayWeather = (data) => {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  document.getElementById('city').innerText = `Weather in ${name}`;
  document.getElementById('temp').innerText = `${temp} °C`;
  document.getElementById('icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  document.getElementById('description').innerText = description;
  document.getElementById('humidity').innerText = `humidity: ${humidity}%`;
  document.getElementById('wind').innerText = `wind: ${speed}km/h`;

  document.querySelector('.weather').classList.remove('loading');
  document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${description}')`;

  // LOGIC

  const btnC = (data) => {
    const buttonF = document.getElementById('changeF');
    const buttonC = document.getElementById('changeC');
    const temp = document.getElementById('temp');
    temp.textContent = `${((parseFloat(data.main.temp) * (9 / 5)) + 32).toFixed(2)} °F`;
    buttonF.style.display = 'none';
    buttonC.style.display = 'block';
  };

  const btnF = (data) => {
    const buttonF = document.getElementById('changeF');
    const buttonC = document.getElementById('changeC');
    const temp = document.getElementById('temp');
    temp.textContent = `${data.main.temp} °C`;
    buttonF.style.display = 'block';
    buttonC.style.display = 'none';
  };

  buttonF.addEventListener('click', () => {
    btnC(data);
  });

  buttonC.addEventListener('click', () => {
    btnF(data);
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
};

document.getElementById('search-btn').addEventListener('click', () => {
  weather.fetchWeather(document.getElementById('search-input').value);
});

document.getElementById('search-input').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    weather.fetchWeather(document.getElementById('search-input').value);
  }
});
