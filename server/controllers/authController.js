const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
    try {
        const { username, password, name, email, college, course } = req.body;

        // validate input
        if (!username || !password || !name || !email || !college || !course) {
            return res.status(400).json({
                message: "Please provide all details",
            });
        }

        // check for existing username or email
        const existingUser =
            (await User.findOne({ where: { username } })) ||
            (await User.findOne({ where: { email } }));

        if (existingUser) {
            return res.status(400).json({
                message: "Username or email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword,
            name,
            email,
            college,
            course,
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
            error: error.message,
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user;
        if (!username && !email) {
            return res.status(400).json({
                message: "Please provide either username or email",
            });
        }
        user =
            (await User.findOne({ where: { username } })) ||
            (await User.findOne({ where: { email } }));

        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
};
