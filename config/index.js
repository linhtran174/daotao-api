var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development',
    port = 8081;

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'daotao-api'
    },
    port: port,
    db: 'mysql://hoangnm_daotao:daotao1234@115.84.179.142:3306/hoangnm_daotao',
  },
  
  production: {
    root: rootPath,
    app: {
      name: 'daotao-api'
    },
    port: port,
    db: 'mysql://hoangnm_daotao:daotao1234@115.84.179.142:3306/hoangnm_daotao',
  }
};

module.exports = config[env];
