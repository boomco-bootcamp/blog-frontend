import { Link } from 'react-router-dom';
import React, { useState } from 'react'

const CategoryList = ({ categoryList, onClick }) => {

    const [selectedTag, setSelectedTag] = useState(null);

    // 태그 선택/해제 함수
    const toggleTag = (tag) => {
        setSelectedTag(tag.blogPostCatId);
    };

    return (
        <div className="tag-list-container">
            <div className="tag-list">
                {!categoryList ?
                    <div>
                        <Link to='/mypage'>등록된 카테고리가 없어요! 등록하러 가볼까요?</Link>
                    </div>
                    :
                    categoryList.map((tag) => (
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

export default CategoryList
