import banner from '../../assets/img/til_banner.png';
import React, { useEffect, useState } from 'react'
import RecommendArticle from '../../components/articles/RecommendArticle';
import { Link, useParams } from 'react-router-dom';
import { getBlogInfo, getMyBlogList } from '../../api/blog';
import sampleImg from '../../assets/sample/img/bg_img01.png'
import { formatDate } from '../../util/date'
import Pagination from '../../components/common/Pagination';
import { useUser } from '../../context/UserContext';

const Blog = () => {
    const { user } = useUser();
    const [postList, setPostList] = useState([])
    const [bannerImage, setBannerImage] = useState("");
    const [text, setText] = useState("")
    const { userId } = useParams()
    const [paging, setPaging] = useState({
        endPage: "",
        next: "",
        page: 1,
        prev: false,
        record: "",
        startPage: "",
        total: "",
        totalPage: ""
    })

    useEffect(() => {
        const getMyData = async () => {
            const res = await getBlogInfo(user.userId ?? userId);
            setText(res.data.blogCon)

            setBannerImage(`${process.env.REACT_APP_BASE_URL}/api/file/download/${res.data.blogBannerFileId}`)
            // const res = await getMyBlogList(JSON.parse(localStorage.getItem('userInfo')).userId)
            // setBlogData(res.data.list)
        }
        getMyData()
    }, [])

    const handlePaging = (current) => {
        setPaging({ ...paging, page: current.page })
    }

    useEffect(() => {
        const getBlog = async () => {
            let result = await getMyBlogList(userId)
            setPostList(result.data.list)
        }
        getBlog()
    }, [])

    return (
        <div className="blog_admin_wrap blog_mypage">
            <div className="img_banner">
                <img src={bannerImage} alt="banner" />
            </div>
            <div className="section_wrap">
                <section className='flex'>
                    <div>
                        <h3 className='banner_title'>{userId}님의 블로그</h3>
                        <div className="text_wrap">
                            <div className='banner_text'>
                                <div className="rrr">{text}</div>
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
                        <div className='flex'>
                            <div>
                                <h3 className='sub'>{userId}님의 게시글</h3>

                                <div className='blog_list_wrap'>
                                    <ul className="blog_list">
                                        {
                                            postList.map((item, idx) => (
                                                <Link to={`/blog/${item.blogId}/${item.blogPostId}`}>
                                                    <li className="blog_item" key={idx}>
                                                        <a href="#" className="blog_item_inner">
                                                            <div className="img_wrap">
                                                                <img src={item.img ? item.img : sampleImg} alt="image" />
                                                            </div>
                                                            <div className="content_wrap">
                                                                <p className="title">{item.blogPostTitle}</p>
                                                                <p className="content_text" dangerouslySetInnerHTML={{ __html: item.blogPostCon }}></p>
                                                                <p className="date">{formatDate(item.rgsnTs)}</p>
                                                            </div>
                                                            <div className="text_wrap">
                                                                <div className="like">♥ {item.postLikeCnt}</div>
                                                                <div className="view">✍🏻 {item.postCommentCnt}</div>
                                                            </div>
                                                            <div className="tag_list">
                                                                {
                                                                    item.tagList && item.tagList.map((tag, idx) => (
                                                                        <div className="tag" key={idx}>{tag.blogTagCon}</div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </a>
                                                    </li>
                                                </Link>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <Pagination pagingData={paging} handlePaging={handlePaging} />
                            </div>

                        </div>
                    </section>

                </section>
            </div>

        </div>

    )
}

export default Blog
