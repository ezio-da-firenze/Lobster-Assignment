import React, { createContext, useState } from "react";
import axios from "axios";

export const EventDetailContext = createContext();

const BASE_URL = "https://lobster-assignment-backend.onrender.com";

export const EventDetailProvider = ({ children }) => {
    const [eventDetail, setEventDetail] = useState(null);
    const [loadingEvent, setLoadingEvent] = useState(true);
    const [eventError, setEventError] = useState(null);

    const fetchEventDetail = async (id) => {
        setLoadingEvent(true);
        try {
            const response = await axios.get(
                `${BASE_URL}/api/v1/events/${id}`,
                {
                    withCredentials: true,
                }
            );
            setEventDetail(response.data.event || response.data);
        } catch (err) {
            setEventError(err);
        } finally {
            setLoadingEvent(false);
        }
    };

    return (
        <EventDetailContext.Provider
            value={{
                eventDetail,
                loadingEvent,
                eventError,
                fetchEventDetail,
                setEventDetail,
            }}
        >
            {children}
        </EventDetailContext.Provider>
    );
};
