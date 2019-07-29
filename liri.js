require("dotenv").config();

var keys = require("./keys.js");

var axios = require('axios');
var Spotify = require('node-spotify-api');

//------ variables for user input -------------//

var selection = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

var spotify = new Spotify(keys.spotify)

//------------------------------------Building the if statements for SPOTIFY search----------------------------------//

if (selection === 'spotify-this-song') {

  if (!userInput) {
    spotify.search({ type: 'track', query: "The Sign" }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log("\nArtist: " + data.tracks.items[2].artists[0].name)
      console.log("Song: " + data.tracks.items[2].name)
      console.log("Link to song: " + data.tracks.items[2].external_urls.spotify)
      console.log("Album: " + data.tracks.items[2].album.name + "\n")
    })
  } else {
    //------------------------------------SPOTIFY SEARCH------------------------------------//

    spotify.search({ type: 'track', query: userInput }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      console.log("\nArtist: " + data.tracks.items[0].artists[0].name)
      console.log("Song: " + data.tracks.items[0].name)
      console.log("Link to song: " + data.tracks.items[0].external_urls.spotify)
      console.log("Album: " + data.tracks.items[0].album.name + "\n")
    });
  }
}


//------------------------------------Building the if statements for OMDB search----------------------------------//

if (selection === "movie-this") {

  //------------------------------------Start with no userInput------------------------------------//

  if (!userInput) {
    var queryURL = "http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy";
    axios.get(queryURL)
      .then(function (response) {
        console.log("\nTitle: " + response.data.Title)
        console.log("Year: " + response.data.Year)
        console.log("IMDB Rating: " + response.data.Ratings[0].Value)
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
        console.log("Country: " + response.data.Country)
        console.log("Language: " + response.data.Language)
        console.log("Plot: " + response.data.Plot)
        console.log("Actors: " + response.data.Actors + "\n")

      })
  } else {

    var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL)
      .then(function (response) {
        console.log("\nTitle: " + response.data.Title)
        console.log("Year: " + response.data.Year)
        console.log("IMDB Rating: " + response.data.Ratings[0].Value)
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
        console.log("Country: " + response.data.Country)
        console.log("Language: " + response.data.Language)
        console.log("Plot: " + response.data.Plot)
        console.log("Actors: " + response.data.Actors + "\n")
      })
  }
};

//------------------------------------integrate random text----------------------------------//

