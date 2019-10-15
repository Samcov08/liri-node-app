// read and set vars
require("dotenv").config();

// vars
// require allows you to use the packages installed
var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
// user inputs
var userCommands = process.argv[2];
var userInput = process.argv[3];
// console.log(process.argv);



function runLiri() {
    switch (userCommands) {
        case "concert-this":
            showConcertInfo();
            break;
        case "spotify-this-song":
            showSongInfo();
            break;
        case "movie-this":
            showMovieInfo();
            break;
        case "do-what-it-says":
            doIt();
            break;
        default:
            console.log("Invalid-Try again!")
    }
}

//working code for concert
function showConcertInfo() {
    // console.log("concert");
    var inpoint = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    axios.get(inpoint).then(function(data) {
        var bandData = data.data;
        // console.log(bandData);
        for (var i = 0; i < 5; i++) {
            var concert = bandData[i];
            var venue = concert.venue.name;
            var city = concert.venue.city;
            var country = concert.venue.country;
            var date = moment(concert.datetime).format("MM/DD/YYYY");
            console.log(venue, city, country, date);

        }
    })

}


// working code for movie 
function showMovieInfo() {
    if (userInput === undefined) {
        userInput = "Mr. Nobody"
        console.log("If you haven't watched Mr.Nobody then you should: http://www.imdb.com/title/tt0485947/");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&apikey=trilogy";
    axios.get(queryUrl).then(function(response) {

        var Title = ("Title: " + response.data.Title);
        var Year = ("Year of release: " + response.data.Year);
        var imbdRating = ("IMDB rating: " + response.data.imbdRating);
        var Rating = (response.data.Ratings[1].Source + " rating: " + response.data.Ratings[1].Value);
        var Country = ("Country: " + response.data.Country);
        var Language = ("Language: " + response.data.Language);
        var Plot = ("Plot: " + response.data.Plot);
        var Actors = ("Actors: " + response.data.Actors);
        console.log(Title, Year, imbdRating, Rating, Country, Language, Plot, Actors);


    });
};
runLiri();
// -----------------------------------------------------------------
// code for spotify 
// function showSongInfo() {
//     spotify.search({ type: 'track', query: userInput }, function(err, data) {
//         if (err) {
//             return console.log('Error occurred: ' + err);
//         }
//         console.log("song");
//     })
// }
// ------------------------------------------------------------------

// working code for do what it says 
function doIt() {
    console.log("Do it");
    fs.readFile("random.txt", "utf8", function(err, data) {
        var newCommand = data.split(",");
        userCommands = newCommand[0];
        userInput = newCommand[1];
        runLiri();
    })

}

runLiri();