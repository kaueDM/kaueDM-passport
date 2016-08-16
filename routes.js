'use strict';
const bcrypt   = require('bcrypt-nodejs');
const routes = (app, passport) => {
	app.get('/', (req, res) => {
		res.render('index', {message: req.flash('message')} );
	});

	app.get('/login', (req, res) => {
		res.render('login', {message: req.flash('message')} );
	});

	app.post('/login', (req, res) => {
		if(!req.body) return console.log('Requisição vazia');
			return console.log('Email: ' + req.body.email + ', Pass: ' + bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null));
	});	

	//Código que deveria receber o POST
	// app.post('/login', passport.authenticate('local-access', {
	// 	 successRedirect: '/profile'
	// 	,failureRedirect: '/'
	// 	,failureFlash: true 
	// }));

	app.get('/signup', (req, res) => {
		res.render('signup', {message: req.flash('message')} );
	});
};

module.exports = routes;