'use strict';

module.exports = function(model, utils) {

    var usersCtrl = {};

    usersCtrl.list = function (req, res, next) {
        model.findAll()
            .then(function (users) {
                res.json(users);  
            }, function(err) {
                return next(err);
            });
    };
    
    usersCtrl.search = function(req, res, next) {
        console.log('DEBUG search query ', req.query);
        model.findAll({ where: req.query })
            .then(function (users) {
                res.json(users);  
            }, function(err) {
                return next(err);
            });
    }

    usersCtrl.get = function (req, res, next) {
        model.findById(req.params.id)
            .then(function (user) {
                res.json(user);
            }, function(err) {
                return next(err);
            });
    };

    usersCtrl.post = function (req, res, next) {
        utils.encrypt(req.body.pass, function(encrypt) {
            req.body.pass = encrypt;
            model.create(req.body)
                .then(function (user) {
                    res.json(user);
                }, function(err) {
                    return next(err); 
                });
        })
    };

    usersCtrl.put = function(req, res, next) {
        model.findById(req.params.id)
            .then(function (user) {
                user.update(req.body).then(function(newUser){
                    res.json(newUser);
                }, function(updateErr) {
                    return next(updateErr);
                })
            }, function(err) {
                return next(err);
            });
    }

    usersCtrl.remove = function(req, res, next) {
        model.destroy({ where: { id: req.params.id } })
            .then(function(){
                res.json({id: req.params.id, message: 'delete completed'});
            }, function(err) {
                return handleError(err);
            })
    }
    
    return usersCtrl;
}