import { Link } from 'react-router-dom';
import React, { useState } from 'react'

const CategoryList = ({ categoryList, onClick }) => {

    const [selectedTag, setSelectedTag] = useState(null);

    // 태그 선택/해제 함수
    const toggleTag = (tag) => {
        setSelectedTag(tag.blogPostCatId);
    };

    return (
        <div className="category_item">
            <div className="chip_list">
                {!categoryList ?
                    <div>
                        <Link to='/mypage'>등록된 카테고리가 없어요! 등록하러 가볼까요?</Link>
                    </div>
                    :
                    categoryList.map((tag) => (
                        <button
                            key={tag.blogPostCatId}
                            onClick={() => { toggleTag(tag); onClick && onClick(tag.blogPostCatId) }}
                            className={`chip_item ${selectedTag === tag.blogPostCatId ? 'active' : ''}`}
                        >
                            {tag.blogPostCatNm}
                        </button>
                    ))}
            </div>
        </div>
    )
}

export default CategoryList
