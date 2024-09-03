import { postList } from '../../data/post';
import Post from '../../components/common/post/Post';
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
                    slidesPerView={2}
                    spaceBetween={16}
                    pagination={{ clickable: true }}
                >
                    {postList.slice(0, 6).map(post => (
                        <SwiperSlide>
                            <Post title={post.title} desc={post.desc} src={post.src} />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    )
}

export default RecommendArticle
