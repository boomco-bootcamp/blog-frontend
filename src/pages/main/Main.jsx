import React from 'react'
import banner from '../../assets/img/til_banner.png';
import { bannerText } from '../../data/text';
import RecommendArticle from '../../components/articles/RecommendArticle';
import NewArticle from '../../components/articles/NewArticle';
import CategoryArticle from '../../components/articles/CategoryArticle';
import TagArticle from '../../components/articles/TagArticle';

const Main = () => {
    return (
        <div>
            <img src={banner} className='banner_img' alt='main_banner_img' />
            <section className='flex'>
                <div>
                    <h3 className='banner_title'>나만의 공부 일기장</h3>
                    <p className='banner_text'>{bannerText}</p>
                </div>
                <RecommendArticle />
            </section>
            <section>
                <div className='flex'>
                    <NewArticle />
                    <CategoryArticle />
                    <TagArticle />
                </div>
            </section>
        </div>
    )
}

export default Main