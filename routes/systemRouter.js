const Router = require('express');
const router = new Router();

const systemController = require('../controllers/systemController');

router.post('/', systemController.create);
router.get('/', systemController.getAll);
router.get('/:id', systemController.getOne);
router.put('/:id', systemController.update);
router.delete('/:id', systemController.delete);

module.exports = router;