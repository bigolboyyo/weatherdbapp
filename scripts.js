//create a header
//add 1st event listener DOMContentLoaded
//fetch the weather of a specific city or lat,long
// to allow we need a dom element that has our 2nd event listener "click"
// this btn should fetch(GET) a specific city or lat,long. input city || input lat + input long
// it should take that fetched data and return it onto the dom below
// *bonus* we update our db with json that records the search history

//the 3rd event listener will be a simple comment section
//thinking top right of screen as a "chat" like structure

const container = document.createElement("div");
container.className = "container";
document.body.append(container);

const h1 = document.createElement("h1");
h1.id = "h1";
h1.textContent = "Weather Search SPA";
h1.style.textAlign = "center";
container.append(h1);

let p1 = document.createElement("p");
p1.id = "p1";
p1.textContent = "Enter City Name Below";
p1.style.textAlign = "center";
container.append(p1);

const cityInput = document.createElement("input");
cityInput.className = "search-inputs";
cityInput.id = "city-input";
cityInput.placeholder = "ex: New York, Toronto, London";
container.append(cityInput);

/*
let p2 = document.createElement("p");
p2.id = "p2";
p2.textContent = "Enter Latitude and Longitude in decimal format";
p2.style.textAlign = "center";
container.append(p2);

const latInput = document.createElement("input");
const longInput = document.createElement("input");

latInput.className = "search-inputs";
longInput.className = "search-inputs";

latInput.id = "lat-input";
longInput.id = "long-input";

latInput.placeholder = "ex: 38.895";
longInput.placeholder = "-77.0366";

container.append(latInput);
container.append(longInput);
*/

const searchButton = document.createElement("button");
searchButton.className = "buttons";
searchButton.id = "search-btn";
searchButton.textContent = "Search";

let br = document.createElement("br");
container.append(br);

container.append(searchButton);

//here "ashburn" needs to be a variable that can be referenced during the input
//need to create and apply input to the dom
function fetchWeather(e) {
  userInput = cityInput.value;
  //userLat = latInput.value;
  //userLong = longInput.value;

  let config = {
    Headers: {
      "Content-type": "application/json",
    },
  };

  return fetch(
    `https://weatherdbi.herokuapp.com/data/weather/${userInput}`,
    config
  )
    .then((res) => res.json())
    .then((json) => weatherSearch(json));
}

function weatherSearch(e) {
  const weatherDiv = document.createElement("div");
  weatherDiv.style.alignSelf = "center";
  weatherDiv.className = "weather-div";
  weatherDiv.id = `${userInput}-div`;

  weatherDiv.style.width = "50%";
  weatherDiv.style.marginTop = "2%";
  weatherDiv.style.marginBottom = "2%";
  weatherDiv.style.marginInlineStart = "25%";
  weatherDiv.style.marginInlineEnd = "75%";
  weatherDiv.style.textAlign = "center";
  weatherDiv.style.listStyleType = "none";
  container.append(weatherDiv);

  let weatherKeys = Object.keys(e.currentConditions);
  let weatherValues = Object.values(e.currentConditions);
  let temps = Object.values(weatherValues[1]);
  let speeds = Object.values(weatherValues[4]);
  console.log(weatherKeys);
  console.log(weatherValues);

  weatherDiv.innerHTML = `
    <h1>${userInput.toUpperCase()}</h1>
    <p>Time: ${weatherValues[0]}</p>
    <li id="comment">Comment: ${weatherValues[6]}</li>
    <li id="temp">Temp: ${temps[0]}c | ${temps[1]}f</li>
    <li id="humidity">Humidity: ${weatherValues[3]}</li>
    <li id="wind">Wind Speed: ${speeds[0]}km | ${speeds[1]}mile</li>
  `;
}

document.addEventListener("DOMContentLoaded", (e) => {
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    fetchWeather();
  });
});
