// import modules
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

// creating an express "app"
const app = express();
const port = 3000;

// all the movies used by this server
const movies = [];

// setting view engine
app.set('view engine', 'ejs');

// middleware for parsing http request body
app.use(bodyParser.urlencoded({ extended: false }));

// requesting / (get)
app.get('/', (req, res) => {
    res.render('index', { movies: movies });
});

app.post('/submit', (req, res) => {
    const movieEntered = req.body.movieName;
    fs.readFile('imdb.json', 'utf8', (err, data) => {
        if(err) {
            console.log(err);
        }
        try {
            const imdb_data = JSON.parse(data);
            const movieData = imdb_data.find((m, index, array) => movieEntered.toLowerCase() === m.Title.toLowerCase());
            movies.push(movieData);
            // no need to check if something's wrong, i kept it in ejs file
            res.redirect('/'); 
        }
        catch {
            console.log('Sorry, something\'s wrong')
        }
    });
});

// my middleware to handle error
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('kuch GANDA sa GALAT hua hai');
});

// all requests taken from port 3000
app.listen(port, () => {
    console.log(`port ${port} ki request sun rahe hai bas`)
})