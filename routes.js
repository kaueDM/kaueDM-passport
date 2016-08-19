'use strict';

const routes = (app, passport) => {
	const isAuth = (req, res, next) => {
		if(req.isAuthenticated()) return next();
		res.redirect('/');
	};

	app.get('/', (req, res) => {
		res.render('index', {message: req.flash('message')} );
	});

	app.get('/login', (req, res) => {
		res.render('login', {message: req.flash('message')} );
	});

	app.post('/login', passport.authenticate('local-access', {
		 successRedirect: '/profile'
		,failureRedirect: '/'
		,failureFlash: true 
	}));

	app.get('/signup', (req, res) => {
		res.render('signup', {message: req.flash('message')} );
	});

	app.post('/signup', passport.authenticate('local-signup', {
		 successRedirect: '/profile'
		,failureRedirect: '/'
		,failureFlash: true
	}));

	app.get('/profile', isAuth, (req, res) => {
		res.render('profile', {data: req.email});
	});

	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};

module.exports = routes;