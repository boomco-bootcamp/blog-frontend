import { postList } from '../../data/post';
import React from 'react'
import Item from '../common/post/Item';
import { Link } from 'react-router-dom';


const TagArticle = () => {
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

export default TagArticle
