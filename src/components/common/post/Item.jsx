import React from 'react'

const Item = ({ title, desc, author, src, like, comments, date }) => {
    return (
        <div className='item_wrapper'>
            <div className='flex'>
                <div className='content-wrapper'>
                    <p className='item_author'>{author}</p>
                    <h3 className='item_title'>{title}</h3>
                    <p className='item_desc'>{desc}</p>
                </div>
                <img src={src} className='item_img' />
            </div>
            <div className='sub_wrapper'>
                <p>♥{like}</p>
                <p>✍🏻{comments}</p>
                <p>{date}</p>
            </div>
        </div>
    )
}

export default Item
