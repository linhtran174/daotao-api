'use strict';

module.exports = function(model, utils) {

    var coursesCtrl = {};

    coursesCtrl.teacherCreateCourse = function(req, res, next) {
        if (req.user && req.user.role == "teacher") {
            req.body.schedules_teacher = req.user.id;
            model.create(req.body).then(function(course) {
                res.status(200).json({ status: "success", message: "course created", course: course });
            }, function(err) {
                res.status(1000).json({ status: "failed", message: "course was not created. Reason: " + err.message });
            })

        } else {
            res.status(401).json({ status: "failed", message: "You do not have the right to access this resource" });
        }
    }

    coursesCtrl.teacherGetCourse = function(req, res, next) {
        console.log(req.user);
        if (req.user && req.user.role == "teacher") {
            model.findAll({ where: {course_teacher: req.user.id} })
                .then(function(courses) {
                    if (courses) res.json({ status: "success", message: "no courses was found", course:courses });
                    else res.status(404).json({ status: "success", message: "no courses was found" })
                }, function(err) {
                    res.status(1000).json({ status: "failed, unknown error", message: err.message });
                    next(err);
                });

        } else {
            res.status(401).json({ status: "failed", message: "You do not have the right to access this resource" });
        }
    }

    coursesCtrl.list = function(req, res, next) {
        model.findAll()
            .then(function(courses) {
                res.status(200).json(courses);
            }, function(err) {
                res.status(400).json({ status: "400 bad request", message: err.message })
                next(err);
            });

    };

    coursesCtrl.search = function(req, res, next) {
        model.findAll({ where: req.query })
            .then(function(courses) {
                if (courses) res.json(courses);
                else res.status(404).json({ status: "success", message: "no courses was found" })
            }, function(err) {
                res.status(1000).json({ status: "failed, unknown error", message: err.message });
                next(err);
            });
    }

    coursesCtrl.get = function(req, res, next) {
        model.findById(req.params.id)
            .then(function(user) {
                if (user) res.json(user);
                else res.status(404).json({ status: "404 teacher not found" });
            }, function(err) {
                res.status(1000).json({ status: "1000 failed, unknown error", message: err.message });
                next(err);
            });

    };

    coursesCtrl.post = function(req, res, next) {
        if (req.user && req.user.role == "admin") {
            model.create(req.body)
                .then(function(course) {
                    res.json(course);
                }, function(err) {
                    console.log(JSON.stringify(err));
                    res.json({ status: "failed", message: err.message });

                });
        } else {
            res.status(403).json({ status: "failed", message: "You do not have the right to accesss this resource" });
        }

    };

    coursesCtrl.put = function(req, res, next) {
        if (req.user && req.user.role == "admin") {
            model.findById(req.params.id)
                .then(function(course) {
                    if (!course) {
                        res.status(403).json({ status: "failed", message: "There is no course with this id!!" });
                        next();
                    }
                    course.update(req.body).then(function(newUser) {
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
            res.status(403).json({ status: "failed", message: "You do not have the right to accesss this resource" });
        }


    }

    coursesCtrl.remove = function(req, res, next) {
        if (req.user && req.user.role == "admin") {
            model.destroy({ where: { teacher_id: req.params.id } })
                .then(function() {
                    res.status(200).json({ status: "success", id: req.params.id, message: 'delete completed' });
                }, function(err) {
                    res.status(1000).json({ status: "1000 failed, unknown error", message: err.message });
                    next(err);
                });
        } else {
            res.status(403).json({ status: "failed", message: "You do not have the right to accesss this resource" });
        }
    }

    return coursesCtrl;
}
