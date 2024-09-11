import React, { useState } from 'react';
import {DeleteIcon, PlusIcon} from "../../assets/svg/Icon";
import BlogTempImage01 from "../../assets/sample/img/bg_img01.png";
import BlogTempImage02 from "../../assets/sample/img/bg_img02.png";
import BlogTempImage03 from "../../assets/sample/img/bg_img03.png";
import BlogTempImage04 from "../../assets/sample/img/bg_img04.png";
import BlogTempImage05 from "../../assets/sample/img/bg_img05.png";



const BlogData = [
  {
    blog_post_id: 'blog_post_id_1',
    image: BlogTempImage01,
    blog_post_title: 'React로 시작하는 웹 개발',
    blog_post_con: 'React는 현대 웹 개발에서 가장 인기 있는 라이브러리 중 하나입니다. 이 글에서는 React를 사용하여 첫 웹 애플리케이션을 만드는 방법을 소개합니다.',
    rgsn_ts: '2024-01-01',
    like: '3',
    blog_tag_con: ['javascript', 'react', 'web development']
  },
  {
    blog_post_id: 'blog_post_id_2',
    image: BlogTempImage02,
    blog_post_title: 'CSS Grid와 Flexbox의 차이점',
    blog_post_con: 'CSS Grid와 Flexbox는 레이아웃을 만들기 위한 강력한 도구입니다. 이 글에서는 두 가지의 차이점과 각각의 사용 사례에 대해 알아봅니다.',
    rgsn_ts: '2024-01-05',
    like: '5',
    blog_tag_con: ['css', 'layout', 'design']
  },
  {
    blog_post_id: 'blog_post_id_3',
    image: BlogTempImage03,
    blog_post_title: 'JavaScript 비동기 처리 이해하기',
    blog_post_con: 'JavaScript에서 비동기 처리는 필수적인 개념입니다. 콜백, 프로미스, 그리고 async/await을 통해 비동기 처리를 쉽게 이해할 수 있습니다.',
    rgsn_ts: '2024-01-10',
    like: '7',
    blog_tag_con: ['javascript', 'async', 'programming']
  },
  {
    blog_post_id: 'blog_post_id_4',
    image: BlogTempImage04,
    blog_post_title: 'React Hooks 완벽 가이드',
    blog_post_con: 'React Hooks를 사용하면 상태 관리와 라이프사이클 메소드를 훨씬 간단하게 구현할 수 있습니다. 이 가이드는 Hooks의 기본부터 심화까지 다룹니다.',
    rgsn_ts: '2024-01-15',
    like: '10',
    blog_tag_con: ['react', 'hooks', 'state management']
  },
  {
    blog_post_id: 'blog_post_id_5',
    image: BlogTempImage05,
    blog_post_title: '프런트엔드 개발자를 위한 Git 사용법',
    blog_post_con: 'Git은 모든 개발자가 반드시 알아야 할 도구입니다. 이 글에서는 Git의 기본 명령어와 워크플로우를 소개합니다.',
    rgsn_ts: '2024-01-20',
    like: '8',
    blog_tag_con: ['git', 'version control', 'frontend']
  }
]


const BlogCategoryData = [
  {
    category: "요리",
    topics: [
      "레시피",
      "혼밥",
      "닭볶음탕",
      "김치찌개",
      "두부김치",
      "제육볶음",
      "떡볶이",
      "라면",
      "파스타",
      "김밥",
      "삼겹살",
      "된장찌개",
      "부대찌개",
      "해물찜",
      "비빔밥",
      "불고기",
      "칼국수",
      "순두부찌개",
      "고등어조림",
      "소불고기"
    ]
  },
  {
    category: "개발",
    topics: [
      "javascript",
      "css",
      "react",
      "python",
      "html",
      "node.js",
      "typescript",
      "docker",
      "kubernetes",
      "flutter",
      "angular",
      "vue.js",
      "graphql",
      "mongodb",
      "sql",
      "aws",
      "firebase",
      "next.js",
      "tailwindcss",
      "web accessibility"
    ]
  },
  {
    category: "운동",
    topics: [
      "헬스",
      "데드리프트",
      "벤치프레스",
      "다이어트",
      "축구",
      "야구",
      "족구",
      "배드민턴",
      "농구",
      "달리기",
      "자전거",
      "마라톤",
      "등산",
      "요가",
      "필라테스",
      "수영",
      "스쿼트",
      "케틀벨",
      "체조",
      "웨이트 트레이닝"
    ]
  },
  {
    category: "여행",
    topics: [
      "국내여행",
      "해외여행",
      "혼행",
      "유럽여행",
      "아시아여행",
      "동남아 여행",
      "미국여행",
      "호캉스",
      "캠핑",
      "트래킹",
      "차박",
      "배낭여행",
      "렌터카 여행",
      "패키지여행",
      "항공권 예약",
      "숙소 추천",
      "여행 팁",
      "여행 준비물",
      "문화 탐방",
      "자연경관"
    ]
  },
  {
    category: "자기계발",
    topics: [
      "독서",
      "명상",
      "시간 관리",
      "목표 설정",
      "일기 쓰기",
      "자기반성",
      "긍정적인 사고",
      "효율적인 공부",
      "언어 학습",
      "온라인 강의",
      "코딩 학습",
      "자격증 취득",
      "퍼블릭 스피킹",
      "리더십",
      "커뮤니케이션 스킬",
      "멘탈 관리",
      "스트레스 관리",
      "생활 습관 개선",
      "성장 마인드셋",
      "새로운 기술 배우기"
    ]
  },
  {
    category: "음악",
    topics: [
      "K-pop",
      "힙합",
      "발라드",
      "락",
      "재즈",
      "클래식",
      "EDM",
      "인디 음악",
      "R&B",
      "영화 음악",
      "OST",
      "뮤지컬",
      "아이돌",
      "콘서트",
      "악기 연주",
      "기타",
      "피아노",
      "작곡",
      "음악 감상",
      "플레이리스트"
    ]
  }
];


const MyPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    pw: '',
    pw_confirm: '',
    name: '',
    email: '',
  });

  const [categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [chipActive, setChipActive] = useState([])

  const handleChipClick = (idx) => {
    if (chipActive.includes(idx)) {
      setChipActive(chipActive.filter((chipIdx) => chipIdx !== idx));
    } else {
      setChipActive([...chipActive, idx]);
    }
  };



  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleTabChange = (index) => {
    setActiveTab(index);
  };


  // 카테고리
  const addCategory = () => {
    if (inputValue.trim() && !categories.includes(inputValue)) {
      setCategories([...categories, inputValue]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addCategory();
    }
  };

  const removeCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };


  // 태그
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTag();
    }
  };

  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  return (
    <div className="mypage_wrap">
      <ul className="mypage_list">
        <li
          className={`mypage_item ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => handleTabChange(0)}
        >
          계정정보
        </li>
        <li
          className={`mypage_item ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => handleTabChange(1)}
        >
          관심 카테고리 설정
        </li>
        <li
          className={`mypage_item ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => handleTabChange(2)}
        >
          관심 태그 설정
        </li>
        <li
          className={`mypage_item ${activeTab === 3 ? 'active' : ''}`}
          onClick={() => handleTabChange(3)}
        >
          좋아요 리스트
        </li>
      </ul>

      <div className="mypage_form_wrap">
        {activeTab === 0 && (
          <>
            {!edit ? (
              <>
                <form className="mypage_form">
                  <h3>계정정보</h3>
                  <div className="input_wrap">
                    <p className="mypage_title">아이디</p>
                    <p className="mypage_info">ks_kang91</p>
                  </div>
                  <div className="input_wrap">
                    <p className="mypage_title">비밀번호</p>
                    <p className="mypage_info">*************</p>
                  </div>
                  <div className="input_wrap">
                    <p className="mypage_title">이름</p>
                    <p className="mypage_info">강기성</p>
                  </div>
                  <div className="input_wrap">
                    <p className="mypage_title">이메일</p>
                    <p className="mypage_info">kskang@email.com</p>
                  </div>
                </form>
                <button className="form_edit" onClick={handleEdit}>
                  수정하기
                </button>
              </>
            ) : (
              <>
                <form className="mypage_form">
                  <h3>계정정보 수정</h3>
                  <div className="input_wrap">
                    <label htmlFor="id" className="form_label">
                      아이디
                    </label>
                    <input
                      type="text"
                      id="id"
                      name="id"
                      onChange={handleChangeInput}
                      value={formData.id}
                      placeholder="ID"
                      className="form_input"
                    />
                  </div>
                  <div className="input_wrap">
                    <label htmlFor="pw" className="form_label">
                      비밀번호
                    </label>
                    <input
                      type="password"
                      id="pw"
                      name="pw"
                      onChange={handleChangeInput}
                      value={formData.pw}
                      placeholder="PW"
                      className="form_input"
                    />
                  </div>
                  <div className="input_wrap">
                    <label htmlFor="pw_confirm" className="form_label">
                      비밀번호 확인
                    </label>
                    <input
                      type="password"
                      id="pw_confirm"
                      name="pw_confirm"
                      onChange={handleChangeInput}
                      value={formData.pw_confirm}
                      placeholder="PW CONFIRM"
                      className="form_input"
                    />
                  </div>
                  <div className="input_wrap">
                    <label htmlFor="name" className="form_label">
                      이름
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleChangeInput}
                      value={formData.name}
                      placeholder="NAME"
                      className="form_input"
                    />
                  </div>
                  <div className="input_wrap">
                    <label htmlFor="email" className="form_label">
                      이메일
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      onChange={handleChangeInput}
                      value={formData.email}
                      placeholder="E-MAIL"
                      className="form_input"
                    />
                  </div>
                </form>
                <div className="form_btn_wrap">
                  <button className="form_edit" onClick={handleEdit}>
                    수정취소
                  </button>
                  <button className="form_edit">수정완료</button>
                </div>
              </>
            )}
          </>
        )}

        {activeTab === 1 && (
          <div className="category_wrap">
            <h3>관심 카테고리 설정</h3>



            <div className="category_list">

              {BlogCategoryData.map((item, index) => {
                return (
                  <div className="category_item" key={`${item.category} +  ${index}`}>
                    <div className="category_title" key={index}>{item.category}</div>
                    <div className="chip_list">
                      {item.topics.map((topic, idx) => (
                        <div
                          className={`chip_item ${chipActive.includes(`${item.category} + ${idx}`) ? 'active' : ''}`}
                          key={`${item.category} + ${idx}`}
                          onClick={() => handleChipClick(`${item.category} + ${idx}`)}
                        >
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}


        {activeTab === 2 && (
          <div className="tag_wrap">
            <h3>관심 태그 설정</h3>
            <div className="edit_wrap">
              <div className="chip_input_wrap">
                <input
                  type="text"
                  placeholder="관심 태그를 입력하세요"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                />
                <button onClick={addTag}><PlusIcon /></button>
              </div>
              <div className="chip_list">
                {tags.map((tag, index) => (
                  <div className="chip_item" key={index}>
                    {tag}
                    <button onClick={() => removeTag(index)}><DeleteIcon /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="like_list_wrap">
            <h3>좋아요 리스트</h3>
            <div className="like_list">
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
                          <div className="like">좋아요 {item.like}</div>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;


