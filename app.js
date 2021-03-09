const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const router = require('./routes');
// create web app:
const app = new Koa();
const PORT = 3000;

// Connect to the database:
const db = require('./models');
db.sequelize.sync({})
.then(() => console.log('models synced!'))
.catch((err) => console.log(err));

app.context.db = db;
app.use(bodyParser());

app.use(router.routes());

app.listen(PORT);
console.log(`Server is listening on PORT ${PORT}`);