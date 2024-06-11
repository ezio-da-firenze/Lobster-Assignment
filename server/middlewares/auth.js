const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const { JWT_SECRET, JWT_EXPIRY, ADMIN_EMAIL } = process.env;

// Two middlewares mostly similar

// Authorize user to be passed before routes accessible only through user login
const authorizeUser = async (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token);
    // console.log("JWT_SECRET:", JWT_SECRET);
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            // console.log(decoded);
            req.user = await User.findOne({
                where: { username: decoded.username },
            });

            if (req.user) {
                // console.log("Valid USER");
                next();
            } else {
                // console.log("Not Valid USER");
                res.status(401).json({ message: "Token Error" });
            }
        } catch (error) {
            // console.log(error);
            // console.log("Not authorized Token failed");
            res.status(401).json({ message: "Token Error" });
        }
    } else {
        // console.log("Token Undefined");
        res.status(401).json({ message: "Token Error" });
    }
};

// Authorize admin middleware to be passed before routes accessible only to admins
const authorizeAdmin = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if (token) {
        try {
            console.log(JWT_SECRET);
            const decoded = jwt.verify(token, JWT_SECRET);
            console.log(decoded);

            req.user = await User.findOne({
                where: { username: decoded.username },
            });

            if (req.user === null) {
                console.log("Not authorized Token failed");
                res.status(401).json({ message: "Token Error" });
            }
            //
            else if (req.user.email === ADMIN_EMAIL) {
                console.log("Verified Admin");
                req.user.role = "admin";
                await req.user.save();
                next();
            }
            //
            else if (req.user.email !== ADMIN_EMAIL) {
                console.log("Not verified admin");
                res.status(403).json({ message: "Not verified admin" });
            }
            //
            else if (!req.user) {
                console.log("Token not verified");
                res.status(401).json({ message: "Not verified token" });
            }
        } catch (error) {
            console.log(error);
            console.log("Not authorized Token failed");
            res.status(401).json({ message: "Token Error" });
        }
    } else {
        console.log("Token Undefined");
        res.status(401).json({ message: "Token Error" });
    }
};

module.exports = { authorizeUser, authorizeAdmin };
