const Router = require('koa-router');
const router = new Router({prefix: '/user'});

const {
    UserController
} = require('../controllers');

const authenticated = require('../polices/authenticated');
const ensureSuperRight = require('../polices/ensureSuperRight');

// router.prefix = '/user'
// user routes
router.get('/', authenticated, UserController.findAll);
router.get('/:id', authenticated, UserController.findById);
router.post('/', UserController.signup);
router.post('/login', UserController.login);
router.put('/:id', authenticated, UserController.modify);
router.delete('/:id', authenticated, ensureSuperRight, UserController.deleteById);

module.exports = router.routes();