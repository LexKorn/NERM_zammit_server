const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Admin = sequelize.define('admin', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false}
});

const Company = sequelize.define('company', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.TEXT, allowNull: false}    
});

const CompanyDepartment = sequelize.define('company_department', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    department: {type: DataTypes.STRING, allowNull: false}
});

const Contacts = sequelize.define('contacts', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    link: {type: DataTypes.STRING, allowNull: false}
});

const Info = sequelize.define('info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    customer: {type: DataTypes.STRING, allowNull: false},
    designer: {type: DataTypes.STRING, allowNull: true},
    period: {type: DataTypes.STRING, allowNull: false}
});

const InfoInform = sequelize.define('info_inform', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    inform: {type: DataTypes.STRING, allowNull: false}
});

const InfoVolume = sequelize.define('info_volume', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    volume: {type: DataTypes.STRING, allowNull: false}
});

const Project = sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    task: {type: DataTypes.STRING, allowNull: false},
    location: {type: DataTypes.STRING, allowNull: false},
    category: {type: DataTypes.STRING, allowNull: false}
});

const ProjectPhoto = sequelize.define('project_photo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    photo: {type: DataTypes.STRING, allowNull: false}
});

const Servise = sequelize.define('servise', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    cover: {type: DataTypes.STRING, allowNull: false}
});

const Slider = sequelize.define('slider', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    photo: {type: DataTypes.STRING, allowNull: false}
});

const System = sequelize.define('system', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false}
});

const SystemPhoto = sequelize.define('system_photo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    photo: {type: DataTypes.STRING, allowNull: false}
});

const Vacancy = sequelize.define('vacancy', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
});

const VacancyCondition = sequelize.define('vacancy_condition', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    condition: {type: DataTypes.TEXT, allowNull: false}
});

const VacancyDuty = sequelize.define('vacancy_duty', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    duty: {type: DataTypes.TEXT, allowNull: false}
});

const VacancyRequirement = sequelize.define('vacancy_requirement', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    requirement: {type: DataTypes.TEXT, allowNull: false}
});


Company.hasMany(CompanyDepartment, {as: 'department'});
CompanyDepartment.belongsTo(Company);

Project.hasOne(Info);
Info.belongsTo(Project);

Info.hasMany(InfoInform, {as: 'inform'});
InfoInform.belongsTo(Info);

Info.hasMany(InfoVolume, {as: 'volume'});
InfoVolume.belongsTo(Info);

Project.hasMany(ProjectPhoto, {as: 'photo'});
ProjectPhoto.belongsTo(Project);

System.hasMany(SystemPhoto, {as: 'photo'});
SystemPhoto.belongsTo(System);

Vacancy.hasMany(VacancyCondition, {as: 'condition'});
VacancyCondition.belongsTo(Vacancy);

Vacancy.hasMany(VacancyDuty, {as: 'duty'});
VacancyDuty.belongsTo(Vacancy);

Vacancy.hasMany(VacancyRequirement, {as: 'requirement'});
VacancyRequirement.belongsTo(Vacancy);


module.exports = {
    Admin,
    Company,
    CompanyDepartment,
    Contacts,
    Info,
    InfoInform,
    InfoVolume,
    Project,
    ProjectPhoto,
    Servise,
    Slider,
    System,
    SystemPhoto,
    Vacancy,
    VacancyCondition,
    VacancyDuty,
    VacancyRequirement
};