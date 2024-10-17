import React, { useEffect, useState } from 'react'
import { formatDate } from '../../util/date'
import { getBlogList } from '../../api/blog'
import sampleImg from '../../assets/sample/img/bg_img01.png'
import { Link, useParams } from 'react-router-dom'
import Pagination from "../../components/common/Pagination";
import NoResult from "../../components/common/NoResult";




const BlogList = () => {
  const [postList, setPostList] = useState([])
  const [orderType, setOrderType] = useState('desc')
  // ORDER_DESC("desc", "최신순"),
  // ORDER_VIEW("view", "조회수"),
  // ORDER_REPLY("reply", "댓글 많은 순");

  const [searchText, setSearchText] = useState('')
  const [filterList, setFilterList] = useState([])

  const [paging, setPaging] = useState({
    endPage: "",
    next: "",
    page: 1,
    prev: false,
    record: "",
    startPage: "",
    total: "",
    totalPage: ""
  })

  const handlePaging = (current) => {
    setPaging({ ...paging, page: current.page })
  }

  useEffect(() => {
    const getBlog = async () => {

      let result = await getBlogList({ orderType: orderType, page: paging.page })

      let data = result.data
      setPostList(data.list)
      setFilterList(data.list)
      console.log(result, paging, paging.page, '@@@@@@@@', data.page)
      setPaging({
        endPage: data.endPage,
        next: data.next,
        page: data.page,
        prev: data.prev,
        record: data.record,
        startPage: data.startPage,
        total: data.total,
        totalPage: data.totalPage,
      })
    }
    getBlog()
  }, [orderType, paging.page])

  const handleSearch = async () => {
    // const filtered = postList.filter((item) => item.blogPostTitle.includes(searchText) || item.blogPostCon.includes(searchText))
    // setFilterList(filtered)

    let result = await getBlogList({ orderType: orderType, page: paging.page, searchCon: searchText })

    let data = result.data
    setPostList(data.list)
    setFilterList(data.list)

    setPaging({
      endPage: data.endPage,
      next: data.next,
      page: data.page,
      prev: data.prev,
      record: data.record,
      startPage: data.startPage,
      total: data.total,
      totalPage: data.totalPage,
    })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };



  return (
    <div className='blog_list_wrap'>
      <div className='blog_list_container'>
        <div className="blog_category">
          <ul className="blog_cate_list">
            {/*<li className="cate_item active">전체</li>*/}
            {/*<li className="cate_item">카테고리</li>*/}
            {/*<li className="cate_item">태그</li>*/}
          </ul>

          <div className="blog_search">
            <input
              type="text"
              placeholder='검색어를 입력하세요'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>검색</button>
          </div>

          <select name="" id="" onChange={(e) => {
            setOrderType(e.target.value)
          }}>
            <option value="desc">최신순</option>
            <option value="view">조회수순</option>
            <option value="reply">댓글 많은 순</option>
          </select>
        </div>
        {
          filterList && filterList.length > 0 ?
            <ul className="blog_list">
              {
                filterList.map((item, idx) => (
                  <Link to={`/blog/${item.blogId}/${item.blogPostId}`}>
                    <li className="blog_item" key={idx}>
                      <a href="#" className="blog_item_inner">
                        <div className="img_wrap">
                          <img src={item.img ? item.img : sampleImg} alt="image" />
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
                ))
              }
            </ul> : <NoResult text={'게시글이 존재하지 않습니다.'} />
        }



        <Pagination pagingData={paging} handlePaging={handlePaging} />
      </div>
    </div>
  )
}

export default BlogList
