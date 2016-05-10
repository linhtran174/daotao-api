var config   = require('./config');
var Sequelize = require('sequelize');
var express = require('express');
var utils = require('./app/lib/utils')(config);

var app = express();

// var hash = '$2a$10$/iZvKzhwPOdE5/ojgh3WvOUpAFDTRx7pS64g2G5.yiID6G0.76wGC';
// var pass = 'test';
// utils.compare(pass, hash, function(err, res) {
// 	console.log('DEBUG ', err, res);
// })
// utils.encrypt('test', function(pass) {
// 	console.log(pass);
// })

var models = {};

var sequelize = new Sequelize(config.db, {});
models = utils.loadModels(sequelize);
require('./config/express')(app, config);
require('./config/routes')(app, utils, models);

app.listen(config.port, function () {
	console.log('Daotao API is listening on port ', config.port);
});

