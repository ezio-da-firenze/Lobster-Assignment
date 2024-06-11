const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET, JWT_EXPIRY } = process.env;

// JWT token creation utility
const createToken = async (
    tokenData,
    tokenKey = JWT_SECRET,
    expiresIn = JWT_EXPIRY
) => {
    try {
        const token = await jwt.sign(tokenData, tokenKey, {
            expiresIn,
        });
        return token;
    } catch (error) {
        throw error;
    }
};

module.exports = createToken;
