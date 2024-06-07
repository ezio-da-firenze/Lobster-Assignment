const bcrypt = require("bcrypt");
const prisma = require("../db");

module.exports = {
    registerUser: async (req, res) => {
        try {
            const { username, password, name, email, college, course } =
                req.body;

            if (
                !username ||
                !password ||
                !name ||
                !email ||
                !college ||
                !course
            ) {
                return res
                    .status(400)
                    .json({ message: "Please provide all required details" });
            }

            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [{ username }, { email }],
                },
            });

            if (existingUser) {
                return res
                    .status(400)
                    .json({ message: "Username or email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    username,
                    password: hashedPassword,
                    name,
                    email,
                    college,
                    course,
                },
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
    },

    loginUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            const user = await prisma.user.findFirst({
                where: {
                    OR: [{ username }, { email }],
                },
            });

            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            res.status(200).json({
                message: "Login successful",
                username: user.username,
                name: user.name,
                email: user.email,
            });
        } catch (error) {
            res.status(500).json({
                message: "Login failed",
                error: error.message,
            });
        }
    },
};
