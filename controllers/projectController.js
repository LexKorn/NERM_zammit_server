const uuid = require('uuid');
const path = require('path');
const _ = require('lodash');

const {Project, ProjectPhoto, Info} = require('../models/models');

// const _transformProject = (project) => {
//     return {
//         id: project.id,
//         name: project.name,
//         task: project.task
//     }
// };


class ProjectController {
    async create(req, res) {
        try {
            let {name, task, location, category, customer, designer, period} = req.body;
            const {photo} = req.files;
            

            const candicate = await Project.findOne({where: {name}});
            if (candicate) {
                return res.status(400).json({message: 'Такой проект уже существует!'});
            } 

            const project = await Project.create({name, task, location, category});            

            if (photo.length = 0) {
                return res.status(400).json({message: 'Добавьте изображение'});
            } else if (photo.length = 1) {
                let fileName = uuid.v4() + ".jpg";
                photo.mv(path.resolve(__dirname, '..', 'static', fileName));

                ProjectPhoto.create({
                    projectId: project.id,
                    photo: fileName
                });
            }else if (photo.length > 1) {
                _.forEach(_.keysIn(photo), (key) => {
                    let image = photo[key];
                    let fileName = uuid.v4() + ".jpg";

                    image.mv(path.resolve(__dirname, '..', 'static', fileName));

                    ProjectPhoto.create({
                        projectId: project.id,
                        photo: fileName
                    });
                });
            }

            Info.create({customer, designer, period, projectId: project.id});

            return res.json(project);

        } catch(err) { 
            res.status(400).json(err.message);
        }
    }

    async getAll(req, res) {
        try {
            const projects = await Project.findAll({
                include: [
                    {model: ProjectPhoto, as: 'photo'},
                    {model: Info, as: 'info'}
                ]
            });
            return res.json(projects);

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params;
            const project = await Project.findOne({
                where: {id},
                include: [
                    {model: ProjectPhoto, as: 'photo'}
                ]
            });
            return res.json(project);

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await Project.destroy({
                where: {id},
                include: [
                    {model: ProjectPhoto, as: 'photo'}
                ]
            });
            return res.json('Project was deleted');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const {name, task, location, category} = req.body;
            // const {photo} = req.files;
            // let fileName = uuid.v4() + ".jpg";

            // photo.mv(path.resolve(__dirname, '..', 'static', fileName));

            await Project.update({name, task, location, category}, {where: {id}});
            return res.json('Project was updated');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }
};

module.exports = new ProjectController();