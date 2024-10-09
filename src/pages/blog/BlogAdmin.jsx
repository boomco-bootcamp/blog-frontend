import { Link, useParams } from 'react-router-dom';
import banner from '../../assets/img/til_banner.png';
import { useEffect, useRef, useState } from "react";
import { getBlogInfo, getBlogLikeCount, getBlogViewCount, getMyBlogList, updateBlogInfo } from '../../api/blog';
import { useUser } from '../../context/UserContext';
import { getBannerImg, updateBannerImg } from '../../api/admin';
import { getCurrentComments } from '../../api/user';

export const AdminData =
{
  visitor: [
    { date: '2024-01-01', visit: '30' },
    { date: '2024-01-02', visit: '55' },
    { date: '2024-01-03', visit: '333' },
    { date: '2024-01-04', visit: '111' }
  ],
  total: 15000,
  engagement:
    { view: '555', like: '22' }
  ,
  reply: [
    { title: '도움이 잘 되었어요. 감사합니다.', userId: 'mjkim93' },
    { title: '맞아요. 자바스크립트는 어려워요', userId: 'hisong99' },
    { title: '좋은글입니다.', userId: 'ms_kim87' },
  ]
}




const BlogAdmin = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState(0);
  const [edit, setEdit] = useState(false);
  const [bannerImage, setBannerImage] = useState("");
  const [text, setText] = useState("")
  const { userId } = useParams()
  const [myPostList, setMyPostList] = useState([])
  const [viewList, setViewList] = useState([])
  const [likeList, setLikeList] = useState([])
  const [currentComments, setCurrentComments] = useState([])




  const getComments = async () => {
    const res = await getCurrentComments();
    setCurrentComments(res.data)
    // const res = await getMyBlogList(JSON.parse(localStorage.getItem('userInfo')).userId)
    // setBlogData(res.data.list)
  }

  const getMyData = async () => {
    const res = await getBlogInfo(user.userId ?? userId);
    setText(res.data.blogCon)
    setBannerImage(`${process.env.REACT_APP_BASE_URL}/api/file/download/${res.data.blogBannerFileId}`)
    // const res = await getMyBlogList(JSON.parse(localStorage.getItem('userInfo')).userId)
    // setBlogData(res.data.list)
  }

  const getMyPost = async () => {
    const res = await getMyBlogList(user.userId ?? userId);
    setMyPostList(res.data.list)
  }

  useEffect(() => {
    const getData = async () => {
      let totalView = [];
      let totalLike = [];

      // Promise.all을 사용하여 모든 비동기 작업이 완료될 때까지 기다림
      await Promise.all(myPostList.map(async (ele) => {
        const viewRes = await getBlogViewCount(ele.blogPostId);
        totalView.push(viewRes.data.reduce((sum, item) => sum + item.viewCnt, 0));

        const likeRes = await getBlogLikeCount(ele.blogPostId);
        totalLike.push(likeRes.data.reduce((sum, item) => sum + item.likeCnt, 0));
      }));

      // 모든 비동기 작업이 완료된 후 상태 업데이트
      setViewList(totalView);
      setLikeList(totalLike);
    };

    getData();
  }, [myPostList]);

  useEffect(() => {
    getMyPost()
    getComments()
    getMyData()
  }, [])

  const fileInputRef = useRef(null);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result);
      };
      reader.readAsDataURL(file);
      let formData = new FormData();
      formData.append('file', file);
      const res = await updateBannerImg(formData)
      await updateBlogInfo({
        blogCon: text,
        blogBannerFileId: res.data
      })
    }
  };

  const handleUploadBanner = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSave = async () => {
    await updateBlogInfo({
      blogCon: text,
      blogBannerFileId: banner
    })
    setEdit(false);
  };
  console.log(viewList)


  return (
    <div className="blog_admin_wrap">
      <div className="img_banner">
        <img src={bannerImage} alt="banner" />
      </div>
      <div className="admin_cover">
        <div className="admin_wrap">
          <div className="admin_inner">
            <p className="text">{text}</p>
            <br />
            <Link to='/blog/post/create'>
              <button>글 작성하러 가기</button>
            </Link>
            <br /><br />
          </div>
          {
            edit && <input
              type="text"
              value={text}
              onChange={handleTextChange}
              placeholder={'한 줄 소개를 입력해주세요'}
            />
          }
          <div className="text_wrap">

            {!edit ? (
              <>
                <button onClick={handleEdit}>소개글 수정하기</button>
              </>
            ) : (
              <>
                <button onClick={handleSave}>저장하기</button>
              </>
            )}
            <button onClick={handleUploadBanner}>배너 업로드</button>

            <label htmlFor="fileupload" className='visually-hidden'></label>
            <input
              type="file"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
              id="fileupload"
            />
          </div>

        </div>

        <ul className="tab_list">
          <li className={`tab_item ${activeTab === 0 ? 'active' : ''}`} onClick={() => setActiveTab(0)}>
            방문자수 통계
          </li>
          <li className={`tab_item ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>
            좋아요 통계
          </li>
          <li className={`tab_item ${activeTab === 2 ? 'active' : ''}`} onClick={() => setActiveTab(2)}>
            최신 댓글 알람
          </li>
        </ul>

        <div className="content_wrap">
          {/* 내 블로그 글 들어갈 자리 */}
        </div>
        <div className="content_wrap">
          {activeTab === 0 && (
            <div className="content_item">
              <table>
                <caption>방문자 수 통계</caption>
                <thead>
                  <tr>
                    <th scope="col">게시글</th>
                    <th scope="col">방문자 수</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    myPostList.map((item, idx) => (
                      <tr key={idx}>
                        <Link to={`/blog/${userId}/${item.blogPostId}`}>
                          <td>{item.blogPostTitle}</td>
                        </Link>
                        <td>{viewList[idx]}</td>
                      </tr>
                    )
                    )
                  }
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row">총 방문자 수</th>
                    <td>{viewList.reduce((sum, item) => sum + item, 0)}명</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {activeTab === 1 && (
            <div className="content_item">
              <table>
                <caption>조회수 / 좋아요 테이블</caption>
                <thead>
                  <tr>
                    <th scope="col">게시글</th>
                    <th scope="col">좋아요 수</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    myPostList.map((item, idx) => (
                      <tr key={idx}>
                        <Link to={`/blog/${userId}/${item.blogPostId}`}>
                          <td>{item.blogPostTitle}</td>
                        </Link>
                        <td>{likeList[idx]}</td>
                      </tr>
                    )
                    )
                  }
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row">총 좋아요 수</th>
                    <td>{likeList.reduce((sum, item) => sum + item, 0)}명</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {activeTab === 2 && (
            <div className="content_item">
              <div className="apply_wrap">
                {
                  currentComments.map((item, idx) => (
                    <div className="apply_item" key={idx}>
                      <div className="apply_title">{item.blogCommentCon}</div>
                      <div className="apply_user">{item.amnnUserNm}</div>
                    </div>
                  )
                  )
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;
