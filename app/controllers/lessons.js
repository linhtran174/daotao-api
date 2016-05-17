'use strict';

module.exports = function(model, utils) {

    var lessonsCtrl = {};

    lessonsCtrl.list = function(req, res, next) {
        model.findAll()
            .then(function(lessons) {
                res.json(lessons);
            }, function(err) {
                return next(err);
            });
    };

    lessonsCtrl.search = function(req, res, next) {
        console.log('DEBUG search query ', req.query);
        model.findAll({ where: req.query })
            .then(function(lessons) {
                res.json(lessons);
            }, function(err) {
                return next(err);
            });
    }

    lessonsCtrl.get = function(req, res, next) {
        console.log(req.params.id);
        model.findById(req.params.id)
            .then(function(lessons) {
                res.json(lessons);
            }, function(err) {
                return next(err);
            });
    };

    lessonsCtrl.post = function(req, res, next) {
        console.log(req.body);
        model.create(req.body)
            .then(function(lessons) {
                res.json(lessons);
            }, function(err) {
                return next(err);
            });
    };

    lessonsCtrl.put = function(req, res, next) {
        model.findById(req.params.id)
            .then(function(lessons) {
                if(lessons == null){
                    res.json("404 lessons not define");
                    return next();
                }
                lessons.update(req.body).then(function(newlessons) {
                    res.json(newlessons);
                }, function(updateErr) {
                    return next(updateErr);
                })
            }, function(err) {
                return next(err);
            });
    }

    lessonsCtrl.remove = function(req, res, next) {
        model.destroy({ where: { lesson_id: req.params.id } })
            .then(function() {
                res.json({ id: req.params.id, message: 'delete completed' });
            }, function(err) {
                return next(err);
            })
    }

    return lessonsCtrl;
}
