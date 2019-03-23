var gQueryApiKey = "dc6zaTOxFJmzC"

var gQueryRoot = "https://api.giphy.com/v1/gifs/search?api_key=" + gQueryApiKey + "&limit=3&q=";

var topicList = ["Bagpipes", "Hand Planes", "Space", "Frozen"];

showButtons();

$("#button-div").on("click", "button", onClickButton)
$("#pic-div").on("click", "img", onClickPic)



function showButtons() {

    var buttobDiv = $("#button-div")
    buttobDiv.empty();

    // Looping through the array of movies
    for (var i = 0; i < topicList.length; i++) {

        var newButton = $("<button>");
        //newButton.addClass("movie");
        newButton.attr("data-topic", topicList[i]);
        newButton.text(topicList[i]);
        buttobDiv.append(newButton);
    }
}

function onClickButton() {

    console.log("onClickButton has been called");
    // console.log('"this" is', this)

    var thisButton = $(this)
    var topic = thisButton.attr("data-topic");
    var queryURL = gQueryRoot + topic
    var picDiv = $("#pic-div")


    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .then(function (response) {

            var ajaxData = response.data;
            picDiv.empty();
            for (var i = 0; i < ajaxData.length; i++) {
                // check for R and PG-13 ratings
                if (ajaxData[i].rating !== "r" && ajaxData[i].rating !== "pg-13") {

                    var newP = $("<p>").text("Rating: " + ajaxData[i].rating);

                    var newImg = $("<img>");
                    newImg.attr("src", ajaxData[i].images.original_still.url);
                    newImg.attr("height", "200px");
                    newImg.attr("data-still", ajaxData[i].images.original_still.url);
                    newImg.attr("data-animate", ajaxData[i].images.original.url);
                    newImg.attr("data-state", "still");

                    var ajaxDataImages = ajaxData[i].images
                    console.log ("ajaxDataImages",ajaxDataImages)

                    // <img
                    // src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif"
                    // data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif"
                    // data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif"
                    // data-state="still"
                    // class="gif"
              

                    var newDiv = $("<div>");
                    newDiv.append(newP);
                    newDiv.append(newImg);

                    picDiv.prepend(newDiv);
                }
            }
        });
};



function onClickPic () {

    console.log ("onClickPic was called")

    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  };


