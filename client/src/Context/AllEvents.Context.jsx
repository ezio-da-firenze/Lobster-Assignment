import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AllEventsContext = createContext();

export const AllEventsProvider = ({ children }) => {
    const [allEvents, setAllEvents] = useState([]);
    const [loadingAllEvents, setLoadingAllEvents] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [error, setError] = useState(null);

    const BASE_URL = "https://lobster-assignment-backend.onrender.com";

    const fetchAllEvents = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/events/all`, {
                withCredentials: true,
            });
            setAllEvents(response.data);
        } catch (err) {
            console.error("Error fetching all events:", err);
            setError(err);
        } finally {
            setLoadingAllEvents(false);
        }
    };

    const filteredEvents = allEvents.filter((event) =>
        event.name.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        fetchAllEvents();
    }, []);

    return (
        <AllEventsContext.Provider
            value={{
                allEvents,
                loadingAllEvents,
                error,
                searchText,
                setSearchText,
                filteredEvents,
                fetchAllEvents,
            }}
        >
            {children}
        </AllEventsContext.Provider>
    );
};
