module.exports = function(config) {

	var fs = require('fs');
	var obj = {};
    
    obj.queryToJson = function(str) {
        if (typeof str !== 'string') {
            return {};
        }

        str = str.trim().replace(/^(\?|#|&)/, '');

        if (!str) {
            return {};
        }
        
        return str.split('&').reduce(function (ret, param) {
            var parts = param.replace(/\+/g, ' ').split('=');
            var key = parts.shift();
            var val = parts.length > 0 ? parts.join('=') : undefined;

            key = decodeURIComponent(key);

            val = val === undefined ? null : decodeURIComponent(val);

            if (!ret.hasOwnProperty(key)) {
                ret[key] = val;
            } else if (Array.isArray(ret[key])) {
                ret[key].push(val);
            } else {
                ret[key] = [ret[key], val];
            }

            return ret;
        }, {});
    }

	obj.getModelNames = function() {
		var names = [];
		var modelsPath = config.root + '/app/models';
		fs.readdirSync(modelsPath).forEach(function(file) {
			names.push(file.replace('.js', ''));
		});
	  	return names;
	}

	obj.loadModels = function(mongoose) {
		// config mongoose models
		var models = {};
		var modelsPath = config.root + '/app/models';
		fs.readdirSync(modelsPath).forEach(function (file) {
		    if (file.indexOf('.js') >= 0) {
		    	models[file.replace('.js', '')] = require(modelsPath + '/' + file)(mongoose);
		    	console.log('Loaded: ' + file.replace('.js', '') + ' model.');
		    }
	  	})
	  	return models;
	}

	obj.loadControllers = function(models) {
		var ctrls = {};
		var ctrlsPath = config.root + '/app/controllers';
		fs.readdirSync(ctrlsPath).forEach(function (file) {
		    if (file.indexOf('.js') >= 0) {
		    	ctrls[file.replace('.js', '')] = require(ctrlsPath + '/' + file)(models[file.replace('.js', '')]);
		    	console.log('Loaded: ' + file.replace('.js', '') + ' controllers.');
		    }
	  	})
	  	return ctrls;
	}

	return obj;

}