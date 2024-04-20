// import modules
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

// creating an express "app"
const app = express();
const port = 3002;

// all the movies used by this server.
// this contains an array of all movies, each movie is unstringified
const movies = [];
// storing all the movies in imdb.json
const movieData = []

// reading imdb.json
fs.readFile('imdb.json', 'utf8', (err, data) => {
    if(err) {
        console.log('error reading imdb.json ' + err);
    }
    try {
        const imdb_data = JSON.parse(data);
        imdb_data.forEach((m, index, array) => {
            // movieData contains arrays in string form, let's parse it first then push it to movies array
            m.Genres = m.Genres.replace(/'/g, '\"');
            m.Genres = JSON.parse(m.Genres);
            movieData.push(m);
        });
    }
    catch(err) {
        console.log('Sorry, something\'s wrong in parsing imdb.json :', err);
    }
});

// setting view engine
app.set('view engine', 'ejs');

// middleware for parsing http request body
app.use(bodyParser.urlencoded({ extended: false }));

// this a function which gives a list of top 5 suggested movies based on rated movies and ratings and movies data
function suggestingMovies(userRatedMovies, userRatings, movieData){
     // now let's get suggested movies data

     genresLiked = [] // all the genres user liked
     genreTotalRating = {} // total rating of each genre
     genreRating = {} // average rating of each genre
     genreNumbers = {} // number of movies corresponding to each genre
     genreWeights = {} // weight assigned to each genre, which is more if the genre occured more times

     // gathering all genres liked by user
     userRatedMovies.forEach((movie, index, array) => {
         movie.Genres.forEach((genre, index, array) => {
             if(genresLiked.indexOf(genre) === -1) {
                 genresLiked.push(genre);
             }
         });
     });

     // number of movies corresponding to each genre, minimum will be 1 ofcourse
     userRatedMovies.forEach((movie, index, array) => {
         movie.Genres.forEach((genre, index, array) => {
             if(genreNumbers[genre] === undefined) {
                 genreNumbers[genre] = 1;
             } else {
                 genreNumbers[genre]++;
             }
         });
     });

     // overall rating of each genre which is sum of ratings in each movie, which is then divided by number of movies corresponding to that genre
     userRatedMovies.forEach((movie, i, array) => {
         movie.Genres.forEach((genre, j, array) => {
             if(genreTotalRating[genre] === undefined) {
                 genreTotalRating[genre] = Number(userRatings[i]);
             } else {
                 genreTotalRating[genre] += Number(userRatings[i]);
             }
         });
     });

     // dividing by number of movies corresponding to that genre
     genresLiked.forEach((genre, index, array) => {
         genreRating[genre] = Number(genreTotalRating[genre])/Number(genreNumbers[genre]);
     });

     // weight assigned to each genre is proportional to the number of movies corresponding to that genre, and is between 0-1
     genresLiked.forEach((genre, index, array) => {
         genreWeights[genre] = Number(genreNumbers[genre])/userRatedMovies.length;
     });

     // Suggesting Movies!

     // what i'm thinking is to assign each movie a value, which is the sum of ratings of all genres of that movie, if rating isn't there, then 0
     // then i'll suggest movies which have the highest value

     suggestedMovies = []
     movieValues = []

     movieData.forEach((movie, i, array) => {
         movie.Genres.forEach((genre, j, array) => {
             if(genresLiked.indexOf(genre) !== -1) {
                 if(movieValues[i] === undefined) {
                     movieValues[i] = Number(genreRating[genre])*Number(genreWeights[genre]);
                 } else {
                     movieValues[i] += Number(genreRating[genre])*Number(genreWeights[genre]);
                 }
             }
         });
     });

     // suggestedMovies will contain the movies which have defined values
     movieValues.forEach((value, i, array) => {
         if(value !== undefined) {
             suggestedMovies.push(movieData[i]);
         }
     });

     // sorting suggestedMovies in descending order of values
     suggestedMovies.sort((a, b) => {
         return movieValues[movieData.indexOf(b)] - movieValues[movieData.indexOf(a)];
     });

     // removing movies which are already rated
     suggestedMovies = suggestedMovies.filter((movie, index, array) => {
         return userRatedMovies.findIndex(ratedMovie => ratedMovie.Title.toLowerCase() === movie.Title.toLowerCase()) === -1;
     });

     // only keeping the top 5 movies, according to movieValues
     suggestedMovies = suggestedMovies.slice(0, 5);

     return suggestedMovies;
}

// requesting / (get)
app.get('/', (req, res) => {
    const username = req.query.username ? req.query.username : '';

    // also giving rating by our users
    fs.readFile('users.json', 'utf8', (err, data) => {
        if(err) {
            console.log('Somethings wrong in reading users.json: ', err);
        }
        // if there are movies searched
        if (movies.length > 0 && movies[movies.length - 1]) {
            const myMovie = movies[movies.length - 1];
            let totalRating = 0;
            let totalCount = 0;
            let atleastOneFound = false;
            // now we've to loop through each user and if they've rated myMovie, we've to add their rating in totalRating and increment totalCount
            if(data) {
                data = JSON.parse(data);
                data.forEach((user, index, array) => {
                    console.log('user.ratedMovies: ', user.ratedMovies)
                    const myIndex = user.ratedMovies.findIndex(ratedMovie => ratedMovie.Title.toLowerCase() === myMovie.Title.toLowerCase());
                    if(myIndex !== -1) {
                        totalRating += Number(user.ratings[myIndex]);
                        totalCount++;
                        atleastOneFound = true;
                    }
                });
                userRating = (Math.round((Number(totalRating)/Number(totalCount)) * 10) / 10).toFixed(1);
            }
            else {
                userRating = '';
            }
            if (!atleastOneFound) {
                userRating = '';
            }
        }
        else {
            userRating = '';
        }
        res.render('index', { movies: movies, username: username, userRating: userRating})
    });  

//  res.render('index', { movies: movies, username: username, userReviews: userReviews});
});

// when submitted (searched), /submit, is used for post request
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
            const movieDataFound = imdb_data.find((m, index, array) => movieEntered.toLowerCase() === m.Title.toLowerCase());

            // no need to check if something's wrong, i kept it in ejs file
            if(movieDataFound) {
                movieDataFound.Casts = movieDataFound.Casts.replace(/'/g, '\"');
                movieDataFound.Casts = JSON.parse(movieDataFound.Casts);
                movieDataFound.Directors = movieDataFound.Directors.replace(/'/g, '\"');
                movieDataFound.Directors = JSON.parse(movieDataFound.Directors);
                movieDataFound.Other_Ratings = movieDataFound.Other_Ratings.replace(/'/g, '\"');
                movieDataFound.Other_Ratings = JSON.parse(movieDataFound.Other_Ratings);
                movieDataFound.Genres = movieDataFound.Genres.replace(/'/g, '\"');
                movieDataFound.Genres = JSON.parse(movieDataFound.Genres);
                movieDataFound.Streaming_Platforms = movieDataFound.Streaming_Platforms.replace(/'/g, '\"');
                movieDataFound.Streaming_Platforms = JSON.parse(movieDataFound.Streaming_Platforms);
            }

            movies.push(movieDataFound);

            if(req.query.username) {
                res.redirect('/?username=' + req.query.username);
            } else {
                res.redirect('/');
            } 
        }
        catch(err) {
            console.log('Sorry, something\'s wrong:', err)
        }
    });
});

ratedMovies = []
ratings = []


// GET request for /ratings
app.get('/ratings', (req, res) => {
    ratedMovies = [];
    ratings = [];
    warning = 0;
    res.render('ratings', { ratedMovies: ratedMovies, ratings: ratings, warning: warning, suggestedMovies: []});
});

// POST request for /ratings
app.post('/ratings', (req, res) => {
    const rating = req.body.rating;
    const movieName = req.body.movieName;
    const movie = movieData.find((m, index, array) => movieName.toLowerCase() === m.Title.toLowerCase());
    warning = 0;
    if(movie) {
        if (rating >= 0 && rating <= 10) {
            const index = ratedMovies.findIndex(ratedMovie => ratedMovie.Title.toLowerCase() === movie.Title.toLowerCase());
            if(index !== -1) {
                ratings[index] = rating;
            } else {
                ratedMovies.push(movie);
                ratings.push(rating);
            }
        }
        else {
            warning = 2; // 2 represents invalid rating
        };
    }
    else {
        warning = 1; // 1 represents movie not found
    };


    // now let's get suggested movies data
    suggestedMovies = suggestingMovies(ratedMovies, ratings, movieData);

    res.render('ratings', { ratedMovies: ratedMovies, ratings: ratings, warning: warning, suggestedMovies: suggestedMovies});
});

// POST request for /reset
// deleting ratedMovies and ratings
app.post('/reset', (req, res) => {
    ratedMovies = [];
    ratings = [];
    res.redirect('/ratings');
});

// GET request for /signup
app.get('/signup', (req, res) => {
    const username = req.query.username ? req.query.username : '';
    res.render('signup', {warning: 0, username: username});
});

// POST request for /signup
app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // i'm storing all the usernames and passwords and user information in users.json
    // checking if it's already there
    fs.readFile('users.json', 'utf8', (err, data) => {
        if(err) {
            console.log('Somethings wrong in reading users.json: ', err);
        }
        try {
            const userInfo = data ? JSON.parse(data) : [];
            const index = userInfo.findIndex(user => user.username === username);
            if(index === -1) {
                userInfo.push({username: username, password: password, ratedMovies: [], ratings: []});
                fs.writeFile('users.json', JSON.stringify(userInfo), (err) => {
                    if(err) {
                        console.log('Somethings wrong in writing users.json: ', err);
                    }
                });
                res.redirect(`/?username=${username}`);
            }
            else {
                console.log('User already exists');
                res.render('signup', {warning: 1, username: req.query.username ? req.query.username : ''});
            }
        }
        catch(err) {
            console.log('Sorry, something\'s wrong while parsing users.json:', err)
        }
    });
});

// GET request for /login
app.get('/login', (req, res) => {
    const username = req.query.username ? req.query.username : '';
    res.render('login', {warning: 0, username: username});
});

// POST request for /login
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
     
    // opening users.json   
    fs.readFile('users.json', 'utf8', (err, data) => {
        // checking if it was successful
        if(err) {
            console.log('Somethings wrong in reading users.json: ', err);
        }
        try {
            const userInfo = data ? JSON.parse(data) : [];
            const index = userInfo.findIndex(user => user.username === username);
            if(index !== -1 && userInfo[index].password === password) {
                res.redirect(`/?username=${username}`);
            }
            else {
                console.log('User doesn\'t exist or password is wrong');
                res.render('login', {warning: 1, username: username ? username : ''});
            }
        }
        catch(err) {
            console.log('Sorry, something\'s wrong while parsing users.json:', err)
        }
    });
});


// GET request for /userRatings
app.get('/userRatings', (req, res) => {
    const username = req.query.username;
    warning = 0;
    userRatedMovies = [];
    userRatings = [];
    // Suggesting movies for the user already
    fs.readFile('users.json', 'utf8', (err, data) => {
        if(err) {
            console.log('Somethings wrong in reading users.json: ', err);
        }
        try {
            data = data ? JSON.parse(data) : [];
            userRatedMovies = data.find(user => user.username === username).ratedMovies;
            userRatings = data.find(user => user.username === username).ratings;

            suggestedMovies = suggestingMovies(userRatedMovies, userRatings, movieData);

            res.render('userRatings', { ratedMovies: userRatedMovies, ratings: userRatings, warning: warning, suggestedMovies: suggestedMovies, username: username});
        }
        catch(err) {
            console.log('Sorry, something\'s wrong while parsing users.json:', err)
        }
    });
})

app.post('/userRatings', (req, res) => {
    const username = req.query.username;
    const rating  = req.body.rating;
    const movieName = req.body.movieName;
    const movie = movieData.find((m, index, array) => movieName.toLowerCase() === m.Title.toLowerCase());
    warning = 0;
    userRatedMovies = [];
    userRatings = [];
    
    // gathering whatever user has already rated
    fs.readFile('users.json', 'utf8', (err, data) => {
        data = data ? JSON.parse(data) : [];
        const index = data.findIndex(user => user.username === username);
        userRatedMovies = data[index].ratedMovies;
        userRatings = data[index].ratings;

        // if we found the movie entered by user
        if (movie) {
            // if the rating entered by user is also PROPER
            if (rating >= 0 && rating <= 10) {
                // when the user has already rated the movie before, we find it's index and change the rating
                if ( userRatedMovies.findIndex(x => x.Title.toLowerCase() === movie.Title.toLowerCase()) !== -1 ){
                    const index = userRatedMovies.findIndex(x => x.Title.toLowerCase() === movie.Title.toLowerCase());
                    userRatings[index] = rating;
                }
                // else we push this movie into the arrays of user
                else {
                    userRatedMovies.push(movie);
                    userRatings.push(rating);
                }

                // now we first update this data to users.json
                data[index].ratedMovies = userRatedMovies;
                data[index].ratings = userRatings;

                fs.writeFile('users.json', JSON.stringify(data), (err) => {
                    if(err) {
                        console.log('Somethings wrong in writing users.json: ', err);
                    }
                });

                // now let's get suggested movies data

                suggestedMovies = suggestingMovies(userRatedMovies, userRatings, movieData);

                res.render('userRatings', { ratedMovies: userRatedMovies, ratings: userRatings, warning: warning, suggestedMovies: suggestedMovies, username: username});
                
            }
            else {
                warning = 2; // 2 represents invalid rating

                // now let's get suggested movies data
                suggestedMovies = suggestingMovies(userRatedMovies, userRatings, movieData);
                res.render('userRatings', { ratedMovies: userRatedMovies, ratings: userRatings, warning: warning, suggestedMovies: suggestedMovies, username: username});
            }
        }
        else {
            warning = 1; // 1 represents movie not found

            // now let's get suggested movies data
            suggestedMovies = suggestingMovies(userRatedMovies, userRatings, movieData);
            res.render('userRatings', { ratedMovies: userRatedMovies, ratings: userRatings, warning: warning, suggestedMovies: suggestedMovies, username: username});

        };
    });
});

// GET request for /logout
app.get('/logout', (req, res) => {
    res.redirect('/');
});

// my middleware to handle error
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('kuch GANDA sa GALAT hua hai: ' + err);
});

// all requests taken from port 3002
app.listen(port, () => {
    console.log(`port ${port} ki request sun rahe hai bas`)
})