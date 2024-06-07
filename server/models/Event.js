const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:PASS@localhost:3307/newDB");

const Event = sequelize.define(
    "Event",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: DataTypes.STRING,
        description: DataTypes.TEXT,
        time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Event;
