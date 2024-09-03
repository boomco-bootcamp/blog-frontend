import React from 'react'

const Post = ({ src, title, desc }) => {
    return (
        <div className='post_wrapper'>
            <h3 className='post_title'>{title}</h3>
            <div className='flex-between'>
                <img className='post_img' src={src} />
                <p className='post_desc'>{desc}</p>
            </div>
        </div>
    )
}

export default Post
