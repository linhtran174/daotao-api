'use strict';

module.exports = function(model, utils) {

    var coursesCtrl = {};

    coursesCtrl.list = function(req, res, next) {
        model.findAll()
            .then(function(users) {
                res.json(users);
            }, function(err) {
                return next(err);
            });
    };

    coursesCtrl.search = function(req, res, next) {
        console.log('DEBUG search query ', req.query);
        model.findAll({ where: req.query })
            .then(function(users) {
                res.json(users);
            }, function(err) {
                return next(err);
            });
    }

    coursesCtrl.get = function(req, res, next) {
        console.log(req.params.id);
        model.findById(req.params.id)
            .then(function(user) {
                res.json(user);
            }, function(err) {
                return next(err);
            });
    };

    coursesCtrl.post = function(req, res, next) {
        console.log(req.body);
        model.create(req.body)
            .then(function(user) {
                res.json(user);
            }, function(err) {
                return next(err);
            });
    };

    coursesCtrl.put = function(req, res, next) {
        model.findById(req.params.id)
            .then(function(user) {
                user.update(req.body).then(function(newUser) {
                    res.json(newUser);
                }, function(updateErr) {
                    return next(updateErr);
                })
            }, function(err) {
                return next(err);
            });
    }

    coursesCtrl.remove = function(req, res, next) {
        model.destroy({ where: { course_id: req.params.id } })
            .then(function() {
                res.json({ id: req.params.id, message: 'delete completed' });
            }, function(err) {
                return next(err);
            })
    }

    return coursesCtrl;
}
