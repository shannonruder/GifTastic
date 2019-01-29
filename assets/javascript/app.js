//   GEOMETRY GIPHY GAME

// array of 3d shapes
    var geoArray = ["Torus", "Sphere", "Cube", "Cylinder"];

// displaying buttons in the array
    function renderButtons() {

// emptying button panel
    console.log(geoArray);
      $(".imageRow1").empty();
      
   // Looping through the array of shapes
      for (var i = 0; i < geoArray.length; i++) {
      
    // loop thru array and dynamicaly create buttons for each element in the array.
      var button = $("<button>");
    // Adding a class of shape to our button
       button.addClass("shapeButton");
    // Adding a data-attribute
       button.attr("data-shape", geoArray[i]);
    // Providing the initial button text
       button.text(geoArray[i]);

    // Adding the button to the HTML
                $(".imageRow1").append(button);
      }//end for loop

    }//end renderButtons


         
    //event handler for user to add more buttons       

      $("#add-shape").on("click", function(event) {

	      event.preventDefault();
	  //get input from text box
	      var shape = $("#shape-input").val().trim();
	  //adding the text to the array in order to create the button 
	      geoArray.push(shape);
	      $("#shape-input").val("");

        renderButtons();
   }); //end function(event)


   //fetching gifs from api
      function fetchShapeGifs() {

          var shapeName = $(this).attr("data-shape");
          var shapeStr = shapeName.split(" ").join("+");

          var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=wFX7fXDX7F2JTsxBArz79RA9ok7MM45h&q=" +
             shapeStr + "&limit=10&&offset=0&rating=G&lang=en";
     // make AJAX call giphy api
          $.ajax({
            method: "GET",
            url: queryURL,
          }) .done(function(results) {
//get results from array
            console.log(results);
            var dataArray = results.data;

            	//create and display div elements for each one of the returned Gifs
  
            $(".imageRow2").empty();
          for (var i = 0; i < dataArray.length; i++) {

            var newDiv = $("<div>");
            newDiv.addClass("shapeGif");

            var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
           newDiv.append(newRating);

           var img = $("<img>");
           img.attr("src", dataArray[i].images.fixed_height_still.url);
            img.attr("data-still", dataArray[i].images.fixed_height_still.url);
           img.attr("data-animate", dataArray[i].images.fixed_height.url);
           img.attr("data-state", "still");
           newDiv.append(img);

                 // display new gifs on the top 
            $(".imageRow2").prepend(newDiv);

          }//end for loop

      });//end function result

    }//end fetchShapeGifs

    //animate still gifs and vice versa
function animateGifs() {
  
  var state = $(this).find("img").attr("data-state");

  if (state === "still") 
  {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } 
  else 
  {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }

}//end animateGifs

$(document).ready(function() {
  renderButtons();
});
//event handler to get gifs
$(document).on("click", ".shapeButton", fetchShapeGifs);
//event handler to animate and stop gifs
$(document).on("click", ".shapeGif", animateGifs);