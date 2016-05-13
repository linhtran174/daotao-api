'use strict';

module.exports = function(model, utils) {

    var teachersCtrl = {};
    
    teachersCtrl.login = function (req, res, next) {
        model.findOne({ where: {teacher_email: req.body.email} })
            .then(function (user) {
                if (user == null) {
                    res.json("There is no user with this email!!!!");
                    return next();
                }
                utils.compare(req.body.password, user.get().teacher_pass, function(err, resq) {
                    console.log('DEBUG', err, resq);
                    if (resq)
                        res.json({"status" : "login success"});
                    else 
                        res.json({"status": "login fail"});
                })
            }, function(err) {
                return next(err);
            });
    }

    teachersCtrl.list = function (req, res, next) {
        model.findAll()
            .then(function (users) {
                res.json(users);  
            }, function(err) {
                return next(err);
            });
    };
    
    teachersCtrl.search = function(req, res, next) {
        console.log('DEBUG search query ', req.query);
        model.findAll({ where: req.query })
            .then(function (users) {
                res.json(users);  
            }, function(err) {
                return next(err);
            });
    }

    teachersCtrl.get = function (req, res, next) {
        model.findById(req.params.id)
            .then(function (user) {
                res.json(user);
            }, function(err) {
                return next(err);
            });
    };

    teachersCtrl.post = function (req, res, next) {
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

    teachersCtrl.put = function(req, res, next) {
        model.findById(req.params.id)
            .then(function (user) {
                if (user == null) 
                {
                    res.json("There is no user with this id!!");
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

    teachersCtrl.remove = function(req, res, next) {
        model.destroy({ where: { teacher_id: req.params.id } })
            .then(function(){
                res.json({id: req.params.id, message: 'delete completed'});
            }, function(err) {
                return next(err);
            })
    }
    
    return teachersCtrl;
}