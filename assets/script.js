//api key
// needs the &appid= to work
const apiKey = "ca7d5beb3ae1753031e2f7307c9df1b8";

let date = new Date();
let currentHour = moment().hour();

// live time
$(document).ready(function () {
    function update() {
        $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
    }
    setInterval(update, 1000)

});