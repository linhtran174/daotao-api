'use strict';

var tokenGen = require('jsonwebtoken');

module.exports = function(model, utils) {

    var studentsCtrl = {};

    studentsCtrl.login = function(req, res, next) {
        console.log(req.body);
        model.findOne({ where: { stud_email: req.body.stud_email } })
            .then(function(user) {
                if (user) {
                    utils.compare(req.body.stud_pass, user.get().stud_pass, function(err, resq) {
                        console.log('DEBUG', err, resq);
                        if (resq)
                            res.status(200).json({
                                "status": "login successful",
                                "token": tokenGen.sign({ email: req.body.stud_email, role: "student"},
                                    "EdoSuperSecretKey",
                                    {expiresIn: "12h"})
                            });
                        else
                            res.status(401).json({ status: "401 login failed", message: "wrong password" });
                    })
                } else {
                    res.status(404).json({
                        status: "404 login failed",
                        message: "there is no user with this email"
                    });

                }

            }, function(err) {
                throw err
            });
    }

    studentsCtrl.list = function(req, res, next) {
        console.log('user: ', req.user);
        if (req.user && req.user.role == "student") {
            model.findAll()
                .then(function(users) {
                    res.status(200).json(users);
                }, function(err) {
                    res.status(400).json({ status: "400 bad request", message: err.message })
                    next(err);
                });
        } else {
            res.status(401).json({ status: "401 failed", message: "You do not have the right to access this resource" });
        }
    };

    studentsCtrl.search = function(req, res, next) {
        console.log('DEBUG search query ', req.query);
        if (req.user && req.user.role == "student") {
            model.findAll({ where: req.query })
                .then(function(users) {
                    if (users) res.json(users);
                    else res.status(404).json({ status: "success", message: "no users was found" })
                }, function(err) {
                    res.status(1000).json({ status: "failed, unknown error", message: err.message });
                    next(err);
                });
        } else {
            res.status(401).json({ status: "401 failed", message: "You do not have the right to access this resource" });
        }
    }

    studentsCtrl.get = function(req, res, next) {
        if (req.user && req.user.role == "student") {
            model.findById(req.params.id)
                .then(function(user) {
                    if (user) res.json(user);
                    else res.status(404).json({ status: "404 stud not found" });
                }, function(err) {
                    res.status(1000).json({ status: "1000 failed, unknown error", message: err.message });
                    next(err);
                });
        } else {
            res.status(401).json({ status: "401 failed", message: "You do not have the right to access this resource" });
        }
    };

    studentsCtrl.post = function(req, res, next) {
        model.findOne({ where: { stud_email: req.body.stud_email } })
            .then(function(user) {
                if (user) {
                    res.status(409).json({ status: "409 failed", message: "user already exists" });
                    next();
                }
                utils.encrypt(req.body.stud_pass, function(encrypt) {
                    req.body.stud_pass = encrypt;
                    console.log("encrypted password: " + encrypt);
                    model.create(req.body)
                        .then(function(user) {
                            res.json(user);
                        }, function(err) {
                            console.log(JSON.stringify(err));
                            res.json({ status: "failed", message: err.message });

                        });
                })
            });
        ///////////////////////////////
    };

    studentsCtrl.put = function(req, res, next) {
        if (req.user && req.user.role == "student") {
            model.findById(req.params.id)
                .then(function(user) {
                    if (!user) {
                        res.status(404).json({ status: "failed", message: "There is no user with this id!!" });
                        next();
                    }
                    user.update(req.body).then(function(newUser) {
                        res.status(200).json(newUser);
                    }, function(updateErr) {
                        res.status(1000).json({ status: "failed", message: updateErr.message });
                        next(updateErr);
                    })
                }, function(err) {
                    res.status(1000).json({ status: "failed", message: err.message })
                    next(err);
                });
        } else {
            res.status(401).json({ status: "401 failed", message: "You do not have the right to access this resource" });
        }
    }

    studentsCtrl.remove = function(req, res, next) {
        if (req.user && req.user.role == "student") {
            model.destroy({ where: { stud_id: req.params.id } })
                .then(function() {
                    res.status(200).json({ status: "success", id: req.params.id, message: 'delete completed' });
                }, function(err) {
                    res.status(1000).json({ status: "1000 failed, unknown error", message: err.message });
                    next(err);
                });
        } else {
            res.status(401).json({ status: "401 failed", message: "You do not have the right to access this resource" });
        }
    }

    return studentsCtrl;
}
