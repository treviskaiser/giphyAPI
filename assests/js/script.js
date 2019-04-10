$(document).ready(function(){

var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "turtle", "chinchilla", "hedgehog", "hermit crab", "chicken", "bear", "cow", "kangaroo"];
var button = $("#buttons");
var gifDiv = $("<div>");
var appear = $("#gifs-appear-here");
createButtons();

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
    gifDiv.empty();
    search(this);

});

function search(button){
    var animal = $(button).attr("data-value");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8zPWmJLmDzgqU1XyveHO0rSSvhVNRr3x&q="+ animal + "&limit=10&offset=0&rating=G&lang=en";
    // console.log(animal);
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
    var results = response.data;
    console.log(response);

    for (var i = 0; i < results.length; i++) {
        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height_still.url);
        animalImage.attr("data-still",results[i].images.fixed_height_still.url);
        animalImage.attr("data-animate",results[i].images.fixed_height.url);
        animalImage.attr("data-state","still");
        animalImage.attr("class", "gif")
    

        // gifDiv.prepend(p);
        gifDiv.prepend(animalImage);
        appear.prepend(gifDiv);
    }
           
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