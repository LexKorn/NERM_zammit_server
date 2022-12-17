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
                        volume: item.volume,
                        infoId: info.id
                    });
                });
            }

            if (inform) {
                inform = JSON.parse(inform);
                inform.forEach(item => {
                    InfoInform.create({
                        inform: item.inform,
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
            let {name, task, location, category, customer, designer, period, volume, inform} = req.body;

            const project = await Project.update({name, task, location, category}, {where: {id}});
            const info = await Info.update({customer, designer, period}, {where: {projectId: id}});

            InfoVolume.destroy({where: {infoId: project.info.id}});
            InfoInform.destroy({where: {infoId: project.info.id}});
            ProjectPhoto.destroy({where: {projectId: id}});

            if (volume) {
                volume = JSON.parse(volume);
                volume.forEach(item => {
                    InfoVolume.create({
                        volume: item.volume,
                        infoId: project.info.id
                    });
                });
            }

            if (inform) {
                inform = JSON.parse(inform);
                inform.forEach(item => {
                    InfoInform.create({
                        inform: item.inform,
                        infoId: project.info.id
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
                        projectId: id,
                        photo: fileName
                    });
                });
            } else {
                let fileName = uuid.v4() + ".jpg";
                photo.mv(path.resolve(__dirname, '..', 'static', fileName));

                ProjectPhoto.create({
                    projectId: id,
                    photo: fileName
                }); 
            }

            return res.json('Project was updated');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }
};

module.exports = new ProjectController();