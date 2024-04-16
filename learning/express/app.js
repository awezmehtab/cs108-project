const somethings = []

const express = require('express');
const app = express(); // instance of express application (it's a function imported from Express module
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
app.use(express.static('public'));

//Defining a route
app.get('/', (req, res) => {
    res.render('index', {message: messages.home, somethings: somethings});
});
app.get('/about', (req, res) => {
    res.send(messages.about);
});
app.get('/somethings', (req, res) => {
    res.send(somethings.join(', '))
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/submit', (req, res) => {
    const something = req.body.something;
    if(!something) {
        const error = new Error('something ain\'t given');
        return next(error);
    }
    somethings.push(something);
    console.log(`Something given: ${something}`);
    res.redirect('/');
});

// Starting a server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})

//Errors
app.use((req, res) => {
    res.status(404).send(messages.notFound);
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("kuch toh GALAT hai");
});
//using next to find errors