import { postList } from '../../data/post';
import React, { useState, useEffect } from 'react'
import Item from '../common/post/Item';
import { Link } from 'react-router-dom';
import TagList from '../common/tag/TagList';
import { getBlogList } from '../../api/blog';


const TagArticle = () => {
    const [postList, setPostList] = useState([])
    const [currentTag, setCurrentTag] = useState('아침')
    const [tagList, setTagList] = useState(['아침'])

    useEffect(() => {
        const getBlog = async () => {
            let result = currentTag ? await getBlogList({ searchCon: currentTag }) : await getBlogList()
            let data = result.data
            setPostList(data.list)

        }
        getBlog()
    }, [currentTag])

    return (
        <div className='article_wrapper'>
            {/* <TagList categoryList={categoryList} onClick={(curr) => setCurrentCategory(curr)} /> */}
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
    )
}

export default TagArticle
