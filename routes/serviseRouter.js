const Router = require('express');
const router = new Router();

const serviseController = require('../controllers/serviseController');

router.post('/', serviseController.create);
router.get('/', serviseController.getAll);
router.get('/:id', serviseController.getOne);
router.put('/:id', serviseController.update);
router.delete('/:id', serviseController.delete);

module.exports = router;