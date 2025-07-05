const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Event model with all the attributes
const Event = sequelize.define("Event", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    college: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: DataTypes.STRING,
    description: DataTypes.TEXT,
    time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    registrations: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
});

module.exports = Event;
