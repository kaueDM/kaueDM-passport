'use strict'
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const Schema   = mongoose.Schema;

const schemaStructure  = {
		 local     : {
		 	 email    : { type: String }
		 	,password : { type: String }
		 }
		,facebook  : {
			 id       : { type: String }
			,token    : { type: String }
			,email    : { type: String }
			,name     : { type: String }
		}
		,createdAt : { type: Date, default: Date.now }
	};

const _schema = new Schema(schemaStructure);

	_schema.methods.generateHash = (password) => {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	_schema.methods.passwordValidation = (password) => {
		return bcrypt.compareSync(password, this.local.password);
	};

module.exports = _schema;