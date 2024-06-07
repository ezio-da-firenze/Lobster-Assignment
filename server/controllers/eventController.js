const Event = require("../models/Event");

exports.addEvent = async (req, res) => {
    try {
        const { name, location, description, time, category } = req.body;

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
