import React, { useState } from 'react'

const TagList = ({ initialTags }) => {
    const [selectedTag, setSelectedTag] = useState(null);

    // 태그 선택/해제 함수
    const toggleTag = (tag) => {
        setSelectedTag(tag);
    };

    return (
        <div className="tag-list-container">
            <div className="tag-list">
                {initialTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`tag-button ${selectedTag === tag ? 'selected' : ''}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default TagList
