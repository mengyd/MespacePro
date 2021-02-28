module.exports = (app, router) => {
    app.use('/api/user', require('./user')(app, router));
};