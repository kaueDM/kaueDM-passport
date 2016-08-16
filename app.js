'use strict';

const express  = require('express');
const session  = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash    = require('connect-flash');
const morgan   = require('morgan');

const db = require('./config/db');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
 		secret: 'minhaChaveSecreta'
 	   ,resave: false
 	   ,saveUninitialized: false  
	}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(morgan('dev'));

require('./config/passport')(passport);

const port = 8080;
const routes = require('./routes')(app, passport);
require('./server')(app, port, routes);
