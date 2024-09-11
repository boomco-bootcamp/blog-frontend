import React from 'react'
import BlogTempImage01 from '../../assets/sample/img/bg_img01.png'
import BlogTempImage02 from '../../assets/sample/img/bg_img02.png'
import BlogTempImage03 from '../../assets/sample/img/bg_img03.png'
import BlogTempImage04 from '../../assets/sample/img/bg_img04.png'
import BlogTempImage05 from '../../assets/sample/img/bg_img05.png'


const BlogData = [
  {
    blog_post_id: 'blog_post_id_1',
    image: BlogTempImage01,
    blog_post_title: 'React로 시작하는 웹 개발',
    blog_post_con: 'React는 현대 웹 개발에서 가장 인기 있는 라이브러리 중 하나입니다. 이 글에서는 React를 사용하여 첫 웹 애플리케이션을 만드는 방법을 소개합니다.',
    rgsn_ts: '2024-01-01',
    like: '3',
    view: '30',
    blog_tag_con: ['javascript', 'react', 'web development']
  },
  {
    blog_post_id: 'blog_post_id_2',
    image: BlogTempImage02,
    blog_post_title: 'CSS Grid와 Flexbox의 차이점',
    blog_post_con: 'CSS Grid와 Flexbox는 레이아웃을 만들기 위한 강력한 도구입니다. 이 글에서는 두 가지의 차이점과 각각의 사용 사례에 대해 알아봅니다.',
    rgsn_ts: '2024-01-05',
    like: '5',
    view: '50',
    blog_tag_con: ['css', 'layout', 'design']
  },
  {
    blog_post_id: 'blog_post_id_3',
    image: BlogTempImage03,
    blog_post_title: 'JavaScript 비동기 처리 이해하기',
    blog_post_con: 'JavaScript에서 비동기 처리는 필수적인 개념입니다. 콜백, 프로미스, 그리고 async/await을 통해 비동기 처리를 쉽게 이해할 수 있습니다.',
    rgsn_ts: '2024-01-10',
    like: '7',
    view: '75',
    blog_tag_con: ['javascript', 'async', 'programming']
  },
  {
    blog_post_id: 'blog_post_id_4',
    image: BlogTempImage04,
    blog_post_title: 'React Hooks 완벽 가이드',
    blog_post_con: 'React Hooks를 사용하면 상태 관리와 라이프사이클 메소드를 훨씬 간단하게 구현할 수 있습니다. 이 가이드는 Hooks의 기본부터 심화까지 다룹니다.',
    rgsn_ts: '2024-01-15',
    like: '10',
    view: '100',
    blog_tag_con: ['react', 'hooks', 'state management']
  },
  {
    blog_post_id: 'blog_post_id_5',
    image: BlogTempImage05,
    blog_post_title: '프런트엔드 개발자를 위한 Git 사용법',
    blog_post_con: 'Git은 모든 개발자가 반드시 알아야 할 도구입니다. 이 글에서는 Git의 기본 명령어와 워크플로우를 소개합니다.',
    rgsn_ts: '2024-01-20',
    like: '8',
    view: '90',
    blog_tag_con: ['git', 'version control', 'frontend']
  }
]




const BlogList = () => {
    return (
      <div className='blog_list_wrap'>
        <div className="blog_category">
          <ul className="blog_cate_list">
            <li className="cate_item active">전체</li>
            <li className="cate_item">카테고리</li>
            <li className="cate_item">태그</li>
          </ul>
          
          <div className="blog_search">
            <input type="text" placeholder='검색어를 입력하세요'/>
            <button>검색</button>
          </div>

          <select name="" id="">
            <option value="">최신순</option>
            <option value="">조회수순</option>
            <option value="">좋아요순</option>
          </select>
        </div>
        
        <ul className="blog_list">
          {
            BlogData.map((item, idx) => (
              <li className="blog_item" key={idx}>
                <a href="#" className="blog_item_inner">
                  <div className="img_wrap">
                    <img src={item.image} alt="image"/>
                  </div>
                  <div className="content_wrap">
                    <p className="title">{item.blog_post_title}</p>
                    <p className="content_text">{item.blog_post_con}</p>
                    <p className="date">{item.rgsn_ts}</p>
                  </div>
                  <div className="text_wrap">
                    <div className="like">♥ {item.like}</div>
                    <div className="view">✍🏻 {item.view}</div>
                  </div>
                  <div className="tag_list">
                    {
                      item.blog_tag_con.map((tag, idx) => (
                        <div className="tag" key={idx}>{tag}</div>
                      ))
                    }
                  </div>
                </a>
              </li>
            ))
          }

        </ul>
      </div>
    )
}

export default BlogList
