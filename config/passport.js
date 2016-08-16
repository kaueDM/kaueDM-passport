'use strict';
const LocalStrategy = require('passport-local').Strategy;
const Schema = require('../schema');
const UserModel = require('../model')(Schema, 'User', 'Users');

const AccessStrategies = (passport) => {

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		UserModel.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use('local-access', new LocalStrategy({
		 usernameField: 'email' //Override
		,passwordField: 'password' //Override
		,passReqToCallback: true
	}, (req, email, password, done) => {
		UserModel.findOne({'email': email}, (err, data) => {
			if(err) return done(err);
			
			if(!data){ 
				console.log('Email não cadastrado');
				return done(null, false, req.flash('message', 'Email não encontrado'));
			}

			if(!data.passwordValidation(password)){
				console.log('Senha inválida');
				return done(null, false, req.flash('message', 'Senha inválida'));
			}

			return done(null, data);
		});

	}));
};

module.exports = AccessStrategies;