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
import BlogAdmin from "../pages/blog/BlogAdmin";
import BlogRecent from "../pages/blog/BlogRecent";
import BlogRecommend from "../pages/blog/BlogRecommend";

const Router = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Main />} />
                    {/* 로그인 & 회원가입 */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    {/* 마이페이지 */}
                    <Route path="/mypage" element={<MyPage />} />
                    {/* 유저 별 블로그 홈 */}
                    <Route path="/blog/:userId" element={<Blog />} />
                    {/* 블로그 글 리스트 & 상세 */}
                    <Route path="/blog/:userId/list" element={<BlogList />} />
                    <Route path="/blog/:userId/:id" element={<BlogDetail />} />

                    <Route path="/blog/:userId/list/recent" element={<BlogRecent />} />
                    <Route path="/blog/:userId/list/recommend" element={<BlogRecommend />} />


                    {/* 블로그 글 작성 & 수정 */}
                    <Route path="/blog/post/:id/create" element={<BlogCreate />} />
                    <Route path="/blog/post/:id/edit" element={<BlogEdit />} />

                    {/* 블로그 관리 */}
                    <Route path="/blog/admin" element={<BlogAdmin />} />
                </Routes>
            </Layout>
        </BrowserRouter>

    )
}

export default Router