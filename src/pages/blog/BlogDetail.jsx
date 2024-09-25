import { formatDate } from '../../util/date'
import { getBlogDetail } from '../../api/blog'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BlogDetail = () => {
  const [detail, setDetail] = useState([])
  const { userId, id } = useParams();

  useEffect(() => {

    const getBlog = async () => {
      let result = await getBlogDetail(id)
      setDetail(result.data)
    }
    getBlog()
  }, [])
  return (
    <div className="blog_detail_wrap">
      <h2 className="detail_title">{detail.blogPostTitle}</h2>
      <div className="detail_info">
        <div className="info_left">
          <p className="writer">{detail.blogNm ?? ""}</p>
          <div className="date">{formatDate(detail.rgsnTs)}</div>
        </div>
      </div>
      <div className="info_sec">
        <div className="view">✍🏻 {detail.postCommentCnt}</div>
        <div className="like">♥ {detail.postLikeCnt}</div>
      </div>
      <div className="tag_list">
        {
          detail.tagList && detail.tagList.map(ele => (
            <div className="tag_item">{ele.blogTagCon}</div>
          ))
        }
      </div>
      <div className="content_wrap">
        {detail.blogPostCon}
      </div>
      <div className="button_wrap">
        <button className="btn">목록</button>
      </div>


      <div className="reply_wrap">
        <div className="reply_form_wrap">
          <div className="reply_top">댓글 2</div>
          <div className="reply_form">
            <div className="textarea_button_wrap">
              <textarea className="textarea" placeholder="댓글을 등록해보세요"></textarea>
              <button className="button">댓글등록</button>
            </div>
          </div>
        </div>
        <div className="reply_list">
          <div className="reply_item"><p className="writer">김철수</p><p className="date">2024-08-09</p>
            <div className="content">좋은 게시글입니다 !</div>
            <div className="reply_form">
              <div className="button_wrap">
                <button className="button">댓글달기</button>
              </div>
              <div className="textarea_button_wrap"><textarea className="textarea" placeholder="댓글을 등록해보세요"></textarea>
                <button className="button">댓글등록</button>
              </div>
            </div>
            <div className="re_reply_item">
              <div className="top_wrap"><p className="writer">jk_kim99</p></div>
              <p className="date">2024-08-10</p>
              <div className="content">감사합니다.</div>
            </div>
          </div>
          <div className="reply_item"><p className="writer">정수진</p><p className="date">2024-08-09</p>
            <div className="content">css에 대해 자세히 알게되었습니다.</div>
            <div className="reply_form">
              <div className="button_wrap">
                <button className="button">댓글달기</button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default BlogDetail
