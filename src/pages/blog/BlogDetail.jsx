import React from 'react'

const BlogDetail = () => {
  return (
    <div className="blog_detail_wrap">
      <h2 className="detail_title">CSS Grid와 Flexbox의 차이점</h2>
      <div className="detail_info">
        <div className="info_left">
          <p className="writer">jk_kim99</p>
          <div className="date">2024-01-05</div>
        </div>
      </div>
      <div className="info_sec">
        <div className="view">✍🏻 50</div>
        <div className="like">♥ 5</div>
      </div>
      <div className="tag_list">
        <div className="tag_item">태그01</div>
        <div className="tag_item">태그02</div>
      </div>
      <div className="content_wrap">
        CSS Grid는 2차원(2D) 레이아웃을 다루는 데 적합하여 행과 열을 모두 제어할 수 있습니다. 이를 통해 복잡한 레이아웃을 쉽게 구성할 수 있으며, 전체 페이지의 구조를 설계할 때 유리합니다.
        반면에 Flexbox는 1차원(1D) 레이아웃 시스템으로, 주로 요소를 한 줄(row) 또는 한 열(column) 안에서 배치하는 데 적합합니다. Flexbox는 컨텐츠의 정렬과 배치에 유연성을
        제공하며, 간단한 구성과 정렬에 효과적입니다.
        따라서 Grid는 전체 레이아웃 설계에, Flexbox는 개별 요소의 정렬과 배치에 적합합니다.
      </div>
      <div className="button_wrap">
        <button className="btn">이전글</button>
        <button className="btn">목록</button>
        <button className="btn">다음글</button>
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
