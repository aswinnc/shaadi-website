const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dob: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profileDp: {
        type: DataTypes.TEXT, // Store base64 or URL
        allowNull: true,
    },
    caste: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    height: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    weight: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    qualification: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    siblings: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fatherName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    motherName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fatherOccupation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    motherOccupation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    job: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    salary: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    religion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cigOrAlcohol: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = User;
