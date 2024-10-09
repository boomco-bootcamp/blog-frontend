import { Link } from 'react-router-dom';
import React, { useState } from 'react'

const TagList = ({ tagList, onClick }) => {

    const [selectedTag, setSelectedTag] = useState(null);

    // 태그 선택/해제 함수
    const toggleTag = (tag) => {
        setSelectedTag(tag.blogLikeTagId);
    };

    return (
        <div className="tag-list-container">
            <div className="tag-list">
                {!tagList.length ?
                    <div className='tag-list-none'>
                        <Link to='/mypage'>등록된 태그가 없어요! 등록하러 가볼까요?</Link>
                    </div> :
                    tagList.map((tag) => (
                        <button
                            key={tag.blogLikeTagId}
                            onClick={() => { toggleTag(tag); onClick && onClick(tag.blogLikeTagCon) }}
                            className={`tag-button ${selectedTag === tag.blogLikeTagId ? 'selected' : ''}`}
                        >
                            {tag.blogLikeTagCon}
                        </button>
                    ))}
            </div>
        </div>
    )
}

export default TagList
