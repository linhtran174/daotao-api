var config   = require('./config');
var Sequelize = require('sequelize');
var express = require('express');
var utils = require('./app/lib/utils')(config);

var app = express();
var models = {};

var sequelize = new Sequelize(config.db, {});
models = utils.loadModels(sequelize);
require('./config/express')(app, config);
require('./config/routes')(app, utils, models);

app.listen(config.port, function () {
	console.log('Daotao API is listening on port ', config.port);
});

