const { z } = require("zod");

const UserRegistrationSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    college: z.string(),
    contact: z.string().optional(),
    course: z.string().optional(),
    role: z.string().optional(),
    department: z.string().optional(),
    yearOfStudy: z.string().optional(),
});

const UserLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

module.exports = { UserRegistrationSchema, UserLoginSchema };
