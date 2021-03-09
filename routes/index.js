const Router = require('koa-router');
const router = new Router();
const {
    UserController
} = require('../controllers');
const basicRoute = '/api'

//define all your routes
router.get(`${basicRoute}/users`, UserController.findAll);
router.post(`${basicRoute}/users`, UserController.create);

module.exports = router;