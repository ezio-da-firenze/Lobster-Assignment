// index.js
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const sequelize = require("./db");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: "http://localhost:3001",
    credentials: true, // to allow cookies
};

// MW
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/events", eventRoutes);

sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error while connecting to database:", error);
    });
