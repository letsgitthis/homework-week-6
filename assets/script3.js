// let searchBar = "";

// This script appends an array of cities as buttons that will return weather data

// Initial array of cities
var cities = ["Austin", "New York City", "Chicago", "London"];

// Function for displaying movie data
function renderButtons() {

    // Deleting the city buttons prior to adding new city buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of cities
    for (var i = 0; i < cities.length; i++) {

        // Then dynamicaly generating buttons for each city in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("cities");
        // Adding a data-attribute with a value of the cities at index i
        a.attr("data-name", cities[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(cities[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-cities").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var cities = $("#cities-input").val().trim();
    // The movie from the textbox is then added to our array
    cities.push(cities);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();