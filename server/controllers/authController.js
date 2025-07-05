const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const createToken = require("../utils/createToken");
const { JWT_SECRET, JWT_EXPIRY, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
const { z } = require("zod");
const {
    UserRegistrationSchema,
    UserLoginSchema,
} = require("../utils/inputValidaiton");

const registerUser = async (req, res) => {
    try {
        const {
            username,
            password,
            confirmPassword,
            name,
            email,
            contact,
            college,
            course,
            department,
            yearOfStudy,
        } = req.body;

        // validate input
        if (
            !username ||
            !password ||
            !name ||
            !email ||
            !college ||
            !course ||
            !confirmPassword
        ) {
            return res.status(400).json({
                message: "Please provide all details",
            });
        }
        const userValidation = UserRegistrationSchema.safeParse(req.body);
        if (!userValidation.success) {
            console.log(userValidation.error.errors);
            return res.status(400).json({
                message: "Invalid input data",
                errors: userValidation.error.errors,
            });
        }

        let role = "user";
        if (email === ADMIN_EMAIL) {
            const isAdminPasswordValid = await bcrypt.compare(
                password,
                await bcrypt.hash(ADMIN_PASSWORD, 10)
            );
            if (isAdminPasswordValid) {
                role = "admin";
            }
        }
        // console.log("Incoming registration payload:", req.body);
        // check for existing username or email
        const existingUser =
            (await User.findOne({ where: { username } })) ||
            (await User.findOne({ where: { email } }));

        if (existingUser) {
            return res.status(409).json({
                message: "Username or email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword,
            name,
            email,
            contact,
            college,
            course,
            role,
            department,
            yearOfStudy,
        });

        res.status(200).json({
            message: "User created successfully",
            username: user.username,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log("Hi");
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter all details",
            });
        }

        const userValidation = UserLoginSchema.safeParse(req.body);
        if (!userValidation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: userValidation.error.errors,
            });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const tokenData = {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
        };
        let jwtToken;
        try {
            jwtToken = await createToken(tokenData);
        } catch (error) {
            return res.status(500).json({
                message: "Token creation failed",
                error: error.message,
            });
        }
        console.log(jwtToken);
        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
            user: tokenData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
};

const logoutUser = (req, res) => {
    res.cookie("token", null, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 0,
        expires: new Date(0),
    });

    res.status(200).json({
        message: "Logout successful",
    });
};

module.exports = { registerUser, loginUser, logoutUser };
