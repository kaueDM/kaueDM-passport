'use strict';
const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/passport';

mongoose.connect(dbURI);
mongoose.connection.on('connected'   , () => { console.log('[CONEXÃO INICIADA]>  ' + dbURI) });
mongoose.connection.on('error'       , () => { console.log('[ERRO NA CONEXÃO]> ' + dbURI) });
mongoose.connection.on('disconnected', () => { console.log('== [CONEXÃO FINALIZADA] ==') });
mongoose.connection.on('connected'   , () => { console.log('-- [CONEXÃO ABERTA AO MONGODB] --') });

process.on('SIGINT', () => {
	mongoose.connection.close( () => {
		console.log('[CONEXÃO FECHADA - INTERRUPÇÃO DO APLICATIVO]');
		process.exit(0);
	});
});