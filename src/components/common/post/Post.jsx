import React from 'react'

const Post = ({ src, title, author }) => {
    return (
        <div className={`post_wrapper ${!src && 'no_src'}`}>
            <img className='post_img' src={src} />
            <h3 className='post_title'>"<br />{title}<br />"</h3>
            <h3 className='post_author'>{author}</h3>
        </div>
    )
}

export default Post
