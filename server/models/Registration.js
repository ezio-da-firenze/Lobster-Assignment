const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Registration = sequelize.define("Registration", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Registration;
