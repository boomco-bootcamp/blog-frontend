import { userRow } from '../../data/db/db';
import banner from '../../assets/img/til_banner.png';
import React from 'react'
import { AdminData } from '../../data/db/text';
import RecommendArticle from '../../components/articles/RecommendArticle';
import NewArticle from '../../components/articles/NewArticle';
import CategoryArticle from '../../components/articles/CategoryArticle';
import TagArticle from '../../components/articles/TagArticle';

const Blog = () => {
    return (

        <div className="blog_admin_wrap">
            <div className="img_banner">
                <img src={banner} alt="banner" /> {/* bannerImage 상태를 사용 */}
            </div>
            {/* <img src={banner} className='banner_img' alt='main_banner_img' /> */}
            <section className='flex'>
                <div>
                    <h3 className='banner_title'>{userRow[0].name}님의 블로그</h3>
                    <div className="text_wrap">
                        <p className='banner_text'>{AdminData.introduce}</p>
                    </div>
                </div>
                {/* <RecommendArticle /> */}
            </section>
            <section>
                <div>
                    <div className="content_item">
                        <RecommendArticle />
                        <table>
                            <caption>방문자 수 통계</caption>
                            <thead>
                                <tr>
                                    <th scope="col">날짜</th>
                                    <th scope="col">방문자 수</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    AdminData.visitor.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>{item.date}</td>
                                            <td>{item.visit}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th scope="row">총 방문자 수</th>
                                    <td>1500명</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <section>
                        <div>
                            <input type="text" placeholder={"게시글 검색하기"} />
                        </div>
                        <div className='flex'>

                            <NewArticle />
                            <CategoryArticle />
                            <TagArticle />
                        </div>
                    </section>
                </div>
            </section>
        </div>

    )
}

export default Blog
