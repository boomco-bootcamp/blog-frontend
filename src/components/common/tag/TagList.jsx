import { getCategoryList } from '../../../api/blog'
import React, { useState, useEffect } from 'react'

const TagList = ({ list, onClick }) => {

    const [selectedTag, setSelectedTag] = useState(null);

    // 태그 선택/해제 함수
    const toggleTag = (tag) => {
        setSelectedTag(tag.blogPostCatId);
    };

    return (
        <div className="tag-list-container">
            <div className="tag-list">
                {list.map((tag) => (
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
