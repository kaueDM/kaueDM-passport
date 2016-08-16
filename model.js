'use strict';
const mongoose = require('mongoose');

const Model = (Schema, ModelName, CollectionName) => {
	
	return mongoose.model(ModelName, Schema, CollectionName);
};

module.exports = Model;