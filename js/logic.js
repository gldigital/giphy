$(document).ready(function () {
    
    var giphys = ["Payton Manning", "Michael Jordan", "Stephen Curry", "Conor McGregor"];

    function displayGif() {
        $("button").on("click", function() {
            var person = $(this).attr("data-person");
    
            // Constructing a URL to search Giphy for the name of the athlete
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                person + "&api_key=dc6zaTOxFJmzC&limit=10";
    
            // Performing our AJAX GET request
            $.ajax({
                url: queryURL,
                method: "GET"
                })
                .done(function(response) {
                // Storing an array of results in the results variable
                console.log(response);

                // Clearing out old gif searches.
                clearGif();

                var results = response.data;

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {
                    
                    var gifDiv = $("<div class='col-md-6 img-responsive'>");

                    var gifImage = response.data[i].images.fixed_height_still.url;
                    var gifAction = response.data[i].images.fixed_height.url;
                    
                    // Creating an element to hold the GIFs
                    var gifDisplay = $("<img>").attr({
                        "src": gifImage,
                        "data-still": gifImage,
                        "data-animate": gifAction,
                        "data-state": "still",
                        "class": "animatedGIF"
                        });

                     gifDiv.append(gifDisplay);

                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div with the class "item"
    
                    // Storing the result item's rating
                    var rating = results[i].rating;
    
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);
    
                    gifDiv.append(p);
    
                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gifs-appear-here").prepend(gifDiv);
                    }
                }
            });
        });
    }
    
    // Function for displaying gif data
    function renderButtons() {
        
        // Deleting the gifs prior to adding new gifs
        $("#buttons-view").empty();

        // Looping through the array of gifs
        for (var i = 0; i < giphys.length; i++) {

            // Then dynamicaly generating buttons for each gif in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of gif to our button
            a.addClass("gif");
            a.addClass("btn btn-success btn-block");
            // Adding a data-attribute
            a.attr("data-person", giphys[i]);
            // Providing the initial button text
            a.text(giphys[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }
    // Clearing gifs when clicked to another gif
    function clearGif(){
        $("#gifs-appear-here").empty();
    }

  // This function starts/stops GIFs on click
function changeState() {
    
      // Grab the data-state of clicked image
      var state = $(this).attr("data-state");
    
    //   Setting data state
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    
    }
     // This function handles events where a gif button is clicked
     $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gif = $("#gif-input").val().trim();

        // Adding gif from the textbox to our array
        giphys.push(gif);

        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "gif"
      $(document).on("click", ".gif", displayGif);

      // Add a click event listener to all elements with class "epicGIF"
      $(document).on("click", ".animatedGIF", changeState);
      
      // Calling the renderButtons function to display the intial buttons
      renderButtons();
      
      
});
