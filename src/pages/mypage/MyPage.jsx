import React, { useState } from 'react';
import {DeleteIcon, PlusIcon} from "../../assets/svg/Icon";
import BlogTempImage01 from "../../assets/sample/img/bg_img01.png";
import BlogTempImage02 from "../../assets/sample/img/bg_img02.png";
import BlogTempImage03 from "../../assets/sample/img/bg_img03.png";
import BlogTempImage04 from "../../assets/sample/img/bg_img04.png";
import BlogTempImage05 from "../../assets/sample/img/bg_img05.png";



const BlogData = [
  {
    image: BlogTempImage01,
    title: 'React로 시작하는 웹 개발',
    content_text: 'React는 현대 웹 개발에서 가장 인기 있는 라이브러리 중 하나입니다. 이 글에서는 React를 사용하여 첫 웹 애플리케이션을 만드는 방법을 소개합니다.',
    date: '2024-01-01',
    like: '3',
    tagList: ['javascript', 'react', 'web development']
  },
  {
    image: BlogTempImage02,
    title: 'CSS Grid와 Flexbox의 차이점',
    content_text: 'CSS Grid와 Flexbox는 레이아웃을 만들기 위한 강력한 도구입니다. 이 글에서는 두 가지의 차이점과 각각의 사용 사례에 대해 알아봅니다.',
    date: '2024-01-05',
    like: '5',
    tagList: ['css', 'layout', 'design']
  },
  {
    image: BlogTempImage03,
    title: 'JavaScript 비동기 처리 이해하기',
    content_text: 'JavaScript에서 비동기 처리는 필수적인 개념입니다. 콜백, 프로미스, 그리고 async/await을 통해 비동기 처리를 쉽게 이해할 수 있습니다.',
    date: '2024-01-10',
    like: '7',
    tagList: ['javascript', 'async', 'programming']
  },
  {
    image: BlogTempImage04,
    title: 'React Hooks 완벽 가이드',
    content_text: 'React Hooks를 사용하면 상태 관리와 라이프사이클 메소드를 훨씬 간단하게 구현할 수 있습니다. 이 가이드는 Hooks의 기본부터 심화까지 다룹니다.',
    date: '2024-01-15',
    like: '10',
    tagList: ['react', 'hooks', 'state management']
  },
  {
    image: BlogTempImage05,
    title: '프런트엔드 개발자를 위한 Git 사용법',
    content_text: 'Git은 모든 개발자가 반드시 알아야 할 도구입니다. 이 글에서는 Git의 기본 명령어와 워크플로우를 소개합니다.',
    date: '2024-01-20',
    like: '8',
    tagList: ['git', 'version control', 'frontend']
  }
]

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
            <div className="edit_wrap">
              <div className="chip_input_wrap">
                <input
                  type="text"
                  placeholder="관심 카테고리를 입력하세요"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={addCategory}><PlusIcon /></button>
              </div>
              <div className="chip_list">
                {categories.map((category, index) => (
                  <div className="chip_item" key={index}>
                    {category}
                    <button onClick={() => removeCategory(index)}><DeleteIcon /></button>
                  </div>
                ))}
              </div>
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
                          <p className="title">{item.title}</p>
                          <p className="content_text">{item.content_text}</p>
                          <p className="date">{item.date}</p>
                        </div>
                        <div className="text_wrap">
                          <div className="like">좋아요 {item.like}</div>
                        </div>
                        <div className="tag_list">
                          {
                            item.tagList.map((tag, idx) => (
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


