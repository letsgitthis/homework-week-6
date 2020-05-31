
let date = new Date();
let currentHour = moment().hour();

// live time
$(document).ready(function () {
    function update() {
        $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
    }
    setInterval(update, 1000)
    
});

// const image = $("<img>").attr(
//     "src",
//     "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

$(document).ready(function () {
    //api key
    // const apiKey = "ca7d5beb3ae1753031e2f7307c9df1b8";
    let vLon = 0;
    let vLat = 0;

    $("#searchBtn").click(function (event) {
        searchOpenWeather($(this).val());
    });

    $(document).on("click", ".citybtn", function (event) {
        searchOpenWeather($(this).val());
    });

    let browserHistory = JSON.parse(window.localStorage.getItem("history")) || [];
    // store search history as array
    for (let i = 0; i < browserHistory.length; i++) {
        createButton(browserHistory[i]);
    }

    $("#searchCity").keypress(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#searchBtn").click();
        }
    });
   
    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        // Storing the city name
        let weatherCity = $("#searchCity").val().trim();
        $("#searchCity").val("");
        searchOpenWeather(weatherCity);
    });

    // correct this
    function createButton(city) {
        let newButton = $("<button>").addClass("btn citybtn").text(city);
        newButton.val(city);
        $("#cityList").append(newButton);
    }

    function searchOpenWeather(city) {
        let APIKey = "ca7d5beb3ae1753031e2f7307c9df1b8";

        // Here we are building the URL we need to query the database
        let queryURL =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&appid=" +
            APIKey;

        console.log(queryURL);
        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET",
        })
            // We store all of the retrieved data inside of an object called "response"
            .then(function (response) {
                // if statement below prevents duplicate entries before populating the search history
                if (browserHistory.indexOf(city) === -1) {
                    browserHistory.push(city);
                    window.localStorage.setItem(
                        "history",
                        JSON.stringify(browserHistory)
                    );
                    window.location.reload();
                }

                // Transfer content to HTML
                $(".city").html("<h1>" + response.name + "    Weather Details</h1>");
                $(".wind").text("Wind Speed: " + response.wind.speed);
                $(".humidity").text("Humidity: " + response.main.humidity);

                // Convert the temp to fahrenheit
                var tempF = (response.main.temp - 273.15) * 1.8 + 32;

                // add temp content to html
                $(".temp").text("Temperature (K) " + response.main.temp);
                $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

                // Log the data in the console as well
                console.log("Wind Speed: " + response.wind.speed);
                console.log("Humidity: " + response.main.humidity);
                console.log("Temperature (F): " + tempF);
                vLon = response.coord.lon;
                vLat = response.coord.lat;
                searchOpenWeatherForecast(city);
                return vLat, vLon;
            });
    }

    function searchOpenWeatherForecast(city) {
        let APIKey = "ca7d5beb3ae1753031e2f7307c9df1b8";
        // query the database
        let queryURL =
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            city +
            "&appid=" +
            APIKey;

        console.log(queryURL);
        // AJAX call to OpenWeatherMap
        $.ajax({
            url: queryURL,
            method: "GET",
        })
            // store data as response
            .then(function (response) {

                $; // push to HTML
                for (let i = 0; i < 5; i++) {
                    console.log([i]);
                    $(".date" + [i]).text("Date " + response.list[i].dt_txt);
                    $(".wind" + [i]).text("Wind Speed: " + response.list[i].wind.speed);
                    $(".humidity" + [i]).text(
                        "Humidity: " + response.list[i].main.humidity
                    );

                    // Convert to fahrenheit
                    var tempF = (response.list[0].main.temp - 273.15) * 1.8 + 32;

                    // push to HTML
                    $(".temp2" + [i]).text(
                        "Temperature (K) " + response.list[i].main.temp
                    );
                    $(".tempF" + [i]).text("Temperature (F) " + tempF.toFixed(2));
                }
                console.log(vLat, vLon);
                searchOpenWeatherUV();
            });
    }
    function searchOpenWeatherUV() {
        let APIKey = "ca7d5beb3ae1753031e2f7307c9df1b8";
        // query the database
        let queryURL =
            "https://api.openweathermap.org/data/2.5/uvi?appid=" +
            APIKey +
            "&lat=" +
            vLat +
            "&lon=" +
            vLon;

        console.log(queryURL);
        // AJAX call for OpenWeather
        $.ajax({
            url: queryURL,
            method: "GET",
        })
            // store data as response
            .then(function (response) {
                // push to HTML
                $(".uvIndex").text("UV Index:" + response.value);
            });
    }
});