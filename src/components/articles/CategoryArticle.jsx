import { postList } from '../../data/post';
import React from 'react'
import Item from '../common/post/Item';
import TagList from '../common/tag/TagList';
import { listSample } from '../../data/main';


const CategoryArticle = () => {
    return (
        <div className='article_wrapper'>
            <div className='flex-col'>
                {postList.slice(0, 6).map(post => (
                    <Item title={post.title} desc={post.desc} author={post.author}
                        src={post.src} date={post.date} like={post.like} comments={post.comments}
                    />
                ))}

            </div>
        </div>
    )
}

export default CategoryArticle
