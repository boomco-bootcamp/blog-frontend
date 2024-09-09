import { postList } from '../../data/post';
import Post from '../common/post/Post';
import React from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';


const RecommendArticle = () => {
    return (
        <div className='article_wrapper'>
            <h3 className='sub'>추천 게시글</h3>
            <div className='flex-wrap swiper_wrapper'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={16}
                    pagination={{ clickable: true }}
                    autoplay
                >
                    {postList.slice(0, 6).map(post => (
                        <SwiperSlide>
                            <Post title={post.title} src={post.src} author={post.author} />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    )
}

export default RecommendArticle
