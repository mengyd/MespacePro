const Router = require('koa-router');
const router = new Router();
const {
    UserController,
    DepartmentController
} = require('../controllers');
const userController = require('../controllers/user.controller');
const basicRoute = '/api'
const authenticated = require('../polices/authenticated');

//define all your routes:

// user routes
router.get(`${basicRoute}/user`, authenticated, UserController.findAll);
router.get(`${basicRoute}/user/:id`, authenticated, UserController.findById);
router.post(`${basicRoute}/user`, UserController.signup);
router.post(`${basicRoute}/user/login`, UserController.login);
router.put(`${basicRoute}/user/:id`, authenticated, UserController.modify);
router.delete(`${basicRoute}/user/:id`, authenticated, UserController.deleteById);

//department routes
router.get(`${basicRoute}/department`, authenticated, DepartmentController.findAll);
router.get(`${basicRoute}/department/:id`, authenticated, DepartmentController.findById);
router.post(`${basicRoute}/department`, authenticated, DepartmentController.create);
router.put(`${basicRoute}/department/:id`, authenticated, DepartmentController.modify);
router.delete(`${basicRoute}/department/:id`, authenticated, DepartmentController.delete);


module.exports = router;