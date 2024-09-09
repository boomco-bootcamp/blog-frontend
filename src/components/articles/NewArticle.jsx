import { postList } from '../../data/post';
import React from 'react'
import Item from '../common/post/Item';
import { Link } from 'react-router-dom';


const NewArticle = () => {
    return (
        <div className='article_wrapper'>
            <div className='flex-col'>

                {postList.slice(0, 6).map(post => (
                    <Link to={`/blog/1/1`}>
                        <Item title={post.title} desc={post.desc} author={post.author}
                            src={post.src} date={post.date} like={post.like} comments={post.comments}
                        />
                    </Link>
                ))}

            </div>
        </div>
    )
}

export default NewArticle
