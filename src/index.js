
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import '../assets/styles/style.css';

let weather = {
  "apiKey": "6122d350292c9bfc5150c7ce08ef1c41",
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0]; //this property brings an array inside the object
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.table(name, icon, description, temp, humidity, speed);
    //document.querySelector('city').innerHTML = "Weather in " + name
  }
}

//api.openweathermap.org/data/2.5/weather?q={city name}&units=metric&appid={API key}

//api.openweathermap.org/data/2.5/weather?q=Porto Alegre&units=metric&appid=6122d350292c9bfc5150c7ce08ef1c41