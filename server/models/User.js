const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contact: DataTypes.STRING,
    college: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    course: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    department: DataTypes.STRING,
    yearOfStudy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "student",
    },
});

module.exports = User;
