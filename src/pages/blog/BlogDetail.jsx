import { formatDate } from '../../util/date'
import { getBlogDetail, postComment, postLikedEdit, deleteComment } from '../../api/blog'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

const BlogDetail = () => {
  const [detail, setDetail] = useState({})
  const [isLiked, setIsLiked] = useState(false)
  const { user } = useUser();
  const { userId, id } = useParams();
  const [commentContent, setCommentContent] = useState();
  const [reCommentContent, setReCommentContent] = useState([]);


  const getBlog = async () => {
    let result = await getBlogDetail(id)
    setDetail(result.data)
    setReCommentContent(
      result.data.commentList.map(ele => "")
    )
  }

  useEffect(() => {
    getBlog()
  }, [])

  const handleLikeAdd = async () => {
    const updatedLikeCount = isLiked
      ? detail.postLikeCnt - 1
      : detail.postLikeCnt + 1;

    const updateLike = { ...detail, postLikeCnt: updatedLikeCount };

    setDetail(updateLike);
    setIsLiked(!isLiked); // 좋아요 상태를 반전

    try {
      await postLikedEdit(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async () => {
    try {
      await postComment({
        blogPostId: detail?.blogPostId,
        blogCommentCon: commentContent,
      })
      alert('댓글을 작성했습니다.')
      getBlog()
      setCommentContent("")
    }
    catch (err) {
      console.error(err)
    }
  }

  const handleReAddComment = async (blogParentCommentId, idx) => {
    try {
      await postComment({
        blogPostId: detail?.blogPostId,
        blogCommentCon: reCommentContent[idx],
        blogParentCommentId
      })
      alert('답글을 작성했습니다.')
      getBlog()
      setReCommentContent("")
    }
    catch (err) {
      console.error(err)
    }
  }

  const handleDeleteComment = async (blogCommentId) => {
    try {
      await deleteComment(blogCommentId)
      alert('댓글을 삭제했습니다.')
      getBlog()
    }
    catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="blog_detail_wrap">
      <div className="detail_title_wrap">
        <h2 className="detail_title">{detail.blogPostTitle}</h2>
        <div className="like_wrap">
          <button className="like" onClick={handleLikeAdd}>♥ {detail.postLikeCnt}</button>
        </div>
      </div>
      <div className="detail_info">
        <div className="info_left">
          <p className="writer">{detail.blogNm ?? ""}</p>
          <div className="date">{formatDate(detail.rgsnTs)}</div>
        </div>
      </div>
      <div className="info_sec">
        <div className="view">✍🏻 {detail.commentList?.length}</div>
      </div>
      <div className="tag_list">
        {
          detail.tagList && detail.tagList.map(ele => (
            <div className="tag_item">{ele.blogTagCon}</div>
          ))
        }
      </div>
      <div className="content_wrap"

        dangerouslySetInnerHTML={{ __html: detail.blogPostCon }} />

      <div className="reply_wrap">
        <div className="reply_form_wrap">
          <div className="reply_top">댓글 {detail.commentList?.length}</div>
          <div className="reply_form">
            <div className="textarea_button_wrap">
              <textarea className="textarea" placeholder="댓글을 등록해보세요"
                onChange={(e) => setCommentContent(e.target.value)}
                value={commentContent}
              />
              <button className="button" onClick={handleAddComment}>댓글등록</button>
            </div>
          </div>
        </div>
        <div className="reply_list">
          {detail.commentList && detail.commentList.map((com, idx) => (
            <div className="reply_item">
              <p className="writer">{com.rgsnUserNm ? com.rgsnUserNm : com.rgsmUserId}
                {com.amnnUserId === user.userId && com.delYn === 'N' && <button onClick={() => handleDeleteComment(com.blogPostCommentId)}>X</button>}
              </p>
              <p className="date">{formatDate(com.rgsnTs)}</p>
              <div className={com.delYn === 'Y' ? "content_deleted" : "content"}>
                {
                  com.delYn === 'N' ?
                    com.blogCommentCon : "삭제된 댓글입니다."}
              </div>
              <div className="reply_form">
                <div className="textarea_button_wrap">
                  <textarea className="textarea" placeholder="답글을 등록해보세요"
                    onChange={(e) => {
                      let clone = [...reCommentContent]
                      clone[idx] = e.target.value
                      setReCommentContent(clone)
                    }}
                    value={reCommentContent[idx]}
                  />
                  <button className="button" onClick={() => handleReAddComment(com.blogPostCommentId, idx)}>답글등록</button>
                </div>
              </div>
              {com.blogChildCommentList.map((recom) => (
                <div className="re_reply_item">
                  <div className="top_wrap"><p className="writer">{recom.rgsnUserNm ? recom.rgsnUserNm : recom.rgsmUserId}
                    {com.amnnUserId === user.userId && recom.delYn === 'N' && <button onClick={() => handleDeleteComment(com.blogPostCommentId)}>X</button>}
                  </p></div>
                  <p className="date">{formatDate(recom.rgsnTs)}</p>
                  <div className="content">{
                    recom.delYn === 'N' ?
                      recom.blogCommentCon : "삭제된 댓글입니다."}</div>
                </div>

              ))}
            </div>
          ))
          }
          {/* <div className="reply_item"><p className="writer">정수진</p><p className="date">2024-08-09</p>
            <div className="content">css에 대해 자세히 알게되었습니다.</div>
            <div className="reply_form">
              <div className="button_wrap">
                <button className="button">댓글달기</button>
              </div>
            </div>
          </div> */}
        </div>
      </div>


    </div >
  )
}

export default BlogDetail
