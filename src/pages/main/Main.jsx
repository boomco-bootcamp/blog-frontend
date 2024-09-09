import React from 'react'
import banner from '../../assets/img/til_banner.png';
import { bannerText } from '../../data/text';
import RecommendArticle from '../../components/articles/RecommendArticle';
import NewArticle from '../../components/articles/NewArticle';
import CategoryArticle from '../../components/articles/CategoryArticle';
import TagArticle from '../../components/articles/TagArticle';
import { listSample } from '../../data/main';
import TagList from '../../components/common/tag/TagList';

const Main = () => {
    return (
        <div className='flex-col flex-center'>
            {/* <img src={banner} className='banner_img' alt='main_banner_img' /> */}
            <section className='flex'>
                <div>
                    <h3 className='banner_title'>나만의 공부 일기장</h3>
                    <p className='banner_text'>{bannerText}</p>
                </div>
                <RecommendArticle />
            </section>
            <section>
                <div className='flex'>
                    <div>
                        <h3 className='sub'>최근 게시글</h3>
                        <p className='recommend_desc'>따끈따근한 소식을 알아봐요!</p>
                        <NewArticle />
                    </div>
                    <div>
                        <h3 className='sub'><span>태그 별 게시글</span>/<span>카테고리 별 게시글</span></h3>
                        <TagList initialTags={listSample} />
                        <CategoryArticle />
                    </div>
                    {/* <TagArticle /> */}
                </div>
            </section>
        </div>
    )
}

export default Main