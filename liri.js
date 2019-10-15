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

//working code
function showConcertInfo() {
    // console.log("concert");
    var inpoint = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    axios.get(inpoint).then(function(data) {
        var bandData = data.data
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



function showMovieInfo() {
    var inpoint = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    axios.get(inpoint).then(function(data) {
                if (userInput === undefined) userInput = "Mr. Nobody"
                var movieData = data.data
                console.log(movieData);
                // for (var i = 0; i < 5; i++) {
                //     var title = movieData[i];
                //         var year = concert.venue.name;
                //         var rating = concert.venue.city;
                //         var rottonRating = concert.venue.country;
                //         var country = ;
                //         var language = ;
                //         var plot = ;
                //         var actors = ;
                //         console.log(title, year, rating, rottonRating, country, language, plot, actors);

                //     }


                //     console.log(data);

                // };


                // function showSongInfo() {
                //     spotify.search({ type: 'track', query: userInput }, function(err, data) {
                //         if (err) {
                //             return console.log('Error occurred: ' + err);
                //         }
                //         console.log("song");
                //     })
                // }
                // working code
                function doIt() {
                    // console.log("Do it");
                    fs.readFile("random.txt", "utf8", function(err, data) {
                        var newCommand = data.split(",");
                        userCommands = newCommand[0];
                        userInput = newCommand[1];
                        runLiri();
                    })

                }

                runLiri();