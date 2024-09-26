import React, { useEffect, useState } from 'react'
import Item from '../common/post/Item';
import { Link } from 'react-router-dom';
import { getBlogList, getCategoryList } from '../../api/blog';
import CategoryList from '../common/tag/CategoryList';


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
            <CategoryList categoryList={categoryList} onClick={(curr) => setCurrentCategory(curr)} />
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
        </div>
    )
}

export default CategoryArticle
