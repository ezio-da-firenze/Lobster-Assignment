// const mysql = require("mysql2");

// const connectionString = "mysql://root:PASS@localhost:3307/newDB";

// const connection = mysql.createConnection(connectionString);

// connection.connect((err) => {
//     if (err) {
//         console.error("Error connecting to the database:", err.stack);
//         return;
//     }
//     console.log("Connected to the database as ID", connection.threadId);
// });

// const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS users (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL
//     )
// `;

// connection.query(createTableQuery, (err, results, fields) => {
//     if (err) throw err;
//     console.log("Table created or already exists.");
// });

// const userData = {
//     name: "John Doe",
//     email: "john.doe@example.com",
// };

// const insertQuery = "INSERT INTO users SET ?";

// connection.query(insertQuery, userData, (err, results) => {
//     if (err) throw err;
//     console.log("Data inserted successfully:", results);
// });

// connection.end((err) => {
//     if (err) {
//         console.error("Error ending the connection:", err.stack);
//         return;
//     }
//     console.log("Connection closed");
// });

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("newDB", "root", "PASS", {
    host: "localhost",
    dialect: "mysql",
    port: 3307,
    logging: false,
});

if (sequelize) {
    console.log("DB connected");
}

module.exports = sequelize;
