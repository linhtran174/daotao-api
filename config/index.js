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
    db: 'mysql://hoangnm:root@128.199.91.28:3306/test',
  },

  production: {
    root: rootPath,
    app: {
      name: 'daotao-api'
    },
    port: port,
    db: 'mysql://hoangnm:root@128.199.91.28:3306/test',
  }
};

module.exports = config[env];
