import React, { createContext, useContext, useState, useEffect } from 'react';

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
        setUser((prevState) => ({
            ...prevState,
            ...updatedUser,
            loginStatus: true,
        }));
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
    };

    const logout = () => {
        if (localStorage.getItem('social') === 'kakao') {

            const Rest_api_key = process.env.REACT_APP_KAKAO_API; // REST API KEY
            const redirect_uri = `${process.env.REACT_APP_FRONT_URL}/kakao/oauth`; // Redirect URI
            const encodedRedirectUri = encodeURIComponent(redirect_uri); // 인코딩된 URI
            // OAuth 요청 URL
            const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${encodedRedirectUri}&response_type=code`;
            if (!Rest_api_key) {
                console.error("Kakao API Key is missing!");
                return;
            }
            window.location.href = kakaoURL;
        }
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


