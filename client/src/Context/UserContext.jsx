import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/user/profile',
        { withCredentials: true }
      );
      setUser(response.data.user);
    } catch (error) {
      setError(error);
    } finally {
      setLoadingUser(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/events/my',
        { withCredentials: true }
      );
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
        'http://localhost:3000/api/v1/auth/logout',
        {},
        { withCredentials: true }
      );
      setUser(null);
      setEvents([]); // Clear events on logout
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchEvents(); // Fetch events when component mounts
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
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
