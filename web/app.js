// import modules
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { distance, closest } = require('fastest-levenshtein');

// creating an express "app"
const app = express();
const port = 3000;

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

// serving static files (css) from views/css directory
app.use(express.static(path.join(__dirname, 'css')));

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

// my function to calculate similarity between two words    
function my_distance(word1, word2) {
    if (word1.length < word2.length){
        let distances = [];
        for(let i = 0; i < word2.length - word1.length + 1; i++) {
            distances[i] = distance(word1, word2.slice(i, word1.length + i));
        }
       return Math.min(...distances);
    }
    else {
        return distance(word1, word2);
    }
}

function searchSuggest(movieEntered, movieData) {
    searchSuggestions = [];
    let sortedMovieData = [...movieData];
    sortedMovieData.sort((a, b) => my_distance(movieEntered, a.Title.toLowerCase()) - my_distance(movieEntered, b.Title.toLowerCase()));
    searchSuggestions = sortedMovieData.slice(0, 5);

    return searchSuggestions;
}

// requesting / (GET)
app.get('/', (req, res) => {
    const username = req.query.username ? req.query.username : '';
    searchSuggestions = [];
    outSideReviews = [];

    // RATING from our USERS
    fs.readFile('users.json', 'utf8', (err, data) => {
        if(err) {
            console.log('Somethings wrong in reading users.json: ', err);
        }
        let userInfo = data ? JSON.parse(data) : [];
        let ratedMovies = userInfo.find(user => user.username === username) ? userInfo.find(user => user.username === username).ratedMovies : [];
        let ratings = userInfo.find(user => user.username === username) ? userInfo.find(user => user.username === username).ratings : [];
        let suggestedMovies = suggestingMovies(ratedMovies, ratings, movieData);
        if (ratedMovies.length === 0) {
            const movieDataCopy = [...movieData];
            suggestedMovies = movieDataCopy.sort((a, b) => Number(b.Rating) - Number(a.Rating)).slice(0, 5);
        }
        // if there are movies searched
        if (movies.length > 0 && movies[movies.length - 1].Title !== 'Movie Not Found') {
            const myMovie = movies[movies.length - 1];
            let totalRating = 0;
            let totalCount = 0;
            let atleastOneFound = false;
            // now we've to loop through each user and if they've rated myMovie, we've to add their rating in totalRating and increment totalCount
            if(data) {
                data = JSON.parse(data);
                data.forEach((user, index, array) => {
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
            
            // if there was a movie found, we'll also send outSideReviews of it
            // for that we need to open ../dataExtraction/output.json
            fs.readFile('../dataExtraction/output.json', 'utf8', (err, data) => {
                if(err){
                    console.log("Error in reading output.json", err)
                    res.render('index', { movies: movies, username: username, userRating: userRating, searchSuggestions: searchSuggestions, outSideReviews: [], suggestedMovies: suggestedMovies});
                }
                else{
                    try {
                        reviews = JSON.parse(data)
                        foundMovie = reviews.find(m => m.Title == myMovie.Title)
                        outSideReviews = {"RottenTomatoes": foundMovie.RottenTomatoes, "Metacritic": foundMovie.Metacritic}
                    }
                    catch(err) {
                        console.log("Error in parsing data")
                    }
                    res.render('index', { movies: movies, username: username, userRating: userRating, searchSuggestions: searchSuggestions, outSideReviews: outSideReviews, suggestedMovies: suggestedMovies});
                }  
            })
            
        }
        // if the last movie searched is 'Movie Not Found', then we need to send search suggestions.
        else {
            if(movies.length > 0 && movies[movies.length - 1].Title === 'Movie Not Found') {
                searchSuggestions = [];
                const movieEntered = movies[movies.length - 1].Name;
                searchSuggestions = searchSuggest(movieEntered, movieData);
            }
            userRating = '';
            res.render('index', { movies: movies, username: username, userRating: userRating, searchSuggestions: searchSuggestions, outSideReviews: [], suggestedMovies: suggestedMovies});
        }
    });  

//  res.render('index', { movies: movies, username: username, userReviews: userReviews});
});

// GET request to /submit
app.get('/submit', (req, res) => {
    const movieEntered = req.query.movieName
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
                movies.push(movieDataFound);
            }
            else {
                movies.push({Title: 'Movie Not Found', Name: movieEntered, Genres: [], Directors: [], Casts: [], Other_Ratings: [], Streaming_Platforms: []});
            }
            console.log('we\'ve pushed this movie: ', `${movies[movies.length - 1].Title}, ${movies[movies.length - 1].Name}` ? `${movies[movies.length - 1].Title}, ${movies[movies.length - 1].Name}` : 'Movie Not Found');

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
})

// when submitted (searched), /submit, is used for post request
app.post('/submit', (req, res) => {
    //response received
    let movieEntered = req.body.movieName;

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
                movies.push(movieDataFound);
            }
            else {
                movies.push({Title: 'Movie Not Found', Name: movieEntered, Genres: [], Directors: [], Casts: [], Other_Ratings: [], Streaming_Platforms: []});
            }
            console.log('we\'ve pushed this movie: ', movies[movies.length - 1].Title);

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
        warning = searchSuggest(movieName, movieData); // 1 represents movie not found
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
                res.render('login', {warning: 1, username: req.query.username ? req.query.username : ''});
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
            warning = searchSuggest(movieName, movieData); // 1 represents movie not found
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
let newPort = port;
let serverStarted = false;

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started`);
    serverStarted = true;
});