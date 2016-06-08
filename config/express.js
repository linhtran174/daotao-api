var express = require('express')
  , os = require('os')
  , interfaces = os.networkInterfaces()
  , bodyParser  = require('body-parser')
  , addrs = [];

module.exports = function (app, config) {
 
  // Set app vars
  app.set('port', config.port);
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'ejs');  

  app.use(bodyParser.json());         
  app.use(bodyParser.urlencoded({     
        extended: true                  
  }));                    
  
  // CORS support
  app.all('*', function (req, res, next) {
    if (!req.get('Origin')) return next();
    // use "*" here to accept any origin
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, token');
    res.set('Access-Control-Allow-Credentials', 'true');
    // res.set('Access-Control-Allow-Max-Age', 3600);
    if ('OPTIONS' == req.method) return res.send(200);
    next();
  })
}