'use strict';

module.exports = function(model, utils) {

    var topicsCtrl = {};

    topicsCtrl.list = function(req, res, next) {
        model.findAll()
            .then(function(topics) {
                res.json(topics);
            }, function(err) {
                return next(err);
            });
    };

    topicsCtrl.search = function(req, res, next) {
        console.log('DEBUG search query ', req.query);
        model.findAll({ where: req.query })
            .then(function(topics) {
                res.json(topics);
            }, function(err) {
                return next(err);
            });
    }

    topicsCtrl.get = function(req, res, next) {
        console.log(req.params.id);
        model.findById(req.params.id)
            .then(function(topics) {
                res.json(topics);
            }, function(err) {
                return next(err);
            });
    };

    topicsCtrl.post = function(req, res, next) {
        console.log(req.body);
        model.create(req.body)
            .then(function(topics) {
                res.json(topics);
            }, function(err) {
                return next(err);
            });
    };

    topicsCtrl.put = function(req, res, next) {
        model.findById(req.params.id)
            .then(function(topics) {
                if(topics == null){
                    res.json("404 topics not define");
                    return next();
                }
                topics.update(req.body).then(function(newtopics) {
                    res.json(newtopics);
                }, function(updateErr) {
                    return next(updateErr);
                })
            }, function(err) {
                return next(err);
            });
    }

    topicsCtrl.remove = function(req, res, next) {
        model.destroy({ where: { course_id: req.params.id } })
            .then(function() {
                res.json({ id: req.params.id, message: 'delete completed' });
            }, function(err) {
                return next(err);
            })
    }

    return topicsCtrl;
}
