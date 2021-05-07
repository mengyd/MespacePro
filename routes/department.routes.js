const Router = require('koa-router');
const router = new Router({prefix: '/department'});

const {
    DepartmentController
} = require('../controllers');

const authenticated = require('../polices/authenticated');
const ensureSuperRight = require('../polices/ensureSuperRight');

//department routes
router.get('/', authenticated, DepartmentController.findAll);
router.get('/:id', authenticated, DepartmentController.findById);
router.post('/', authenticated, DepartmentController.create);
router.put('/:id', authenticated, DepartmentController.modify);
router.delete('/:id', authenticated, DepartmentController.delete);

module.exports = router.routes();