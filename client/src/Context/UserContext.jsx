import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userEvents, setUserEvents] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/user/profile',
        { withCredentials: true }
      );
      setUser(response.data.user);
      setUserEvents(response.data.registeredEvents);
    } catch (error) {
      console.error('Error fetching user:', error);
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
      setUserEvents(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, userEvents, isAdmin, fetchUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
