import React, { useEffect, useState } from 'react'
import Item from '../common/post/Item';
import TagList from '../common/tag/TagList';
import { Link } from 'react-router-dom';
import { getBlogList, getCategoryList } from '../../api/blog';


const CategoryArticle = () => {
    const [postList, setPostList] = useState([])
    const [currentCategory, setCurrentCategory] = useState()
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        const getCategory = async () => {
            let result = await getCategoryList()
            setCategoryList(result.data)

            // setCategoryList(result)
        }
        getCategory()
    }, [])

    useEffect(() => {
        const getBlog = async () => {
            let result = currentCategory ? await getBlogList({ stdyCatId: currentCategory }) : await getBlogList()
            let data = result.data
            setPostList(data.list)

        }
        getBlog()
    }, [currentCategory])
    return (
        <div>
            <TagList categoryList={categoryList} onClick={(curr) => setCurrentCategory(curr)} />
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
        </div>
    )
}

export default CategoryArticle
