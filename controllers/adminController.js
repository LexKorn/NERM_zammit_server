const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const {Admin} = require('../models/models');

require('dotenv').config();

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
};


class AdminController {
    async register(req, res) {
        try {            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Некорректный email или password", errors});
            }

            const {email, password} = req.body;

            const candidate = await Admin.findOne({where: {email}});
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует!", errors});
            }

            const hashPassword = await bcrypt.hash(password, 7);
            const admin = await Admin.create({email, password: hashPassword});
            const token = generateJwt(admin.id, admin.email);

            return res.json({token});

        } catch(err) {
            res.status(400).json({message: "Ошибка запроса... register", errors});
        }
    }

    async update(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Некорректный password", errors});
            }

            const {id} = req.params;
            const {email, password} = req.body;

            const candidate = await Admin.findOne({where: {email}});
            if (!candidate) {
                return res.status(400).json({message: 'Такого email нет!'});
            }

            const hashPassword = await bcrypt.hash(password, 7);
            const admin = await Admin.update({email, password: hashPassword}, {where: {id}});
            const token = generateJwt(admin.id, admin.email);

            return res.json({token});

        } catch(err) {
            res.status(400).json({message: "Ошибка запроса... update", errors});
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;

            const admin = await Admin.findOne({where: {email}});
            if (!admin) {
                return res.status(400).json({message: 'Такого email нет!'});
            }

            let comparePassword = bcrypt.compareSync(password, admin.password);
            if (!comparePassword) {
                return res.status(400).json({message: 'Пароль не совпал!'});
            }

            const token = generateJwt(admin.id, admin.email);
            return res.json({token});

        } catch(err) {
            res.status(400).json({message: "Ошибка запроса... login", errors});
        }
    }
};

module.exports = new AdminController();