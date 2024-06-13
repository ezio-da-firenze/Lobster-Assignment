const Registration = require("../models/Registration");
const User = require("../models/User");
const Event = require("../models/Event");

// Event registration controller for user
const registerEvent = async (req, res) => {
    try {
        const { eventId } = req.body;

        // req.user is set in the middleware
        const user = req.user;
        if (!user) {
            return res.status(403).json({ message: "Not logged in " });
        }
        const userId = user.id;

        const event = await Event.findByPk(eventId);
        // Checks for event not found
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

        // Creating an entry in the Registrations table
        const registration = await Registration.create({
            userId,
            eventId,
        });

        // Increasing the number of registration by one for that event
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

// Get user profile and registered events controller
const getUserProfile = async (req, res) => {
    try {
        // req.user is set in the middleware
        const userId = req.user.id;

        // Fetch user details
        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Fetch events the user has registered
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

        // Send the user details and the registered events (only ids)
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

// Controller to cancel event registration
const removeEvent = async (req, res) => {
    try {
        const { eventId } = req.body;
        // req.user is set in the middleware
        const userId = req.user.id;

        const registration = await Registration.findOne({
            where: { userId, eventId },
        });

        // If the registration doesn't exist
        if (!registration) {
            return res.status(404).json({
                message: "Registration not found",
            });
        }

        // Delete the registration entry
        await registration.destroy();

        // Decrease the registration count of the event
        const event = await Event.findByPk(eventId);
        if (event) {
            event.registrations -= 1;
            await event.save();
        }

        res.status(200).json({
            message: "Event registration cancelled successfully",
        });
    } catch (error) {
        console.error("Error cancelling event registration:", error);
        res.status(500).json({
            message: "Failed to cancel event registration",
            error: error.message,
        });
    }
};

module.exports = { registerEvent, getUserProfile, removeEvent };
