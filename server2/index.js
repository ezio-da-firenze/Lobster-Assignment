const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
// const eventRoutes = require("./routes/eventRoutes");

const prisma = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/v1/auth", authRoutes);

// app.use("/api/v1/event", eventRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
