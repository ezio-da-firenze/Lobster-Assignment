const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_EXPIRY } = process.env;

const createToken = async (
    tokenData,
    tokenKey = "fbui34bfune9ruf",
    expiresIn = "1d"
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
