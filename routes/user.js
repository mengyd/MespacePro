module.exports = (app, router) => {

    router.get('/',
        app.controllers.user.listAll
    );

    router.post('/',
        app.middlewares.bodyParser.json(),
        app.controllers.user.create
    );
    return router;
};