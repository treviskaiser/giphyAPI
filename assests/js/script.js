$(document).ready(function(){


var topics = ["lion","elephant","rhinoceros","giraffe","leopard","hippo","cheetah","zebra","hyena","warthog","gorilla","crocodile"];
var button = $("#buttons");
var gifRating = $(".ratings");
var appearGif = $(".gifs-appear-here");


createButtons();


/* dynamically creates buttons on the page based on the topics variable.
*/

function createButtons(){

button.empty();

for(var j = 0; j < topics.length; j++){

    var animalButton = $("<button>")
    animalButton.text(topics[j]);
    animalButton.attr("type","button");
    animalButton.attr("class","btn btn-success");
    animalButton.attr("data-value", topics[j]);
    button.append(animalButton);
    }
}



$("#buttons").on("click",".btn-success", function () {
    gifRating.empty();
    search(this);

});

/* API function */

function search(button){
    var animal = $(button).attr("data-value");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8zPWmJLmDzgqU1XyveHO0rSSvhVNRr3x&q="+ animal + "&limit=10&offset=0&lang=en";
    console.log(animal);
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
    var results = response.data;
    console.log(response);

    for (var i = 0; i < results.length; i++) {

        var imgDiv = $("<div>");
        imgDiv.addClass("img-"+[i]).addClass("style");
        imgDiv.attr("id", "rating-"+[i]);
        appearGif .prepend(imgDiv);

        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height_still.url);
        animalImage.attr("data-still",results[i].images.fixed_height_still.url);
        animalImage.attr("data-animate",results[i].images.fixed_height.url);
        animalImage.attr("data-state","still");
        animalImage.attr("class", "gif");
        $(".img-"+[i]).prepend(animalImage);

        var p = $("<p>");
        p.text("Rating: " + results[i].rating);
        $("#rating-"+[i]).prepend(p);
    }
         
    
    // still vs animate gif
    $(".gif").on("click", function(){
        var state = $(this).attr("data-state");
    
        if(state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
            
    });
});
}

$("#button-add").on("click",function(){
    var newTopic = $(".form-control").val();
    topics.push(newTopic);
    console.log(newTopic);
    // console.log(topics);
    createButtons();

});
});