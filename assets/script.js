$(document).ready(function () {
    // live time clock
    function update() {
        $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }

    setInterval(update, 1000);
});

// This script will return data from API and push to DOM
const APIKey = "ca7d5beb3ae1753031e2f7307c9df1b8";

// Here we are building the URL we need to query the database
let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=" + APIkey;

// let input = cities - input;

// // We then created an AJAX call
// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function (response) {

//     // Create CODE HERE to Log the queryURL
//     console.log(queryURL);

//     // Create CODE HERE to log the resulting object
//     console.log(response);

//     // Create CODE HERE to calculate the temperature (converted from Kelvin)

//     // Create CODE HERE to transfer content to HTML
//     $('.city').html('<h1>' + response.name + ' Weather Details</h1>');
//     $('.wind').text('Wind Speed: ' + response.wind.speed);
//     $('.humidity').text("Humidity: " + response.main.humidity);

//     // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
//     var tempF = (response.main.temp - 273.15) * 1.8 + 32;

//     // Create CODE HERE to dump the temperature content into HTML
//     $('.temp').text('Temperature (K): ' + response.main.temp);
//     $('.tempF').text('Temperature (F): ' + response.main.tempF);

//     // console.log(windspeed);
//     // console.log(humidity);
//     // console.log(tempurature);

// });