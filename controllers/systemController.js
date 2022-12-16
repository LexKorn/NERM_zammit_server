const uuid = require('uuid');
const path = require('path');
const _ = require('lodash');

const {System, SystemPhoto} = require('../models/models');

const _transformPhoto = (photo) => {
    return {
        id: photo.id,
        systemId: photo.systemId,
        photo: photo.photo
    }
};

const _transformSystem = (system) => {
    return {
        id: system.id,
        title: system.title,
        description: system.description,
        photo: system.photo.map(photo => _transformPhoto(photo))
    }
};


class SystemController {
    async create(req, res) {
        try {
            let {title, description} = req.body;

            const candicate = await System.findOne({where: {title}});
            if (candicate) {
                return res.status(400).json({message: 'Такая система уже существует!'});
            } 

            const system = await System.create({title, description});     
            
            if (req.files === null) {
                return res.status(400).json({message: 'Отсутствует изображение'});
            } 
            const {photo} = req.files;           

            if (Array.isArray(photo)) {
                _.forEach(_.keysIn(photo), (key) => {
                    let image = photo[key];
                    let fileName = uuid.v4() + ".jpg";

                    image.mv(path.resolve(__dirname, '..', 'static', fileName));

                    SystemPhoto.create({
                        systemId: system.id,
                        photo: fileName
                    });
                });
            } else {
                let fileName = uuid.v4() + ".jpg";
                photo.mv(path.resolve(__dirname, '..', 'static', fileName));

                SystemPhoto.create({
                    systemId: system.id,
                    photo: fileName
                });
            }

            return res.json(_transformSystem(system));

        } catch(err) { 
            res.status(400).json(err.message);
        }
    }

    async getAll(req, res) {
        try {
            const systems = await System.findAll({
                include: [
                    {model: SystemPhoto, as: 'photo'}
                ]
            });
            return res.json(systems.map(system => _transformSystem(system)));

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params;
            const system = await System.findOne({
                where: {id},
                include: [
                    {model: SystemPhoto, as: 'photo'}
                ]
            });
            return res.json(_transformSystem(system));

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await System.destroy({
                where: {id},
                include: [
                    {model: SystemPhoto, as: 'photo'}
                ]
            });
            return res.json('Slide was deleted');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const {title, description} = req.body;

            await System.update({title, description}, {where: {id}});

            SystemPhoto.destroy({where: {systemId: id}});

            const {photo} = req.files;
            
            if (Array.isArray(photo)) {
                _.forEach(_.keysIn(photo), (key) => {
                    let image = photo[key];
                    let fileName = uuid.v4() + ".jpg";

                    image.mv(path.resolve(__dirname, '..', 'static', fileName));

                    SystemPhoto.create({
                        systemId: id,
                        photo: fileName
                    });
                });
            } else {
                let fileName = uuid.v4() + ".jpg";
                photo.mv(path.resolve(__dirname, '..', 'static', fileName));

                SystemPhoto.create({
                    systemId: id,
                    photo: fileName
                });
            }
            
            return res.json('Slide was updated');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }
};

module.exports = new SystemController();