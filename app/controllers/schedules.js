'use strict';

module.exports = function(model, utils) {

    var schedulesCtrl = {};

    schedulesCtrl.list = function (req, res, next) {
        model.findAll()
            .then(function (users) {
                res.json(users);  
            }, function(err) {
                return next(err);
            });
    };
    
    schedulesCtrl.search = function(req, res, next) {
        console.log('DEBUG search query ', req.query);
        model.findAll({ where: req.query })
            .then(function (users) {
                res.json(users);  
            }, function(err) {
                return next(err);
            });
    }

    schedulesCtrl.get = function (req, res, next) {
        model.findById(req.params.id)
            .then(function (user) {
                res.json(user);
            }, function(err) {
                return next(err);
            });
    };

    schedulesCtrl.post = function (req, res, next) {
        utils.encrypt(req.body.pass, function(encrypt) {
            req.body.pass = encrypt;
            model.create(req.body)
                .then(function (user) {
                    res.json(user);
                }, function(err) {
                    res.send('Some error happenned');
                    //return next(err); 
                });
        })
    };

    schedulesCtrl.put = function(req, res, next) {
        model.findById(req.params.id)
            .then(function (user) {
                if (user == null) 
                {
                    res.json("There is no schedules with this id!!");
                    return next();
                }
                user.update(req.body).then(function(newUser){
                    res.json(newUser);
                }, function(updateErr) {
                    return next(updateErr);
                })
            }, function(err) {
                return next(err);
            });
    }

    schedulesCtrl.remove = function(req, res, next) {

        teacher
        model.destroy({ where: { schedules_id: req.params.id } })
            .then(function(){
                res.json({id: req.params.id, message: 'delete completed'});
            }, function(err) {
                return next(err);
            })
    }
    
    return schedulesCtrl;
}