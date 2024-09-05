import { postList } from '../../data/post';
import React from 'react'
import Item from '../common/post/Item';
import TagList from '../common/tag/TagList';
import { listSample } from '../../data/main';


const CategoryArticle = () => {
    return (
        <div className='article_wrapper'>
            <h3 className='sub'>카테고리 별 게시글</h3>
            <TagList initialTags={listSample} />
            <div className='flex-col'>

                {postList.slice(0, 6).map(post => (
                    <Item title={post.title} desc={post.desc} />
                ))}

            </div>
        </div>
    )
}

export default CategoryArticle
