//create a header
//add 1st event listener DOMContentLoaded
//fetch the weather of a specific city or lat,long
// to allow we need a dom element that has our 2nd event listener "click"
// this btn should fetch(GET) a specific city or lat,long. input city || input lat + input long
// it should take that fetched data and return it onto the dom below
// *bonus* we update our db with json that records the search history

//the 3rd event listener will be a simple comment section
//thinking top right of screen as a "chat" like structure

const header = document.createElement("div");
header.className = "header";
header.id = "header";
document.body.append(header);

const container = document.createElement("div");
container.className = "container";
document.body.append(container);

const h1 = document.createElement("h1");
h1.id = "h1";
h1.textContent = "Weather Search SPA";
h1.style.textAlign = "center";
header.append(h1);

let p1 = document.createElement("p");
p1.id = "p1";
p1.textContent = "Enter City Name Below";
p1.style.textAlign = "center";
header.append(p1);

const cityInput = document.createElement("input");
cityInput.className = "search-inputs";
cityInput.id = "city-input";
cityInput.placeholder = "ex: New York, Toronto, London";
header.append(cityInput);

const searchButton = document.createElement("button");
searchButton.className = "buttons";
searchButton.id = "search-btn";
searchButton.textContent = "Search";

let br = document.createElement("br");
header.append(br);

header.append(searchButton);

function fetchWeather(e) {
  userInput = cityInput.value;

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
  let weatherKeys = Object.keys(e.currentConditions);
  let weatherValues = Object.values(e.currentConditions);
  let temps = Object.values(weatherValues[1]);
  let speeds = Object.values(weatherValues[4]);

  const card = document.createElement("div");
  card.id = `${userInput}-card`;
  card.className = "cards";

  let isFull = container.childElementCount >= 2;

  card.innerHTML = `
 <h1>${userInput.toUpperCase()}</h1>
 <p>Time: ${weatherValues[0]}</p>
 <li id="comment">Comment: ${weatherValues[6]}</li>
 <li id="precipitation">Precipitation: ${weatherValues[2]}
     <li id="temp">Temp: ${temps[0]}c | ${temps[1]}f</li>
     <li id="humidity">Humidity: ${weatherValues[3]}</li>
     <li id="wind">Wind Speed: ${speeds[0]}km | ${speeds[1]}mile</li>
     `;
  container.append(card);
}

document.addEventListener("DOMContentLoaded", (e) => {
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    fetchWeather();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      fetchWeather();
    }
  });
});
