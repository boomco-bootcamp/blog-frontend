import React from 'react'

const Item = ({ title, desc }) => {
    return (
        <div className='item_wrapper'>
            <h3 className='item_title'>{title}</h3>
            <div className='flex-between'>
                <p className='item_desc'>{desc}</p>
            </div>
        </div>
    )
}

export default Item
