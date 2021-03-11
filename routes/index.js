const Router = require('koa-router');
const router = new Router();
const {
    UserController
} = require('../controllers');
const basicRoute = '/api'
const authenticated = require('../polices/authenticated');

//define all your routes
router.get(`${basicRoute}/users`, authenticated, UserController.findAll);
router.get(`${basicRoute}/users/:id`, authenticated, UserController.findById);
router.post(`${basicRoute}/users`, UserController.signup);
router.post(`${basicRoute}/users/login`, UserController.login);
router.put(`${basicRoute}/users/:id`, authenticated, UserController.modify);
router.delete(`${basicRoute}/users/:id`, authenticated, UserController.deleteById);

module.exports = router;