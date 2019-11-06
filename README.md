# News-app

This news apps scrapes the XXX website and saves the articles in a database. 

This application is a node LIRI Bot (Language Interpretation and Recognition Interface). The LIRI Bot is a command line node app that accepts parameters and provides the user back data. It searches for Spotify for songs, Bands in Town for concerts, and OMDB for movies. To retrieve the data that powers this app, requests were sent using the axios package. 

The challenge the app solves is pulling the data so that the user would be able to find current concert information on bands as well as background/historical information on movies and songs. 

The liri.js is the main file for the app. The package.json file shows the app's dependencies. The spotify values (ID and secret) are in the dotenv file. There is a keys file to interact with the environment variables stored in the dotenv file. The keys file is the main point for pulling the secrets and gives access to the API keys inside of node app. Separate functions that take in separate values were created for concert-this, movie-this, and spotify-this-song. Moment is used to help format the date. 

The app is run by typing in the command node liri.js plus the parameter (concert-this, spotify-this song, or movie-this)along with the name of the artist for concerts, movie, or song in quotes. The command is typed in the terminal. 

Technologies used in the app include: Node, Moment, Spotify API, Javascript, Axios

My role was writing the code for the app. Links to screen shots showing the app is working are below.
