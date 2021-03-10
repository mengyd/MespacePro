const Router = require('koa-router');
const router = new Router();
const {
    UserController
} = require('../controllers');
const basicRoute = '/api'

//define all your routes
router.get(`${basicRoute}/users`, UserController.findAll);
router.get(`${basicRoute}/users/:id`, UserController.findById);
router.post(`${basicRoute}/users`, UserController.signup);
router.put(`${basicRoute}/users/:id`, UserController.modify);
router.delete(`${basicRoute}/users/:id`, UserController.deleteById);

module.exports = router;