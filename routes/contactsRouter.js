const Router = require('express');
const router = new Router();

const contactsController = require('../controllers/contactsController');

router.post('/', contactsController.create);
router.get('/:id', contactsController.getOne);
router.put('/:id', contactsController.update);

module.exports = router;