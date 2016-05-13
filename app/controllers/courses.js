'use strict';

module.exports = function(model, utils) {

    var coursesCtrl = {};

    coursesCtrl.list = function(req, res, next) {
        model.findAll()
            .then(function(courses) {
                res.json(courses);
            }, function(err) {
                return next(err);
            });
    };

    coursesCtrl.search = function(req, res, next) {
        console.log('DEBUG search query ', req.query);
        model.findAll({ where: req.query })
            .then(function(courses) {
                res.json(courses);
            }, function(err) {
                return next(err);
            });
    }

    coursesCtrl.get = function(req, res, next) {
        console.log(req.params.id);
        model.findById(req.params.id)
            .then(function(courses) {
                res.json(courses);
            }, function(err) {
                return next(err);
            });
    };

    coursesCtrl.post = function(req, res, next) {
        console.log(req.body);
        model.create(req.body)
            .then(function(courses) {
                res.json(courses);
            }, function(err) {
                return next(err);
            });
    };

    coursesCtrl.put = function(req, res, next) {
        model.findById(req.params.id)
            .then(function(courses) {
                if(courses == null){
                    res.json("404 not found that course ID");
                    return next();
                }
                courses.update(req.body).then(function(newcourses) {
                    res.json(newcourses);
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
