const Koa = require('koa');

const Router = require('koa-router');
var router = new Router();

// create web app:
const app = new Koa();

// load configurations:
require('./config')(app);

// Connect to the database:
const db = require('./models')(app);
db.sequelize.sync();

// load middlewares:
require('./middlewares')(app);
// load controllers:
require('./controllers')(app);
// load routes:
require('./routes')(app, router);


// listen to the port:
app.listen(app.configuration.port, () => {
    console.log('listening on port: ' + app.configuration.port + '...');
});