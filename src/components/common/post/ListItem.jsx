
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import sampleImg from '../../../assets/sample/img/bg_img01.png'
import { formatDate } from '../../../util/date'



const ListItem = ({ item, idx }) => {
    const [src, setSrc] = useState(null);
    const [cleanDesc, setCleanDesc] = useState(item.blogPostCon);

    useEffect(() => {
        // desc의 HTML을 파싱하고 img 태그를 찾아 제거
        const parser = new DOMParser();
        const doc = parser.parseFromString(item.blogPostCon, 'text/html');

        // 첫 번째 img 태그 찾기
        const imgElement = doc.querySelector('img');
        if (imgElement) {
            // 이미지 소스 추출
            setSrc(imgElement.getAttribute('src'));

            // img 태그를 제거한 HTML 생성
            imgElement.remove();
            setCleanDesc(doc.body.innerHTML);
        }
    }, [item]);

    return (
        <Link to={`/blog/${item.blogId}/${item.blogPostId}`}>
            <li className="blog_item" key={idx}>
                <a href="#" className="blog_item_inner">
                    <div className="img_wrap">
                        <img src={src ? src : sampleImg} alt="image" />
                    </div>
                    <div className="content_wrap">
                        <p className="title">{item.blogPostTitle}</p>
                        <p className="content_text" dangerouslySetInnerHTML={{ __html: item.blogPostCon }}></p>
                        <p className="date">{formatDate(item.rgsnTs)}</p>
                    </div>
                    <div className="text_wrap">
                        <div className="like">♥ {item.postLikeCnt}</div>
                        <div className="view">✍🏻 {item.postCommentCnt}</div>
                    </div>
                    <div className="tag_list">
                        {
                            item.tagList && item.tagList.map((tag, idx) => (
                                <div className="tag" key={idx}>{tag.blogTagCon}</div>
                            ))
                        }
                    </div>
                </a>
            </li>
        </Link>
    )
}

export default ListItem