const uuid = require('uuid');
const path = require('path');
const _ = require('lodash');

const {Project, ProjectPhoto, Info, InfoInform, InfoVolume} = require('../models/models');

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
            let {name, task, location, category, customer, designer, period, volume, inform} = req.body;
            
            const candicate = await Project.findOne({where: {name}});
            if (candicate) {
                return res.status(400).json({message: 'Такой проект уже существует!'});
            } 

            const project = await Project.create({name, task, location, category});   

            const info = await Info.create({customer, designer, period, projectId: project.id});

            if (volume) {
                volume = JSON.parse(volume);
                volume.forEach(item => {
                    InfoVolume.create({
                        volume: item.text,
                        infoId: info.id
                    });
                });
            }

            if (inform) {
                inform = JSON.parse(inform);
                inform.forEach(item => {
                    InfoInform.create({
                        inform: item.text,
                        infoId: info.id
                    });
                });
            }
            
            if (req.files === null) {
                return res.status(400).json({message: 'Отсутствует изображение'});
            } 
            const {photo} = req.files;

            if (Array.isArray(photo)) {
                _.forEach(_.keysIn(photo), (key) => {
                    let image = photo[key];
                    let fileName = uuid.v4() + ".jpg";

                    image.mv(path.resolve(__dirname, '..', 'static', fileName));

                    ProjectPhoto.create({
                        projectId: project.id,
                        photo: fileName
                    });
                });
            } else {
                let fileName = uuid.v4() + ".jpg";
                photo.mv(path.resolve(__dirname, '..', 'static', fileName));

                ProjectPhoto.create({
                    projectId: project.id,
                    photo: fileName
                }); 
            }

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
                    {model: Info, as: 'info',
                        include: [
                            {model: InfoVolume, as: 'volume'},
                            {model: InfoInform, as: 'inform'}
                        ]
                    } 
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
                    {model: ProjectPhoto, as: 'photo'},
                    {model: Info, as: 'info',
                        include: [
                            {model: InfoVolume, as: 'volume'},
                            {model: InfoInform, as: 'inform'}
                        ]
                    } 
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
                    {model: ProjectPhoto, as: 'photo'},
                    {model: Info, as: 'info',
                        include: [
                            {model: InfoVolume, as: 'volume'},
                            {model: InfoInform, as: 'inform'}
                        ]
                    } 
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