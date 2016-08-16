'use strict';
const server = (app, port, routes) => {
	app.listen(port);
	console.log('[SERVIDOR INICIADO]> porta ', port);
};

module.exports = server;