'use strict';

var tokenGen = require('jsonwebtoken');

module.exports = function(model, utils) {

    var teachersCtrl = {};


    teachersCtrl.login = function(req, res, next) {
        console.log(req.body);
        model.findOne({ where: { teacher_email: req.body.teacher_email } })
            .then(function(user) {
                console.log(user, user==null, user==undefined);
                if (user) {

                    console.log(user.get());
                    console.log(req.body.teacher_pass, user.get().teacher_pass);
                    utils.compare(req.body.teacher_pass, user.get().teacher_pass, function(err, resq) {
                        console.log('DEBUG', err, resq);
                        if (resq)
                            res.status(200).json({
                                "status": "login success",
                                "token": tokenGen.sign({ email: req.body.teacher_email }, "EdoSuperSecretKey")
                            });
                        else
                            res.json({ "status": "login fail" });
                    })
                } else {

                    res.status(404).json("There is no user with this email!!!!");


                }

            }, function(err) {
                return next(err);
            });
    }

    teachersCtrl.list = function(req, res, next) {
        model.findAll()
            .then(function(users) {
                res.json(users);
            }, function(err) {
                return next(err);
            });
    };

    teachersCtrl.search = function(req, res, next) {
        console.log('DEBUG search query ', req.query);
        model.findAll({ where: req.query })
            .then(function(users) {
                res.json(users);
            }, function(err) {
                return next(err);
            });
    }

    teachersCtrl.get = function(req, res, next) {
        model.findById(req.params.id)
            .then(function(user) {
                res.json(user);
            }, function(err) {
                return next(err);
            });
    };

    teachersCtrl.post = function(req, res, next) {
        model.findOne({ where: { teacher_email: req.body.teacher_email } })
            .then(function(user) {
                if (user) {
                    res.send("user already exists");
                    return next();
                }
                utils.encrypt(req.body.teacher_pass, function(encrypt) {
                    req.body.teacher_pass = encrypt;
                    console.log("encrypted password: " + encrypt);
                    model.create(req.body)
                        .then(function(user) {
                            res.json(user);
                        }, function(err) {
                            throw err;
                            res.send('Some error happenned');

                        });
                })
            });
        ///////////////////////////////

    };

    teachersCtrl.put = function(req, res, next) {
        model.findById(req.params.id)
            .then(function(user) {
                if (!user) {
                    res.json("There is no user with this id!!");
                    return next();
                }
                user.update(req.body).then(function(newUser) {
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
            .then(function() {
                res.json({ id: req.params.id, message: 'delete completed' });
            }, function(err) {
                res.json({ status: "some error happened, please check your data again" });
                return next(err);
            })
    }

    return teachersCtrl;
}
