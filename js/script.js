const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");
const toggle = document.getElementById("theme");

// Function to apply theme based on toggle state
function applyTheme() {
  if (toggle.checked) {
    container.style.background = "rgba(15, 15, 15, 0.552)";
  } else {
    container.style.background = "rgba(255, 255, 255, 0.096)";
  }
}

// Initial theme application
applyTheme();

// Event listener for the toggle button
toggle.addEventListener("change", applyTheme);

search.addEventListener("click", () => {
  const api_key = "API_KEY";
  const city = document.querySelector(".search-box input").value;
  if (city === "") return;

  // Store the toggle state before fetching data
  const toggleState = toggle.checked;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
    .then((response) => response.json())
    .then((json) => {

      if(json.cod == '404'){
        container.style.height = "500px";
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error.classList.add('active');
        return;
      }

      container.style.height = "555px";
      weatherBox.classList.add('active');
      weatherDetails.classList.add('active');
      error.classList.remove('active');

      const video = document.getElementById("video-background");
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(".weather-details .humidity span");
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          video.src = "images/clear.mp4";
          image.src = "images/clear.png";
          break;
        case "Rain":
          video.src = "images/rain.mp4";
          image.src = "images/rain.png";
          break;
        case "Snow":
          video.src = "images/snow.mp4";
          image.src = "images/snow.png";
          break;
        case "Clouds":
          video.src = "images/cloud.mp4";
          image.src = "images/cloud.png";
          break;
        case "Mist":
          video.src = "images/mist.mp4";
          image.src = "images/wind.png";
          break;
        case "Haze":
          video.src = "images/mist.mp4";
          image.src = "images/haze.png";
          break;
        default:
          video.src = "images/clear.mp4";
          image.src = "images/cloud.png";
      }

      temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
      description.innerHTML = json.weather[0].description;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
});
