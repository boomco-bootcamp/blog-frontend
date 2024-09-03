import { postList } from '../../data/post';
import React from 'react'
import Item from '../../components/common/post/Item';


const NewArticle = () => {
    return (
        <div className='article_wrapper'>
            <h3 className='sub'>최근 게시글</h3>
            <p className='recommend_desc'>따끈따근한 소식을 알아봐요!</p>
            <div className='flex-col'>

                {postList.slice(0, 6).map(post => (
                    <Item title={post.title} desc={post.desc} />
                ))}

            </div>
        </div>
    )
}

export default NewArticle
