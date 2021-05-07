const Router = require('koa-router');
const router = new Router({prefix: '/api'});
const user_router = require('./user.routes');
const department_router = require('./department.routes');

//assemble all routes:

// user routes
router.use('', user_router);

//department routes
router.use('', department_router);

module.exports = router;