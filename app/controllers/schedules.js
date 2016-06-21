'use strict';

module.exports = function(model, utils) {

    var schedulesCtrl = {};

    schedulesCtrl.teacherGetSchedule = function(req,res,next){
        console.log(req.user);
        if(req.user && req.user.role=="teacher"){
            model.findAll({
                where:{schedule_teacher: req.user.id}
            }).then(function(schedules){
                res.status(200).json({status: "sucesss", schedules: schedules});
            })
        }
        else{
            res.status(401).json({status: "failed", message:"You do not have the right to access this resource"});
        }
    }

    schedulesCtrl.teacherCreateSchedule = function(req,res,next){
        req.body.schedule_teacher = req.user.id;
        if(req.user && req.user.role=="teacher"){
            model.create(req.body).then(function(schedule) {
                //console.log(req.body);
                res.status(200).json({status:"success",createdSchedule:schedule});
            }, function(err) {
                console.log(JSON.stringify(err));
                res.json({ status: "failed", message: err.message });
            });
        }
        else{
            res.status(401).json({status: "failed", message:"You do not have the right to access this resource"});
        }
    }

    schedulesCtrl.list = function(req, res, next) {
        model.findAll().then(function(schedules) {
            res.status(200).json(schedules);
        }, function(err) {
            res.status(400).json({ status: "400 bad request", message: err.message })
            return next(err);
        });
    };

    schedulesCtrl.search = function(req, res, next) {
        console.log('DEBUG search query ', req.query);
        model.findAll({ where: req.query }).then(function(schedules) {
            if (schedules) res.json(schedules);
            else res.status(404).json({ status: "success", message: "no schedule was found" })
        }, function(err) {
            res.json({ status: "failed, unknown error", message: err.message });
            return next(err);
        });
    }

    schedulesCtrl.get = function(req, res, next) {
        model.findById(req.params.id).then(function(schedule) {
            if (schedule) res.json(schedule);
            else res.status(404).json({ status: "404 schedule not found" });
        }, function(err) {
            res.json({ status: " failed, unknown error", message: err.message });
            return next(err);
        });
    };

    schedulesCtrl.scheduleValidate = function(teacher, student, time, callback) {
        //if the same teacher, student and time already exist then this schedule cannot be created
        var isValid = 1;
        callback(isValid);
    }

    schedulesCtrl.post = function(req, res, next) {
        this.scheduleValidate(0, 0, 0, function() {
            model.create(req.body).then(function(schedule) {
                res.json(schedule);
            }, function(err) {
                console.log(JSON.stringify(err));
                res.json({ status: "failed", message: err.message });
            });
        })
        ///////////////////////////////
    };

    schedulesCtrl.put = function(req, res, next) {
        model.findById(req.params.id).then(function(schedule) {
            if (!schedule) {
                res.status(404).json({ status: "failed", message: "There is no schedule with this id!!" });
                return next();
            }
            schedule.update(req.body).then(function(schedule) {
                res.status(200).json(schedule);
            }, function(updateErr) {
                res.json({ status: "failed", message: updateErr.message });
                return next(updateErr);
            })
        }, function(err) {
            res.json({ status: "failed", message: err.message })
            return next(err);
        });
    }

    schedulesCtrl.remove = function(req, res, next) {
        model.destroy({ where: { schedule_id: req.params.id } }).then(function() {
            res.status(200).json({ status: "success", id: req.params.id, message: 'delete completed' });
        }, function(err) {
            res.json({ status: "failed, unknown error", message: err.message });
            return next(err);
        })
    }

    return schedulesCtrl;
}
