require("dotenv").config();

var fs = require('fs')
var keys = require("./keys.js");

var axios = require('axios');
var Spotify = require('node-spotify-api');

//------ variables for user input -------------//

var selection = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

var spotify = new Spotify(keys.spotify)

//------------------------------------SPOTIFY Constructor------------------------------------//

var songSearch = function () {
  spotify.search({ type: 'track', query: userInput }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("\n//-----------------------------SONG-INFO---------------------------//")
    console.log("\nArtist: " + data.tracks.items[0].artists[0].name)
    console.log("Song: " + data.tracks.items[0].name)
    console.log("Link to song: " + data.tracks.items[0].external_urls.spotify)
    console.log("Album: " + data.tracks.items[0].album.name + "\n")
  });
}
//------------------------------------OMDB Constructor----------------------------------//
var movieSearch = function () {

  var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
  axios.get(queryURL)
    .then(function (response) {
      console.log("\n//-----------------------------MOVIE-INFO---------------------------//")
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
//------------------------------------Building the if statements for SPOTIFY search----------------------------------//

if (selection === 'spotify-this-song') {

  if (!userInput) {
    spotify.search({ type: 'track', query: "The Sign" }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      for(var i=0;i<data.tracks.items.length;i++)
      {
        if (data.tracks.items[i].artists[0].name==="Ace of Base"){
          console.log("\n//-----------------------------SONG-INFO---------------------------//")
          console.log("\nArtist: " + data.tracks.items[i].artists[0].name)
          console.log("Song: " + data.tracks.items[i].name)
          console.log("Link to song: " + data.tracks.items[i].external_urls.spotify)
          console.log("Album: " + data.tracks.items[i].album.name + "\n")
        }
      }
      
    })
  } else {
    songSearch();
  }
}


//------------------------------------Building the if statements for OMDB search----------------------------------//

if (selection === "movie-this") {

  //------------------------------------If/Else for Movie Search------------------------------------//

  if (!userInput) {
    userInput = 'Mr. Nobody';
    movieSearch();
  } else {
    movieSearch();
  }

};

//------------------------------------integrate random text----------------------------------//

if (!selection) {
  fs.readFile('./random.txt', 'utf8', function (err, data) {
    if (err) return console.log(err);
    var rdm = data.split(',');
    selection = rdm[0];
    userInput = rdm[1];
    songSearch();
  });
}