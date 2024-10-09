import React, { useState, useEffect } from 'react'
import Item from '../common/post/Item';
import { Link } from 'react-router-dom';
import TagList from '../common/tag/TagList';
import { getBlogList, getTagList } from '../../api/blog';
import { useUser } from '../../context/UserContext';


const TagArticle = () => {
    const [postList, setPostList] = useState([])
    const [currentTag, setCurrentTag] = useState('')
    const [tagList, setTagList] = useState([])
    const { user } = useUser();
    useEffect(() => {

        const getTag = async () => {
            let result = await getTagList()
            setTagList(result.data)
        }
        user.isLogin && getTag()
    }, [])

    useEffect(() => {
        const getBlog = async () => {
            let result = currentTag ? await getBlogList({ searchCon: currentTag }) : await getBlogList()
            let data = result.data
            setPostList(data.list)

        }
        getBlog()
    }, [currentTag])

    return (
        <div className='select_wrapper'>
            <TagList tagList={tagList} onClick={(curr) => setCurrentTag(curr)} />
            <div className='article_wrapper'>
                <div className='flex-col'>
                    {postList.slice(0, 6).map(post => (
                        <Link to={`/blog/${post.blogId}/${post.blogPostId}`}>
                            <Item title={post.blogPostTitle} desc={post.blogPostCon} author={post.blogId}
                                src={post.src} date={post.rgsnTs} like={post.postViewsCnt} comments={post.postCommentCnt}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TagArticle
