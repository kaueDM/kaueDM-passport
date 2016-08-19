'use strict';
const mongoose = require('mongoose');
const Model = (Schema, ModelName) => {
	
	return mongoose.model(ModelName, Schema);
};

module.exports = Model;