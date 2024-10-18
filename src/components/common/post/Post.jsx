import React, { useEffect, useState } from 'react'

const Post = ({ post, title, author }) => {
    const [src, setSrc] = useState(null);
    useEffect(() => {
        // desc의 HTML을 파싱하고 img 태그를 찾아 제거
        const parser = new DOMParser();
        const doc = parser.parseFromString(post.blogPostCon, 'text/html');

        // 첫 번째 img 태그 찾기
        const imgElement = doc.querySelector('img');
        if (imgElement) {
            // 이미지 소스 추출
            setSrc(imgElement.getAttribute('src'));

        }
    }, [post]);

    return (
        <div className={`post_wrapper ${!src && 'no_src'}`}>
            <img className='post_img' src={src} />
            <h3 className='post_title'>"<br />{title}<br />"</h3>
            <h3 className='post_author'>{author}</h3>
        </div>
    )
}

export default Post
