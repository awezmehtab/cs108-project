// import modules
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

// creating an express "app"
const app = express();
const port = 3001;

// all the movies used by this server.
// this contains an array of all movies, each movie is unstringified
const movies = [];

// setting view engine
app.set('view engine', 'ejs');

// middleware for parsing http request body
app.use(bodyParser.urlencoded({ extended: false }));

// requesting / (get)
app.get('/', (req, res) => {
    res.render('index', { movies: movies });
});

// when submitted, /submit, is used for post request
app.post('/submit', (req, res) => {
    //response received
    const movieEntered = req.body.movieName;

    // reading imdb.json
    fs.readFile('imdb.json', 'utf8', (err, data) => {
        if(err) {
            console.log(err);
        }
        try {
            const imdb_data = JSON.parse(data);
            // movieData contains arrays in string form, let's parse it first then push it to movies array
            const movieData = imdb_data.find((m, index, array) => movieEntered.toLowerCase() === m.Title.toLowerCase());

            // no need to check if something's wrong, i kept it in ejs file
            if(movieData) {
                movieData.Casts = movieData.Casts.replace(/'/g, '\"');
                movieData.Casts = JSON.parse(movieData.Casts);
                movieData.Directors = movieData.Directors.replace(/'/g, '\"');
                movieData.Directors = JSON.parse(movieData.Directors);
                movieData.Other_Ratings = movieData.Other_Ratings.replace(/'/g, '\"');
                movieData.Other_Ratings = JSON.parse(movieData.Other_Ratings);
                movieData.Genres = movieData.Genres.replace(/'/g, '\"');
                movieData.Genres = JSON.parse(movieData.Genres);
                movieData.Streaming_Platforms = movieData.Streaming_Platforms.replace(/'/g, '\"');
                movieData.Streaming_Platforms = JSON.parse(movieData.Streaming_Platforms);
            }

            movies.push(movieData);
            res.redirect('/'); 
        }
        catch(err) {
            console.log('Sorry, something\'s wrong:', err)
        }
    });
});

// my middleware to handle error
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('kuch GANDA sa GALAT hua hai: ' + err);
});

// all requests taken from port 3001
app.listen(port, () => {
    console.log(`port ${port} ki request sun rahe hai bas`)
})