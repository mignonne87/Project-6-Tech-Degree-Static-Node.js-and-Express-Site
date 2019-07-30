const express = require('express');  // add variable

const app = express();

const data = require("./data.json");

const path = require('path');

app.set ('view engine', 'pug');  // set view engine to pug

// app.set('views', path.join(__dirname, 'views'));
//specify Pug as the view engine for the app

//This is middleware to access the public folder via route /static
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, '/images/')));

// Set Routes
app.get('/', (req, res) => {
    res.render('index', {projects: data.projects});

});

app.get('/project', (req, res) => {
    let projectRoute = req.querty.id;
    res.render('project', {projects: data.projects[projectRoute]} );

});
app.get('/about', (req, res) => {
    res.render('about')
});


// Handle Errors
app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status || 500);
    console.log(err + '')
    res.send('error');
})
  app.listen(3000, () => {
  console.log('Application is running on localhost:3000!'); 
  });