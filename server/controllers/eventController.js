const Event = require("../models/Event");

const addEvent = async (req, res) => {
    try {
        const { name, location, description, time, category } = req.body;
        const user = req.user;
        if (!name || !category || !time || !location) {
            return res
                .status(400)
                .json({ message: "Name and category are required" });
        }
        const event = await Event.create({
            name,
            location,
            description,
            time,
            category,
            college: user.college,
            createdBy: user.username,
        });

        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        console.error("Error adding event:", error);
        res.status(500).json({
            message: "Failed to add event",
            error: error.message,
        });
    }
};

const allEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch events",
            error: error.message,
        });
    }
};

const getEventById = async (req, res) => {
    const eventId = req.params.id;
    try {
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch event",
            error: error.message,
        });
    }
};

module.exports = { addEvent, allEvents, getEventById };
