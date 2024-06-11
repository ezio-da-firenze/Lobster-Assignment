const { Sequelize } = require("sequelize");
require("dotenv").config();

// Connecting to a local MySQL server

// Getting the details of the database from the .env file
const { DB_NAME, DB_USER, DB_PASSWORD, DB_PORT } = process.env;

// Creating a sequelize object for further reference
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    port: DB_PORT,
    logging: false,
});

if (sequelize) {
    console.log("DB connected");
}

module.exports = sequelize;
