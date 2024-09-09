import banner from '../../assets/img/til_banner.png';
import React, { useState } from 'react'
import { AdminData } from '../../data/db/text';
import RecommendArticle from '../../components/articles/RecommendArticle';
import NewArticle from '../../components/articles/NewArticle';
import CategoryArticle from '../../components/articles/CategoryArticle';
import TagArticle from '../../components/articles/TagArticle';
import { useUser } from '../../context/UserContext';
import { listSample } from '../../data/main';
import TagList from '../../components/common/tag/TagList';

const Blog = () => {
    const { user, login, logout } = useUser();
    const [tab, setTab] = useState('tag')

    const handleClickTab = (value) => () => {
        setTab(value)
    }
    return (
        <div className="blog_admin_wrap">
            <div className="img_banner">
                <img src={banner} alt="banner" /> {/* bannerImage 상태를 사용 */}
            </div>
            {/* <img src={banner} className='banner_img' alt='main_banner_img' /> */}
            <section className='flex'>
                <div>
                    <h3 className='banner_title'>{user.name}님의 블로그</h3>

                    <div className="text_wrap">
                        <p className='banner_text'>{AdminData.introduce}</p>
                        <p className='banner_text'>오늘 방문자 : 10 / 전체 방문자 : 200</p>
                    </div>
                </div>
                {/* <RecommendArticle /> */}
                <div className="content_item">
                    <RecommendArticle />
                </div>
            </section>
            <section>

                <section>
                    <div>
                        <input type="text" placeholder={"게시글 검색하기"} />
                    </div>
                    <div className='flex'>
                        <div>
                            <h3 className='sub'>최근 게시글</h3>
                            <p className='recommend_desc'>따끈따근한 소식을 알아봐요!</p>
                            <NewArticle />
                        </div>
                        <div>
                            <h3 className='sub'><span onClick={handleClickTab('tag')}
                                style={{ color: tab === 'category' ? 'gray' : "" }}
                            >태그 별 게시글</span>/<span onClick={handleClickTab('category')}
                                style={{ color: tab === 'tag' ? 'gray' : "" }}
                            >카테고리 별 게시글</span></h3>
                            <TagList initialTags={tab === 'tag' ? listSample : listSample} />
                            {tab === 'category' ? <CategoryArticle /> :
                                <TagArticle />}
                        </div>
                    </div>
                </section>

            </section>
        </div>

    )
}

export default Blog
