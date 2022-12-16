const {Company, CompanyDepartment} = require('../models/models');

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

            const company = await Company.create({description});

            if (department) {
                department = JSON.parse(department);
                department.forEach(item => {
                    CompanyDepartment.create({
                        department: item.department,
                        companyId: company.id
                    });
                });
            }

            return res.json(_transformCompany(company));

        } catch(err) { 
            res.status(400).json(err.message);
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params;
            const company = await Company.findOne({
                where: {id},
                include: [
                    {model: CompanyDepartment, as: 'department'}
                ]
            });

            return res.json(_transformCompany(company));

        } catch(err) {
            res.status(400).json(err.message);
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            let {description, department} = req.body;

            await Company.update({description}, {where: {id}});

            CompanyDepartment.destroy({where: {companyId: id}});

            if (department) {
                department = JSON.parse(department);
                department.forEach(item => {
                    CompanyDepartment.create({
                        department: item.department,
                        companyId: id
                    });
                });
            }

            return res.json('Company was updated');

        } catch(err) {
            res.status(400).json(err.message);
        }
    }
};

module.exports = new CompanyController();