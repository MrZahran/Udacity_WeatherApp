// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server Is Running On Port => ${port}`);
});

// POST ..
app.post("/add", receiveData); // From App To Server

function receiveData(req, res) {
  console.log("Receive Data From App");
  projectData = req.body;
}

// GET ..
app.get("/add", sendDataToApp); // From Server To App

function sendDataToApp(req, res) {
  console.log("Send Data To App");
  res.send(projectData);
}
