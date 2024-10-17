import React, { useEffect, useState } from 'react';
import { DeleteIcon, PlusIcon } from "../../assets/svg/Icon";
import { useUser } from '../../context/UserContext';
import { deleteMyTag, getListByCategory, getListByLike, getListByTag, getUserInfo, postMyCategory, postMyTag, updateUserInfo } from '../../api/user';
import { getCategoryList } from '../../api/blog';
import { formatDate } from '../../util/date';
import { Link } from 'react-router-dom';



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
  const [myCategories, setMyCategories] = useState([]);

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [likedArticles, setLikedArticles] = useState([])


  const getMyInfo = async () => {
    try {
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
    }
    catch (err) {
      alert(err)
      localStorage.removeItem('authToken');
      localStorage.removeItem('userInfo');
      window.location.href = '/';
    }

  }

  const getTag = async () => {
    const res = await getListByTag();
    setTags(res.data)
  }

  const getLikedArticles = async () => {
    let res = await getListByLike();

    res = res.data.list.map(ele => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(ele.blogPostCon, 'text/html');

      // 첫 번째 img 태그 찾기
      const imgElement = doc.querySelector('img');
      if (imgElement) {
        // 이미지 소스 추출
        // img 태그를 제거한 HTML 생성
        imgElement.remove();

      }
      return {
        ...ele,
        blogPostCon: doc.body.innerHTML,
        thumbnail: imgElement.getAttribute('src') ?? ""
      }
    })


    setLikedArticles(
      res
    )
  }

  const getCategory = async () => {
    let result = await getCategoryList()
    setCategories(result.data)
  }

  const getMyCategory = async () => {
    const resCategory = await getListByCategory()
    setMyCategories(resCategory.data.map(ele => ele.blogPostCatId))
  }


  useEffect(() => {
    getMyInfo()
    getTag()
    getCategory()
    getMyCategory()
    getLikedArticles()
  }, [])




  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleSave = async () => {
    if (formData.pw !== formData.pw_confirm) {
      alert('비밀번호를 확인해주세요.')
      return
    }
    try {
      await updateUserInfo({
        "userId": formData.id,
        "userPswd": formData.pw,
        "userNm": formData.name,
        "userEml": formData.email,
        "userTel": formData.phone,
        "sysAdmYn": "N"
      })
      alert('변경 되었습니다.')
      await getMyInfo()
      setEdit(!edit);
    }
    catch (err) {
      alert(err)
    }
  }

  const handleChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleClickCategory = async (id) => {
    try {
      await postMyCategory(id)
      getMyCategory()
    }
    catch (err) {
      console.log(err)
    }

  }

  // 태그
  const addTag = async () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      await postMyTag(tagInput)
      await getTag()
      setTagInput('');
    }
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTag();
    }
  };

  const removeTag = async (blogLikeTagId) => {
    await deleteMyTag(blogLikeTagId)
    await getTag()
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
                  <button className="form_edit" onClick={handleSave}>수정완료</button>
                </div>
              </>
            )}
          </>
        )}

        {activeTab === 1 && (
          <div className="category_wrap">
            <h3>관심 카테고리 설정</h3>
            <div className="category_list">
              <div className="category_item" >

                <div className="chip_list">
                  {categories.map((item, idx) => (
                    <div
                      className={`chip_item ${myCategories.includes(item.blogPostCatId) ? 'active' : ''}`}
                      key={item.blogPostCatId}
                      onClick={() =>
                        handleClickCategory(item.blogPostCatId)
                      }
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
              <div className="chip_input_wrap">
                <input
                  type="text"
                  placeholder="관심 #태그를 추가해 보세요."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                />
                <button onClick={addTag}><PlusIcon /></button>
              </div>
              <div className="chip_list">
                {tags.map((tag, index) => (
                  <div className="chip_item" key={index}>
                    {tag.blogLikeTagCon}
                    <button onClick={() => removeTag(tag.blogLikeTagId)}><DeleteIcon /></button>
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
                  likedArticles.map((item) => (
                    <li className="blog_item" key={item.blogPostId}>
                      <Link to={`/blog/${item.amnnUserId}/${item.blogPostId}`} className="blog_item_inner">
                        <div className="img_wrap">
                          {item.thumbnail ? <img src={item.thumbnail} alt="Item thumbnail" /> : <></>}
                        </div>
                        <div className="content_wrap">
                          <p className="title">{item.blogPostTitle}</p>
                          <p className="content_text"
                            dangerouslySetInnerHTML={{ __html: item.blogPostCon }}
                          />
                          <p className="date">{formatDate(item.rgsnTs)}</p>
                        </div>
                        <div className="text_wrap">
                          <div className="like">♥ {item.postLikeCnt}</div>
                        </div>
                        <div className="tag_list">
                          {
                            item.tagList.map((tag, idx) => (
                              <div className="tag" key={idx}>{tag.blogTagCon}</div>
                            ))
                          }
                        </div>
                      </Link>
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


