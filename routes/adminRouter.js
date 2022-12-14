const Router = require('express');
const router = new Router();
const {check} = require('express-validator');

const adminController = require('../controllers/adminController');

router.post('/register', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Пароль должен быть от 4 до 8 символов').isLength({min: 4, max: 8})
], adminController.register);
router.post('/login', adminController.login);
router.put('/login/:id', [
    check('password', 'Пароль должен быть от 4 до 8 символов').isLength({min: 4, max: 8})
], adminController.update);

module.exports = router;