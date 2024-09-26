import React from 'react';
import { Navigate } from 'react-router-dom';

// 권한 검사를 위한 컴포넌트
const PrivateRoute = ({ children }) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('userInfo')); // 예: LocalStorage에서 토큰 또는 인증 정보 확인
    if (!isAuthenticated?.loginStatus) {
        // 권한이 없으면 로그인 페이지로 리다이렉트
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;