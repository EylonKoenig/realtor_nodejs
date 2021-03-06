var express = require('express');
var fileUpload = require('express-fileupload');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var imagesRouter = require('./routes/images');
var usersRouter = require('./routes/users');
var apartmentsRouter = require('./routes/apartments');
var countriesRouter = require('./routes/countries');
var citiesRouter = require('./routes/cities');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var cors = require('cors');
var sslRedirect = require('heroku-ssl-redirect');

var app = express();


app.use(cors({ credentials: true, origin: ['https://koenigrealestate.netlify.com', 'http://localhost:3000', 'https://koenigrealestate.herokuapp.com','https://koenigrealestate.netlify.app'] }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(sslRedirect());



var corsMiddleware = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.header.origin);
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

    next();
}



app.use('/users', usersRouter);
app.use('/apartments', apartmentsRouter);
app.use('/countries', countriesRouter);
app.use('/cities', citiesRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter)
app.use('/images', imagesRouter);



app.use(corsMiddleware);

app.listen(process.env.PORT)
module.exports = app;