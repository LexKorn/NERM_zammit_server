const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Admin = sequelize.define('admin', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
});

const Vacancy = sequelize.define('vacancy', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    duties: {type: DataTypes.TEXT, allowNull: false},
    requirements: {type: DataTypes.TEXT, allowNull: false},
    conditions: {type: DataTypes.TEXT, allowNull: false}
});

const Project = sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    task: {type: DataTypes.STRING, allowNull: false},
    location: {type: DataTypes.STRING, allowNull: false},
    photos: {type: DataTypes.STRING, allowNull: false},
    category: {type: DataTypes.STRING, allowNull: false}
});

const Info = sequelize.define('info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    customer: {type: DataTypes.STRING, allowNull: false},
    designer: {type: DataTypes.STRING, allowNull: true},
    period: {type: DataTypes.STRING, allowNull: false},
    volumes: {type: DataTypes.STRING, allowNull: false},
    information: {type: DataTypes.STRING, allowNull: false}
});

const Servise = sequelize.define('servise', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    cover: {type: DataTypes.STRING, allowNull: false}
});

const System = sequelize.define('system', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    photos: {type: DataTypes.STRING, allowNull: false}
});

const Contacts = sequelize.define('contacts', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    link: {type: DataTypes.STRING, allowNull: false}
});

Project.hasOne(Info);
Info.belongsTo(Project);

module.exports = {
    Admin,
    Project,
    Info,
    Vacancy,
    Servise,
    System,
    Contacts
};