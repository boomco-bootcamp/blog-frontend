import banner from '../../assets/img/til_banner.png';
import React, { useState } from 'react'
import { AdminData } from '../../data/db/text';
import RecommendArticle from '../../components/articles/RecommendArticle';
import NewArticle from '../../components/articles/NewArticle';
import CategoryArticle from '../../components/articles/CategoryArticle';
import TagArticle from '../../components/articles/TagArticle';
import { useUser } from '../../context/UserContext';
import TagList from '../../components/common/tag/TagList';
import { useParams } from 'react-router-dom';

const Blog = () => {
    const [tab, setTab] = useState('tag')
    const { userId } = useParams();
    const handleClickTab = (value) => () => {
        setTab(value)
    }
    return (
        <div className="blog_admin_wrap blog_mypage">
            <div className="img_banner">
                <img src={banner} alt="banner" /> {/* bannerImage 상태를 사용 */}
            </div>
            {/* <img src={banner} className='banner_img' alt='main_banner_img' /> */}

            <div className="section_wrap">
                <section className='flex'>
                    <div>
                        <h3 className='banner_title'>{userId}님의 블로그</h3>
                        <div className="text_wrap">
                            <div className='banner_text'>
                                <div className="rrr">{AdminData.introduce}</div>
                                <div className="rrr">오늘 방문자 : 10 / 전체 방문자 : 200</div>
                            </div>
                        </div>
                    </div>
                    {/* <RecommendArticle /> */}
                    <div className="content_item">
                        <RecommendArticle />
                    </div>
                </section>
                <section>

                    <section>
                        <div className="search_input_wrap">
                            <div className="search_input">
                                <input type="text" placeholder='게시글을 검색하세요.' />
                                <button>검색</button>
                            </div>
                        </div>
                        <div className='flex'>
                            <div>
                                <h3 className='sub'>최근 게시글</h3>
                                <p className='recommend_desc'>새콤달콤한 소식을 알아봐요!</p>
                                <NewArticle />
                            </div>
                            <div>
                                <h3 className='sub'><span onClick={handleClickTab('tag')}
                                    style={{ color: tab === 'category' ? 'gray' : "" }}
                                >태그 별 게시글</span>/<span onClick={handleClickTab('category')}
                                    style={{ color: tab === 'tag' ? 'gray' : "" }}
                                >카테고리 별 게시글</span></h3>
                                {/* {tab === 'tag' ? <TagList /> : <TagList />} */}
                                {tab === 'category' ? <CategoryArticle /> :
                                    <TagArticle />}
                            </div>
                        </div>
                    </section>

                </section>
            </div>

        </div>

    )
}

export default Blog
