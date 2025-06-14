const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./db");
const { User, Event, Registration } = require("./models/associations");

const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: ["http://localhost:3001", "http://localhost:5173"],
    credentials: true, // to allow cookies
};


// MW
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/user", userRoutes);

sequelize
    .sync({ alter: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error creating database & tables:", err);
    });
