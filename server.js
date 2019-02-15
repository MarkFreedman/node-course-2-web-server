const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//     res.render('maint.hbs');
// });

app.use((req, res, next) => {
    var now = new Date().toString();
    var logLine = `${now}: ${req.method} ${req.url}`;

    console.log(logLine);

    fs.appendFile('server.log', logLine + '\n', (err) => {
        if (err) console.log(err);
    });

    next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to this great site!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error handling request.'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
