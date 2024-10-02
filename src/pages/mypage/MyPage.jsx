import React, { useEffect, useState } from 'react';
import { DeleteIcon, PlusIcon } from "../../assets/svg/Icon";
import { useUser } from '../../context/UserContext';
import { getUserInfo } from '../../api/user';
import { getCategoryList } from '../../api/blog';



const MyPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { user, login, logout } = useUser();
  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    pw: '',
    pw_confirm: '',
    name: '',
    email: '',
    phone: ''
  });

  const [categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [chipActive, setChipActive] = useState([])

  useEffect(() => {
    const getMyInfo = async () => {
      const resCategory = await getCategoryList()
      setCategories(resCategory.data)
      const userInfo = await getUserInfo()

      setFormData(
        {
          ...formData,
          id: userInfo.data.userId,
          name: userInfo.data.userNm,
          email: userInfo.data.userEml,
          phone: userInfo.data.userTel
        }
      )
      // let result = await getBlogDetail(id)
      // setDetail(result.data)
    }
    getMyInfo()
  }, [])

  useEffect(() => {

    // const getBlog = async () => {

    //   const info = await getUserInfo({
    //     userId: JSON.parse(localStorage.getItem('userInfo')).userId,
    //     userPswd: JSON.parse(localStorage.getItem('userInfo')).userPswd,
    //   })

    //   console.log(info)
    // }
    // getBlog()
  }, [])

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
  // const addCategory = () => {
  //   if (inputValue.trim() && !categories.includes(inputValue)) {
  //     setCategories([...categories, inputValue]);
  //     setInputValue('');
  //   }
  // };

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     addCategory();
  //   }
  // };

  // const removeCategory = (index) => {
  //   const updatedCategories = categories.filter((_, i) => i !== index);
  //   setCategories(updatedCategories);
  // };


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

  const BlogCategoryData = []
  const BlogData = []

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
                    <p className="mypage_info">{formData.id}</p>
                  </div>
                  <div className="input_wrap">
                    <p className="mypage_title">비밀번호</p>
                    <p className="mypage_info">*************</p>
                  </div>
                  <div className="input_wrap">
                    <p className="mypage_title">이름</p>
                    <p className="mypage_info">{formData.name}</p>
                  </div>
                  {formData.email && <div className="input_wrap">
                    <p className="mypage_title">이메일</p>
                    <p className="mypage_info">{formData.email}</p>
                  </div>}
                  {formData.phone && <div className="input_wrap">
                    <p className="mypage_title">연락처</p>
                    <p className="mypage_info">{formData.phone}</p>
                  </div>}
                </form>
                <button className="form_edit" onClick={handleEdit}>
                  수정하기
                </button>
                <button className="form_edit" onClick={logout}>
                  로그아웃
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

              <button className="category_btn">저장</button>


              <div className="category_item" >

                <div className="chip_list">
                  {categories.map((item, idx) => (
                    <div
                      className={`chip_item ${chipActive.includes(`${item.blogPostCatId} + ${idx}`) ? 'active' : ''}`}
                      key={item.blogPostCatId}
                      onClick={() => handleChipClick(`${item.blogPostCatId} + ${idx}`)}
                    >
                      {item.blogPostCatNm}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}


        {activeTab === 2 && (
          <div className="tag_wrap">
            <h3>관심 태그 설정</h3>
            <div className="edit_wrap">
              <button className="tag_btn">저장</button>

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
                          <img src={item.image} alt="image" />
                        </div>
                        <div className="content_wrap">
                          <p className="title">{item.blog_post_title}</p>
                          <p className="content_text">{item.blog_post_con}</p>
                          <p className="date">{item.rgsn_ts}</p>
                        </div>
                        <div className="text_wrap">
                          <div className="like">♥ {item.like}</div>
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


