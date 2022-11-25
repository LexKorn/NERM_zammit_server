const Router = require('express');
const router = new Router();

const sliderController = require('../controllers/sliderController');

router.post('/', sliderController.create);
router.get('/', sliderController.getAll);
router.get('/:id', sliderController.getOne);
router.put('/:id', sliderController.update);
router.delete('/:id', sliderController.delete);

module.exports = router;