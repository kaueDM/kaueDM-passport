'use strict';

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const Schema = require('../schema');
const UserModel = require('../model')(Schema, 'User');

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
		UserModel.findOne({'local.email': email}, (err, data) => {
			if(err) return done(err);
			if(!data) return done(null, false);
			if (!data.passwordValidation(password)) return done(null, false); 
			return done(null, data);
		});
	}));

	passport.use('local-signup', new LocalStrategy({
		 usernameField: 'email'
		,passwordField: 'password'
		,passReqToCallback: true
	}, (req, email, password, done) => {
		UserModel.findOne({'email': email}, (err, data) => {
			if(err) return done(err);
			if(data){
				console.log('Email em uso');
				return done(null, false, req.flash('message', 'Email em uso'));
			} else {
				let newUser = new UserModel();
				newUser.local.email = email;
				newUser.local.password = newUser.generateHash(password);
				console.log(newUser.local.email + ' | ' + newUser.local.password)
				newUser.save((err) => {
					if(err) throw err;
					return done(null, newUser);
				});
			}
		});
	}));

};

module.exports = AccessStrategies;