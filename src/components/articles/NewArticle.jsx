import { postList } from '../../data/post';
import React, { useEffect, useState } from 'react'
import Item from '../common/post/Item';
import { Link } from 'react-router-dom';
import { getBlogList } from '../../api/blog';


const NewArticle = () => {
    const [postList, setPostList] = useState([])
    console.log(postList)
    useEffect(() => {
        const getBlog = async () => {
            let result = await getBlogList({ orderType: 'desc' })
            setPostList(result.data.list)
        }
        getBlog()
    }, [])

    return (
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
    )
}

export default NewArticle
