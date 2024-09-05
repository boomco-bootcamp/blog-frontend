import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Main from '../pages/main/Main';
import SignUp from '../pages/login/SignUp';
import Login from '../pages/login/Login';
import MyPage from '../pages/mypage/MyPage';
import BlogList from '../pages/blog/BlogList';
import BlogCreate from '../pages/blog/BlogCreate';
import BlogEdit from '../pages/blog/BlogEdit';
import BlogDetail from '../pages/blog/BlogDetail';
import Blog from '../pages/blog/Blog';
import Password from "../pages/login/Password";

const Router = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Main />} />
                    {/* 로그인 & 회원가입 */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/password" element={<Password />} />
                    {/* 마이페이지 */}
                    <Route path="/mypage" element={<MyPage />} />
                    {/* 유저 별 블로그 홈 */}
                    <Route path="/blog/:userId" element={<Blog />} />
                    {/* 블로그 글 리스트 & 상세 */}
                    <Route path="/blog/post/list" element={<BlogList />} />
                    <Route path="/blog/post/:id" element={<BlogDetail />} />
                    {/* 블로그 글 작성 & 수정 */}
                    <Route path="/blog/post/:id/create" element={<BlogCreate />} />
                    <Route path="/blog/post/:id/edit" element={<BlogEdit />} />
                </Routes>
            </Layout>
        </BrowserRouter>

    )
}

export default Router