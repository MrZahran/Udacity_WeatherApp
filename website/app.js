/* Global Variables */
const server = "http://127.0.0.1:3000";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// https://api.openweathermap.org/data/2.5/weather?zip=10001,&appid=adcec2ef179d2ae1989458d630737256&units=metric

const apiKey = "f71e0d43c5d18e17d00fb13d802b4573";
const toCelsius = "units=metric";

// Event listener to add function to existing HTML DOM element
const btn = document.querySelector("#generate");
btn.addEventListener("click", main);

/* Function called by event listener */
function main() {
  const zipCode = document.querySelector("#zip").value;
  const feelUser = document.querySelector("#feelings").value;
  const mainUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},&appid=${apiKey}&${toCelsius}`;

  apiData(mainUrl).then(function (data) {
    sendToServer(`${server}/add`, data);
    sendToSite().then(function (allData) {
      const city = allData.name;
      const temp = allData.main.temp;
      sendDataToSite(city, temp, feelUser);
    });
  });
}

// Get Data From Api
async function apiData(mainUrl) {
  try {
    var data = await fetch(mainUrl);
    var data = data.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

// Post Data To Server
async function sendToServer(url, postdata) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postdata),
    });
  } catch (error) {
    console.log(error);
  }
}

// Get Data From Server
async function sendToSite() {
  try {
    const request = await fetch(`${server}/add`);
    const allData = request.json();
    return allData;
  } catch (error) {
    console.log(error);
  }
}

function sendDataToSite(city, temp, feelUser) {
  document.getElementById("date").innerHTML = `Data: ${newDate}`;
  document.getElementById("temp").innerHTML = `${temp} &#8451;`;
  document.getElementById(
    "content"
  ).innerHTML = `Feeling ${feelUser} in ${city}`;
  // Show Result Box
  document.querySelector("div.entry").style.opacity = "1";
}
