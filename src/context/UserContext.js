import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialUserState = {
    name: null,
    userId: null,
    loginStatus: false,
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(initialUserState);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('userInfo'));
        if (storedUser) {
            setUser((prevState) => ({
                ...prevState,
                ...storedUser,
                loginStatus: true,
            }));
        }
    }, []);


    const login = (userInfo) => {
        const updatedUser = { ...userInfo, loginStatus: true };
        setUser(updatedUser);
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
    };

    const logout = () => {
        setUser(initialUserState);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userInfo');
        window.location.href = '/';
    };

    const value = {
        user,
        login,
        logout,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};


