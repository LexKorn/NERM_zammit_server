const {Company} = require('../models/models');

const _transformCompany = (company) => {
    return {
        id: company.id,
        description: company.description,
        department: company.department
    }
};


class CompanyController {
    async create(req, res) {
        try {
            let {description, department} = req.body;

            const company = await Company.create({description, department});            
            return res.json(_transformCompany(company));

        } catch(err) { 
            res.status(400).json(err.message);
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params;
            const company = await Company.findOne({where: {id}});
            return res.json(_transformCompany(company));

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const {description, department} = req.body;

            await Company.update({description, department}, {where: {id}});
            return res.json('Company was updated');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }
};

module.exports = new CompanyController();