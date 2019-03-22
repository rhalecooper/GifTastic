var gQueryApiKey = "dc6zaTOxFJmzC"

var gQueryRoot = "https://api.giphy.com/v1/gifs/search?api_key=" + gQueryApiKey + "&limit=3&q=";

var topicList = ["Bagpipes", "Hand Planes", "Space", "Frozen"];

showButtons();

$("#button-div").on("click", "button", onClickButton)




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
                    newImg.attr("src", ajaxData[i].images.fixed_height.url);
                    newImg.attr("height", "200px");

                    var newDiv = $("<div>");
                    newDiv.append(newP);
                    newDiv.append(newImg);

                    picDiv.prepend(newDiv);
                }
            }
        });
};


