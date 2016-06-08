module.exports = function(app, utils, models) {

    var unless = require('express-unless');
    var ctrls = utils.loadControllers(models);

    var names = utils.getModelNames();

    app.get('/api/', function(req, res) {
        res.render('index');
    })

    utils.checkToken.unless = unless;
    //check token with these routes    
    app.use('/api/teachers', utils.checkToken);
    app.use('/api/classroom', utils.checkToken);
    app.use('/api/schedules', utils.checkToken);
    app.use('/api/students', utils.checkToken);
    app.use('/api/courses/', utils.checkToken.unless({
        methods: ['GET']
    }));

    //set get default api
    names.forEach(function(name) {
        console.log('Route /' + name + " completed.");
        app.get('/api/' + name, ctrls[name].list); // get list
        app.get('/api/' + name + '/search', ctrls[name].search); // search
        app.get('/api/' + name + '/:id([0-9a-f]+)', ctrls[name].get); // get by id
        app.post('/api/' + name, ctrls[name].post); // insert
        app.put('/api/' + name + '/:id([0-9a-f]+)', ctrls[name].put); // update
        app.delete('/api/' + name + '/:id([0-9a-f]+)', ctrls[name].remove); // delete
    });

    //login API
    app.post('/api/users/login', ctrls['users'].login); // login
    app.post('/api/teachers/login', ctrls['teachers'].login);


    //teacherAPI
    app.put('/api/teachers/modifyMyInfo', ctrls['teachers'].modifyMyInfo);
    app.get('/api/teachers/getMyInfo', ctrls['teachers'].getMyInfo);
    app.get('/api/schedules/teacherGetSchedule', ctrls['schedules'].teacherGetSchedule);
    app.get('/api/courses/teacherGetCourse', ctrls['courses'].teacherGetCourse);
    app.post('/api/schedules/teacherCreateSchedule', ctrls['schedules'].teacherGetSchedule);
    app.post('/api/courses/teacherCreateCourse', ctrls['courses'].teacherGetCourse);




    // catch-all
    app.get('*', function(req, res) { res.status(404).json({ error: 'Invalid GET request' }) })
    app.post('*', function(req, res) { res.status(404).json({ error: 'Invalid POST request' }) })
    app.delete('*', function(req, res) { res.status(404).json({ error: 'Invalid DELETE request' }) })
}
