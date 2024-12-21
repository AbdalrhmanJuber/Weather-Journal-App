/* Global Variables */
// Personal API Key for OpenWeatherMap API

const apiKey = '791c8e632c2da4fd704d6fb54c951d9a&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener for the generate button
document.getElementById('generate').addEventListener('click', async () => {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    try {
        const weatherData = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`);
        const weather = await weatherData.json();
        if (weather.main && weather.main.temp) {
            await postData('/add', { temp: weather.main.temp, feel: feelings, date: new Date().toLocaleDateString() });
            retrieveData();
        } else {
            console.log('Weather data is not available');
        }
    } catch (error) {
        console.log('error', error);
        // appropriately handle the error
    }
});

// Function to fetch data from the server
const retrieveData = async () => {
    const request = await fetch('http://localhost:3000/all');

    try {
        // Transform into JSON
        const allData = await request.json();
        console.log(allData);
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById('date').innerHTML = allData.date;
    } catch (error) {
        console.log('error', error);
        // appropriately handle the error
    }
};

// Function to post data to the server
const postData = async (url = '', data = {}) => {
    const response = await fetch(`http://localhost:3000${url}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
        // appropriately handle the error
    }
};
