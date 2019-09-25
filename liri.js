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

// Appends command to log.txt to make data easier to read
appendToFile(action + " " + search + "\n");
executeAction(action, search);

function concertThis(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                // Obtains all required data
                var venueStr = "Venue: " + response.data[i].venue.name;
                var locationStr = "Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region;
                var dateStr = "Date: " + response.data[i].datetime + "\n";

                // Logs data to console
                console.log(venueStr);
                console.log(locationStr);
                console.log(dateStr);

                // Appends data to log.txt
                appendToFile(venueStr + "\n" + locationStr + "\n" + dateStr + "\n");
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
            // Obtains all required data
            var artistStr = "Artist(s): " + data.tracks.items[0].artists[0].name;
            var songTitleStr = "Song Title: " + data.tracks.items[0].name;
            var previewLinkStr = "Preview Link: " + data.tracks.items[0].preview_url;
            var albumStr = "Album: " + data.tracks.items[0].album.name;

            // Logs all data to console
            console.log(artistStr);
            console.log(songTitleStr);
            console.log(previewLinkStr);
            console.log(albumStr);

            // Appends data to log.txt
            appendToFile(artistStr + "\n" + songTitleStr + "\n" + previewLinkStr + "\n" + albumStr + "\n\n");
        }
    })
}

function movieThis(movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
            function(response) {
                // Obtains all required data
                var titleStr = "Title: " + response.data.Title;
                var yearReleasedString = "Year Released: " + response.data.Year;
                var IMDBStr = "IMDB Rating: " + response.data.Ratings[0].Value;
                var rottenTomatoesStr = "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value;
                var countryStr = "Country Produced: " + response.data.Country;
                var languageStr = "Language: " + response.data.Language;
                var plotStr = "Plot: " + response.data.Plot;
                var actorsStr = "Actors: " + response.data.Actors + "\n";

                // Logs all data to console
                console.log(titleStr);
                console.log(yearReleasedString);
                console.log(IMDBStr);
                console.log(rottenTomatoesStr);
                console.log(countryStr);
                console.log(languageStr);
                console.log(plotStr);
                console.log(actorsStr);

                // Appends data to log.txt
                appendToFile(titleStr + "\n" + yearReleasedString + "\n" + IMDBStr + "\n" + rottenTomatoesStr + "\n" +
                    countryStr + "\n" + languageStr + "\n" + plotStr + "\n" + actorsStr + "\n");
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

function appendToFile(text) {
    fs.appendFile("log.txt", text, function(err) {
        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        }
    });
}