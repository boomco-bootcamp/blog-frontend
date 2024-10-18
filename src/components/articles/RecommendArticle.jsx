import Post from '../common/post/Post';
import React, { useEffect, useState } from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { getBlogList } from '../../api/blog';


const RecommendArticle = () => {
    const [postList, setPostList] = useState([])

    useEffect(() => {
        const getBlog = async () => {
            let result = await getBlogList({ orderType: 'view' })
            setPostList(result.data.list)
        }
        getBlog()
    }, [])

    return (
        <div className='recommend_wrapper'>
            <Link to='/blog/list/recommend'>
                <h3 className='sub'>추천 게시글</h3>
            </Link>
            <div className='flex-wrap swiper_wrapper'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={16}
                    pagination={{ clickable: true }}
                    autoplay
                >
                    {postList.slice(0, 6).map(post => (
                        <SwiperSlide>
                            <Link to={`/blog/${post.amnnUserId}/${post.blogPostId}`}>
                                <Post title={post.blogPostTitle} post={post} author={post.blogNm} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    )
}

export default RecommendArticle
