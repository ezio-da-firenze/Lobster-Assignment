const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const { JWT_SECRET, ADMIN_EMAIL } = process.env;

const getUserFromToken = async (token) => {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ where: { username: decoded.username } });
    return user;
};

const authorizeUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const user = await getUserFromToken(token);

        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token verification failed" });
    }
};

const authorizeAdmin = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const user = await getUserFromToken(token);

        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        if (user.email !== ADMIN_EMAIL) {
            return res
                .status(403)
                .json({ message: "Access denied: not an admin" });
        }

        req.user = user;
        if (user.role !== "admin") {
            user.role = "admin";
            await user.save();
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token verification failed" });
    }
};

module.exports = { authorizeUser, authorizeAdmin };
