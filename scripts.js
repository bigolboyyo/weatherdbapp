const body = document.getElementsByTagName("body");

const unsplashRandom =
  "https://source.unsplash.com/random/1920x1080/?landscapes";
document.body.style.backgroundImage = `url(${unsplashRandom})`;

const header = document.createElement("div");
header.className = "header";
header.id = "header";
document.body.append(header);

const container = document.createElement("div");
container.className = "container";
document.body.append(container);

const h1 = document.createElement("h1");
h1.id = "h1";
h1.textContent = "WeatherDB Search";
h1.style.textAlign = "center";
header.append(h1);

let p1 = document.createElement("p");
p1.id = "p1";
p1.textContent = "Enter location for today's weather!";
p1.style.textAlign = "center";
header.append(p1);

const cityInput = document.createElement("input");
cityInput.className = "search-inputs";
cityInput.id = "city-input";
cityInput.placeholder = " ex: New York, Toronto, London";
header.append(cityInput);

const searchButton = document.createElement("button");
searchButton.className = "buttons";
searchButton.id = "search-btn";
searchButton.textContent = "🔍";

let br = document.createElement("br");
header.append(br);

header.append(searchButton);

function fetchWeather(e) {
  let userInput = cityInput.value;

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
    .then((json) => weatherSearch(json, userInput))
    .catch((err) => {
      window.alert(
        `${err} \n https://weatherdbi.herokuapp.com/data/weather/${userInput}`
      );
      console.log(err);
    });
}

function weatherSearch(e, userInput) {
  cityInput.value = "";
  let weatherKeys = Object.keys(e.currentConditions);
  let weatherValues = Object.values(e.currentConditions);
  let temps = Object.values(weatherValues[1]);
  let speeds = Object.values(weatherValues[4]);

  const card = document.createElement("div");
  card.id = `${userInput}-card`;
  card.className = "cards";

  container.append(card);

  const front = document.createElement("div");
  front.id = `${userInput}-front`;
  front.className = "front";

  front.innerHTML = `
  <h1>${userInput.toUpperCase()}</h1>
  <p>Time: ${weatherValues[0]}</p>
  <li id="comment">Comment: ${weatherValues[6]}</li>
  <li id="precipitation">Precipitation: ${weatherValues[2]}
  <li id="temp">Temp: ${temps[0]}c | ${temps[1]}f</li>
  <li id="humidity">Humidity: ${weatherValues[3]}</li>
  <li id="wind">Wind Speed: ${speeds[0]}km | ${speeds[1]}mile</li>
  </br>
  <button id="notes-btn" class="buttons">Notes</button>
  `;

  card.append(front);

  const back = document.createElement("div");
  back.id = `${userInput}-back`;
  back.className = "back";

  back.innerHTML = `
  <textarea id="back-text" name="backtext"
  rows="25" placeholder="NotePad">
  </textarea>
  </br>
  <button id="front-btn">Flip</button>
  `;

  let notesBtn = document.getElementById("notes-btn");
  notesBtn.addEventListener("click", handleFrontClick);
  console.log(notesBtn);

  function handleFrontClick(e) {
    e.target.parentNode.remove();
    card.appendChild(back);

    let frontBtn = document.getElementById("front-btn");
    frontBtn.addEventListener("click", (e) => {
      e.target.parentNode.remove();
      card.appendChild(front);
    });
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  searchButton.addEventListener("click", (e) => {
    fetchWeather();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && cityInput.value.length > 0) {
      fetchWeather();
    }
  });
});
