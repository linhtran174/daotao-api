'use strict';

module.exports = function(model, utils) {

    var classroomsCtrl = {};
    
    
    classroomsCtrl.list = function (req, res, next) {
        model.findAll()
            .then(function (users) {
                res.status(200).json({count: users.length,list:users});  
            }, function(err) {
                return next(err);
            });
    };
    
    classroomsCtrl.search = function(req, res, next) {
        console.log('DEBUG search query ', req.query);
        model.findAll({ where: req.query })
            .then(function (users) {
                res.json(users);  
            }, function(err) {
                return next(err);
            });
    }

    classroomsCtrl.get = function (req, res, next) {
        model.findById(req.params.id)
            .then(function (user) {
                res.json(user);
            }, function(err) {
                return next(err);
            });
    };

    classroomsCtrl.post = function (req, res, next) {
        utils.encrypt(req.body.pass, function(encrypt) {
            req.body.pass = encrypt;
            model.create(req.body)
                .then(function (user) {
                    res.json(user);
                }, function(err) {
                    res.send('Some error happenned');
                    return next(err); 
                });
        })
    };

    classroomsCtrl.put = function(req, res, next) {
        model.findById(req.params.id)
            .then(function (user) {
                if (user == null) 
                {
                    res.json("There is no entry match this id!!");
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

    classroomsCtrl.remove = function(req, res, next) {

        teacher
        model.destroy({ where: { class_id: req.params.id } })
            .then(function(){
                res.json({id: req.params.id, message: 'delete completed'});
            }, function(err) {
                return next(err);
            })
    }
    
    return classroomsCtrl;
}