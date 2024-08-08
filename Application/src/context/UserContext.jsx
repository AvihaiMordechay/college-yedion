// src/contexts/UserContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

// יצירת הקונטקסט
const UserContext = createContext(null);

// ה-Provider שיספק את המידע לכל הרכיבים
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// הוק מותאם לשימוש בקונטקסט
export const useUser = () => {
  return useContext(UserContext);
};
