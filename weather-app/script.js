let timeOut;
const suggestCity = () => {
  clearTimeout(timeOut);
  timeOut = setTimeout(async () => {
    let suggestionBox = document.querySelector(".suggestion");
    let userInput = document.querySelector("#userInput").value.trim();

    if (!userInput) {
      suggestionBox.innerHTML = "";
      return;
    }
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/search.json?key=bb101170b4d7467fb60130702252702&q=${userInput}`
      );
      const data = await res.json();
      // console.log(data);
      suggestionBox.innerHTML = "";

      data.forEach((city) => {
        const li = document.createElement("li");
        li.textContent = `${city.name}`;
        li.addEventListener("click", () => {
          document.querySelector("#userInput").value = city.name;
          suggestionBox.innerHTML = "";
          // console.log(userInput);
        });
        suggestionBox.appendChild(li);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, 500);
};

// fetchWeather

const fetchWeather = async (query) => {
  try {
    const res = await fetch(
      // `http://api.weatherapi.com/v1/forecast.json?key=bb101170b4d7467fb60130702252702&q=${query}&days=1&aqi=no&alerts=no`
      `http://api.weatherapi.com/v1/forecast.json?key=bb101170b4d7467fb60130702252702&q=${query}&days=7`
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

const submitBtn = document
  .querySelector("#btn")
  .addEventListener("click", () => {
    const inputValue = document.querySelector("#userInput").value.trim();
    fetchWeather(inputValue);
  });

// http://api.weatherapi.com/v1/forecast.json?key=bb101170b4d7467fb60130702252702&q=London&days=1&aqi=no&alerts=no

// http://api.weatherapi.com/v1/forecast.json?key=bb101170b4d7467fb60130702252702&q=London&days=7


function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

const logSearch = debounce((query) => console.log("Searching for:", query), 1000);
logSearch("London"); // This will be logged after 1 second if not called again
