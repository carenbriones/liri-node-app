require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var omdb = require("omdb");
var fs = require("fs");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var search = process.argv.slice(3).join(" ");

executeAction(action, search);

function concertThis(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                console.log("Date: " + response.data[i].datetime + "\n");
            }
        })
}

function spotifyThisSong(song) {
    spotify.search({
        type: "track",
        query: song,
        limit: 1
    }, function(err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        } else {
            console.log("\nArtist(s): " + data.tracks.items[0].artists[0].name);
            console.log("Song Title: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name + "\n");
        }
    })
}

function movieThis(movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
            function(response) {
                console.log("\nTitle: " + response.data.Title);
                console.log("Year Released: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.Ratings[0].Value);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country Produced: " + response.data.Country);
                console.log("Language: " + response.data.Country);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors + "\n");
            })
        .catch(function(error) { // Retrieved from Activity 17-OMDB_Axios in Unit 10
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // Split data by commas
        var dataArr = data.split(",");
        executeAction(dataArr[0], dataArr[1]);

    });
}

function executeAction(action, search) {
    switch (action) {
        case "concert-this":
            concertThis(search);
            break;
        case "spotify-this-song":
            spotifyThisSong(search);
            break;
        case "movie-this":
            // If user types in a movie to search, display the movie's info
            if (search) {
                movieThis(search);
            } else { // If user doesn't type in a movie, display info for Mr. Nobody
                movieThis("Mr. Nobody");
            }
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}