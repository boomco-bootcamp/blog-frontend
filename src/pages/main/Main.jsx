import React, { useState } from 'react'
import { bannerText } from '../../data/text';
import RecommendArticle from '../../components/articles/RecommendArticle';
import NewArticle from '../../components/articles/NewArticle';
import CategoryArticle from '../../components/articles/CategoryArticle';
import TagArticle from '../../components/articles/TagArticle';
import { listSample } from '../../data/main';
import TagList from '../../components/common/tag/TagList';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';


const Main = () => {
    const { user, login, logout } = useUser();
    const [tab, setTab] = useState('tag')

    const handleClickTab = (value) => () => {
        setTab(value)
    }

    return (
        <div className='flex-col flex-center'>
            <section className='flex'>
                <div>
                    <h3 className='banner_title'>{user.loginStatus ? `${user.name}님, 안녕하세요.` :
                        "나만의 공부 일기장"
                    }</h3>
                    <p className='banner_text'>{bannerText}
                        <br />
                        {user.loginStatus &&
                            <div className='flex-center'>
                                <Link to={`blog/${user.userId}`}>
                                    <button className='blog_btn'>내 블로그</button>
                                </Link>
                            </div>}
                    </p>
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
                        <h3 className='sub'><span onClick={handleClickTab('tag')}
                            style={{ color: tab === 'category' ? 'gray' : "" }}
                        >태그 별 게시글</span>/<span onClick={handleClickTab('category')}
                            style={{ color: tab === 'tag' ? 'gray' : "" }}
                        >카테고리 별 게시글</span></h3>
                        <TagList initialTags={tab === 'tag' ? listSample : listSample} />
                        {tab === 'category' ? <CategoryArticle /> :
                            <TagArticle />}
                    </div>
                    {/* <TagArticle /> */}
                </div>
            </section>
        </div>
    )
}

export default Main