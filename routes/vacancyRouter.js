const Router = require('express');
const router = new Router();

const vacancyController = require('../controllers/vacancyController');

router.post('/', vacancyController.create);
router.get('/', vacancyController.getAll);
router.get('/:id', vacancyController.getOne);
router.put('/:id', vacancyController.update);
router.delete('/:id', vacancyController.delete);

module.exports = router;