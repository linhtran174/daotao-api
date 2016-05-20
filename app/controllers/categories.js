'use strict';

module.exports = function(model, utils) {

    var categoriesCtrl = {};
    

    categoriesCtrl.list = function (req, res, next) {
        model.findAll()
            .then(function (users) {
                res.json(users);  
            }, function(err) {
                return next(err);
            });
    };
    
    categoriesCtrl.search = function(req, res, next) {
        console.log('DEBUG search query ', req.query);
        model.findAll({ where: req.query })
            .then(function (users) {
                res.json(users);  
            }, function(err) {
                return next(err);
            });
    }

    categoriesCtrl.get = function (req, res, next) {
        model.findById(req.params.id)
            .then(function (user) {
                res.json(user);
            }, function(err) {
                return next(err);
            });
    };

    categoriesCtrl.post = function (req, res, next) {
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

    categoriesCtrl.put = function(req, res, next) {
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

    categoriesCtrl.remove = function(req, res, next) {

        model.destroy({ where: { cate_id: req.params.id } })
            .then(function(){
                res.json({id: req.params.id, message: 'delete completed'});
            }, function(err) {
            	res.json("Some error occurred, please check your provided info");
                return next(err);
            })
    }
    
    return categoriesCtrl;
}