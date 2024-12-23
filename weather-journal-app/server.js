// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();

// Start up an instance of app
/* Middleware*/
// Here we are configuring express to use body-parser as middleware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening() {
    console.log(`server running on localhost: ${port}`);
}

// GET route
app.get('/all', sendData);

function sendData(req, res) {
    res.send(projectData);
}

// POST route
app.post('/add', addData);

function addData(req, res) {
    const newEntry = {
        temp: req.body.temp,
        feel: req.body.feel,
        date: req.body.date
    };
    projectData = newEntry;
    res.send(projectData);
}
