const Router = require('express');
const router = new Router();

const projectController = require('../controllers/projectController');

router.post('/', projectController.create);
router.get('/', projectController.getAll);
router.get('/:id', projectController.getOne);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.delete);

module.exports = router;