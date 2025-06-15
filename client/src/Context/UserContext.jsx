import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [error, setError] = useState(null);

    const BASE_URL = "https://lobster-assignment-backend.onrender.com";

    const fetchUser = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/v1/user/profile`,
                { withCredentials: true }
            );
            setUser(response.data.user);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                logout();
            } else {
                setError(error);
            }
        } finally {
            setLoadingUser(false);
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/events/my`, {
                withCredentials: true,
            });
            setEvents(response.data.events);
        } catch (error) {
            setError(error);
        } finally {
            setLoadingEvents(false);
        }
    };

    const logout = async () => {
        try {
            await axios.post(
                `${BASE_URL}/api/v1/auth/logout`,
                {},
                {
                    withCredentials: true,
                }
            );
            setUser(null);
            setEvents([]);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchUser();
        fetchEvents();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                isAdmin,
                events,
                loadingUser,
                loadingEvents,
                error,
                fetchUser,
                fetchEvents,
                setEvents,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
