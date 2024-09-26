import { getCategoryList } from '../../../api/blog'
import React, { useState, useEffect } from 'react'

const TagList = ({ initialTags, onClick }) => {
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        const getCategory = async () => {
            let result = await getCategoryList()
            setCategoryList(result.data)

            // setCategoryList(result)
        }
        getCategory()
    }, [])
    const [selectedTag, setSelectedTag] = useState(null);

    // 태그 선택/해제 함수
    const toggleTag = (tag) => {
        setSelectedTag(tag.blogPostCatId);
    };

    return (
        <div className="tag-list-container">
            <div className="tag-list">
                {categoryList.map((tag) => (
                    <button
                        key={tag.blogPostCatId}
                        onClick={() => { toggleTag(tag); onClick && onClick(tag.blogPostCatId) }}
                        className={`tag-button ${selectedTag === tag.blogPostCatId ? 'selected' : ''}`}
                    >
                        {tag.blogPostCatNm}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default TagList
