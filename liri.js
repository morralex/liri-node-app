require("dotenv").config();

var keys = require("./keys.js");

var axios = require('axios');
var Spotify = require('node-spotify-api');

//------ variables for user input -------------//

// var selection = process.argv[2];
var userInput = process.argv.slice(2).join(" ");


// lets get the Spotify from the npm documentation ----------------//


var spotify = new Spotify(keys.spotify)

spotify.search({ type: 'track', query: userInput }, function (err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
console.log(data)
});

// Lets get search for a movie with the OMDB API key

// var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
//  axios.get(queryURL)