import { formatDate } from '../../../util/date'
import React, { useEffect, useState } from 'react'

const Item = ({ title, desc, author, like, comments, date }) => {
    const [src, setSrc] = useState(null);
    const [cleanDesc, setCleanDesc] = useState(desc);

    useEffect(() => {
        // desc의 HTML을 파싱하고 img 태그를 찾아 제거
        const parser = new DOMParser();
        const doc = parser.parseFromString(desc, 'text/html');

        // 첫 번째 img 태그 찾기
        const imgElement = doc.querySelector('img');
        if (imgElement) {
            // 이미지 소스 추출
            setSrc(imgElement.getAttribute('src'));

            // img 태그를 제거한 HTML 생성
            imgElement.remove();
            setCleanDesc(doc.body.innerHTML);
        }
    }, [desc]);

    return (
        <div className='item_wrapper'>
            <div className='flex'>
                <div className='content-wrapper'>
                    <p className='item_author'>{author}</p>
                    <h3 className='item_title'>{title}</h3>
                    <p className='item_desc' dangerouslySetInnerHTML={{ __html: cleanDesc }} />
                </div>
                {src && <img src={src} className='item_img' alt="Item thumbnail" />}
            </div>
            <div className='sub_wrapper'>
                <p>♥{like}</p>
                <p>✍🏻{comments}</p>
                <p>{formatDate(date)}</p>
            </div>
        </div>
    )
}

export default Item;
