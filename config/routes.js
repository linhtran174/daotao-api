module.exports = function(app, utils, models) {

    var JwtCheck = require('express-jwt');
    var jwt = require('jsonwebtoken');

    var jwtCheck = JwtCheck({
        secret: 'EdoSuperSecretKey',
    });

    var ctrls = utils.loadControllers(models);

    var names = utils.getModelNames();

    app.get('/api/', function(req, res) {
        res.render('index');
    })

    // internal API protected by JSON Web Token
    console.log(jwtCheck);
    app.use('/api/teachers/',
        jwtCheck.unless({ path: ['/api/teachers/login', { url: '/api/teachers', methods: ['POST'] }] })
    ); //accessing all teachers resources will require token 



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

    // catch-all
    app.get('*', function(req, res) { res.status(404).json({ error: 'Invalid GET request' }) })
    app.post('*', function(req, res) { res.status(404).json({ error: 'Invalid POST request' }) })
    app.delete('*', function(req, res) { res.status(404).json({ error: 'Invalid DELETE request' }) })
}
