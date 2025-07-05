const Event = require("../models/Event");
const Registration = require("../models/Registration");
const User = require("../models/User");
const redis = require("../utils/redisClient");

const addEvent = async (req, res) => {
    try {
        const { name, location, description, time, category } = req.body;
        const user = req.user;

        if (!name || !category || !time || !location) {
            return res
                .status(400)
                .json({ message: "Please enter all necessary fields." });
        }

        const thumbnail = req.file ? req.file.path : null;

        const event = await Event.create({
            name,
            location,
            description,
            time,
            category,
            college: user.college,
            createdBy: user.username,
            thumbnail,
        });

        // Invalidate events cache
        await redis.del("events:all");

        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        console.error("Error adding event:", error);
        res.status(500).json({
            message: "Failed to add event",
            error: error.message,
        });
    }
};

// Fetch all events
const allEvents = async (req, res) => {
    const cacheKey = "events:all";

    try {
        const cachedEvents = await redis.get(cacheKey);
        if (cachedEvents) {
            console.log("✅ Served from Redis cache...");
            return res.status(200).json(JSON.parse(cachedEvents));
        }

        const events = await Event.findAll();

        await redis.set(cacheKey, JSON.stringify(events), "EX", 300);

        console.log("💾 Cached events in Redis...");
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch events",
            error: error.message,
        });
    }
};

// Fetch event by its id
const getEventById = async (req, res) => {
    const eventId = req.params.id;
    const cacheKey = `event:${eventId}`;

    try {
        const cachedEvent = await redis.get(cacheKey);
        if (cachedEvent) {
            console.log(`✅ Served event ${eventId} from cache`);
            return res.status(200).json(JSON.parse(cachedEvent));
        }

        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        await redis.set(cacheKey, JSON.stringify(event), "EX", 300); // Cache for 5 mins
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch event",
            error: error.message,
        });
    }
};

// Fetch events that user has regietered for
const getMyEvents = async (req, res) => {
    try {
        // req.user is set in the middleware
        const userId = req.user.id;

        // Fetch all events in the registrations table for the user: userId
        const registrations = await Registration.findAll({
            where: { userId },
            attributes: ["eventId"],
        });

        const eventIds = registrations.map(
            (registration) => registration.eventId
        );

        const events = await Event.findAll({
            where: { id: eventIds },
        });

        res.status(200).json({ events });
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Failed to fetch events" });
    }
};

module.exports = { addEvent, allEvents, getEventById, getMyEvents };
