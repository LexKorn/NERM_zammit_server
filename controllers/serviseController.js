const uuid = require('uuid');
const path = require('path');

const {Servise} = require('../models/models');

const _transformServise = (servise) => {
    return {
        id: servise.id,
        title: servise.title,
        description: servise.description,
        cover: servise.cover
    }
};


class ServiseController {
    async create(req, res) {
        try {
            let {title, description} = req.body;
            const {cover} = req.files;
            let fileName = uuid.v4() + ".jpg";

            cover.mv(path.resolve(__dirname, '..', 'static', fileName));

            const candicate = await Servise.findOne({where: {title}});
            if (candicate) {
                return res.status(400).json({message: 'Такая услуга уже существует!'});
            } 

            const servise = await Servise.create({title, description, cover: fileName});            
            return res.json(_transformServise(servise));

        } catch(err) { 
            res.status(400).json(err.message);
        }
    }

    async getAll(req, res) {
        try {
            const servises = await Servise.findAll();
            return res.json(servises.map(servise => _transformServise(servise)));

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params;
            const servise = await Servise.findOne({where: {id}});
            return res.json(_transformServise(servise));

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await Servise.destroy({where: {id}});
            return res.json('Servise was deleted');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const {title, description} = req.body;
            const {cover} = req.files;
            let fileName = uuid.v4() + ".jpg";

            cover.mv(path.resolve(__dirname, '..', 'static', fileName));

            await Servise.update({title, description, cover: fileName}, {where: {id}});
            return res.json('Servise was updated');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }
};

module.exports = new ServiseController();