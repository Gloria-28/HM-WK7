
function formatDate(timestamp){
   let date = new Date(timestamp);
   let hours = date.getHours();
   if (hours < 10){
    hours = `0${hours}`;
   }
   let minutes = date.getMinutes();
   if (minutes < 10){
    minutes = `0${minutes}`;
   }
   let days = [
    


"Wednesday",
"Thursday",
"Friday",
"Saturday"];
let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;

}
function displayForecast(response){
    console.log(response);
    let forecastElement = document.querySelector("#forecast");

   let  forecastHTML = `<div class="row">`;
   let days = ["Sat","Sun", "Mon","Tus","Wen","Thur","Fri"];
   days.forEach(function(day) {

   
    forecastHTML = 
    forecastHTML +
     `
      <div class="col-2">
            <div class="weather-forecast-date">${day}</div>

            <img src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png" alt="" 
            width="36"
            /> 
            <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-mix">18°
      </span>
    <span class="weather-forecast-temperature-min"> 12°
     </span>
             
        </div>
     </div>
    `;
    });
     
    
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML; 
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey="11af10924b44b47f1b1d52623ef2ad0b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
}

function displayTemperature(response) {
    
   console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
     let descriptionElement = document.querySelector("#description");
      let humidityElement = document.querySelector("#humidity");
      let windElement = document.querySelector("#wind");
      let dateElement = document.querySelector("#date");
      let iconElement = document.querySelector("#icon");

celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round (response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

iconElement.setAttribute("alt", response.data.weather[0].description);

getForecast(response.data.coord);
}


function search(city){

let apiKey="11af10924b44b47f1b1d52623ef2ad0b";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

}


function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
    console.log(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
    console.log(event);
    event.preventDefault();
    celsiustLink.classList.remove("active");
     fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
   let fahrenheitTemperature = (celsiusTemperature * 9 ) /5 + 32;
   temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

function displayCelsiusTemperature(event){
    event.preventDefault();
     let temperatureElement = document.querySelector("#temperature");
     
     celsiustLink.classList.add("active");
     fahrenheitLink.classList.remove("active");
     temperatureElement.innerHTML = Math.round(celsiusTemperature);
    
}

let celsiusTemperature = null;



let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiustLink = document.querySelector("#celsius-link");
celsiustLink.addEventListener("click",displayCelsiusTemperature);




search("New York")
displayForecast();