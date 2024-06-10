const Registration = require("../models/Registration");
const User = require("../models/User");
const Event = require("../models/Event");

const registerEvent = async (req, res) => {
    try {
        const { eventId } = req.body;
        const user = req.user;
        const userId = user.id;
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        const existingRegistration = await Registration.findOne({
            where: { userId, eventId },
        });

        if (existingRegistration) {
            return res.status(409).json({
                message: "User is already registered for this event",
            });
        }

        const registration = await Registration.create({
            userId,
            eventId,
        });

        event.registrations += 1;
        await event.save();

        res.status(201).json({
            message: "Registration successful",
            registration,
        });
    } catch (error) {
        console.error("Error registering for event:", error);
        res.status(500).json({
            message: "Failed to register for event",
            error: error.message,
        });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch user details
        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Fetch events the user has registered for
        const registrations = await Registration.findAll({
            where: { userId },
            include: [
                {
                    model: Event,
                },
            ],
        });

        const registeredEvents = registrations.map(
            (registration) => registration.eventId
        );

        res.status(200).json({
            user,
            registeredEvents,
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({
            message: "Failed to fetch user profile",
            error: error.message,
        });
    }
};

module.exports = { registerEvent, getUserProfile };
