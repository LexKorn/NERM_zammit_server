const {Vacancy, VacancyCondition, VacancyDuty, VacancyRequirement} = require('../models/models');

// const _transformVacancy = (vacancy) => {
//     return {
//         id: vacancy.id,
//         name: vacancy.name
//     }
// };


class VacancyController {
    async create(req, res) {
        try {
            let {name, condition, duty, requirement} = req.body;

            const vacancy = await Vacancy.create({name});

            if (condition) {
                condition = JSON.parse(condition);
                condition.forEach(item => {
                    VacancyCondition.create({
                        condition: item.condition,
                        vacancyId: vacancy.id
                    });
                });
            }

            if (duty) {
                duty = JSON.parse(duty);
                duty.forEach(item => {
                    VacancyDuty.create({
                        duty: item.duty,
                        vacancyId: vacancy.id
                    });
                });
            }

            if (requirement) {
                requirement = JSON.parse(requirement);
                requirement.forEach(item => {
                    VacancyRequirement.create({
                        requirement: item.requirement,
                        vacancyId: vacancy.id
                    });
                });
            }
            
            return res.json(vacancy);

        } catch(err) { 
            res.status(400).json(err.message);
        }
    }

    async getAll(req, res) {
        try {
            const vacancys = await Vacancy.findAll({
                include: [
                    {model: VacancyCondition, as: 'condition'},
                    {model: VacancyDuty, as: 'duty'},
                    {model: VacancyRequirement, as: 'requirement'}
                ]
            });
            return res.json(vacancys);

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params;
            const vacancy = await Vacancy.findOne({
                where: {id},
                include: [
                    {model: VacancyCondition, as: 'condition'},
                    {model: VacancyDuty, as: 'duty'},
                    {model: VacancyRequirement, as: 'requirement'}
                ]
            });
            return res.json(vacancy);

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await Vacancy.destroy({
                where: {id},
                include: [
                    {model: VacancyCondition, as: 'condition'},
                    {model: VacancyDuty, as: 'duty'},
                    {model: VacancyRequirement, as: 'requirement'}
                ]
            });
            return res.json('Vacancy was deleted');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            let {name, condition, duty, requirement} = req.body;

            await Vacancy.update({name}, {where: {id}});

            VacancyCondition.destroy({where: {vacancyId: id}});
            VacancyDuty.destroy({where: {vacancyId: id}});
            VacancyRequirement.destroy({where: {vacancyId: id}});

            if (condition) {
                condition = JSON.parse(condition);
                condition.forEach(item => {
                    VacancyCondition.create({
                        condition: item.condition,
                        vacancyId: id
                    });
                });
            }

            if (duty) {
                duty = JSON.parse(duty);
                duty.forEach(item => {
                    VacancyDuty.create({
                        duty: item.duty,
                        vacancyId: id
                    });
                });
            }

            if (requirement) {
                requirement = JSON.parse(requirement);
                requirement.forEach(item => {
                    VacancyRequirement.create({
                        requirement: item.requirement,
                        vacancyId: id
                    });
                });
            }

            // if (condition) {
            //     condition = JSON.parse(condition);
            //     condition.forEach(item => {
            //         VacancyCondition.update({condition: item.condition}, {where: {id: item.id}});
            //     });
            // }

            // if (duty) {
            //     duty = JSON.parse(duty);
            //     duty.forEach(item => {
            //         VacancyDuty.update({duty: item.duty}, {where: {id: item.id}});
            //     });
            // }

            // if (requirement) {
            //     requirement = JSON.parse(requirement);
            //     requirement.forEach(item => {
            //         VacancyRequirement.update({requirement: item.requirement}, {where: {id: item.id}});
            //     });
            // }

            return res.json('Vacancy was updated');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }
};

module.exports = new VacancyController();