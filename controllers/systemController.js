const uuid = require('uuid');
const path = require('path');

const {System, SystemPhoto} = require('../models/models');

// const _transformSystem = (system) => {
//     return {
//         id: system.id,
//         title: system.title,
//         description: system.description
//     }
// };


class SystemController {
    async create(req, res) {
        try {
            let {title, description} = req.body;
            

            const candicate = await System.findOne({where: {title}});
            if (candicate) {
                return res.status(400).json({message: 'Такая система уже существует!'});
            } 

            const system = await System.create({title, description});            

            if (photo) {
                photo = JSON.parse(photo);

                const {image} = req.files;
                let fileName = uuid.v4() + ".jpg";

                image.mv(path.resolve(__dirname, '..', 'static', fileName));

                photo.forEach(item => {
                    SystemPhoto.create({
                        sistemId: system.id,
                        photo: item.image
                    });
                });
            }

            return res.json(system);

        } catch(err) { 
            res.status(400).json(err.message);
        }
    }

    async getAll(req, res) {
        try {
            const systems = await System.findAll();
            return res.json(systems.map(system => _transformSystem(system)));

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params;
            const system = await System.findOne({where: {id}});
            return res.json(_transformSystem(system));

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await System.destroy({where: {id}});
            return res.json('Slide was deleted');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const {title} = req.body;
            const {description} = req.files;
            let fileName = uuid.v4() + ".jpg";

            description.mv(path.resolve(__dirname, '..', 'static', fileName));

            await System.update({title, description: fileName}, {where: {id}});
            return res.json('Slide was updated');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }
};

module.exports = new SystemController();