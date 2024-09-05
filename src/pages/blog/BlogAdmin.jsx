import banner from '../../assets/img/til_banner.png';
import { useRef, useState } from "react";

const AdminData = [
  {
    visitor: [
      { date: '2024-01-01', visit: '30' },
      { date: '2024-01-02', visit: '55' },
      { date: '2024-01-03', visit: '333' },
      { date: '2024-01-04', visit: '111' }
    ],
    engagement: [
      { view: '555', like: '22' }
    ],
    reply: [
      { title: '도움이 잘 되었어요. 감사합니다.', userId: 'mjkim93' },
      { title: '맞아요. 자바스크립트는 어려워요', userId: 'hisong99' },
      { title: '좋은글입니다.', userId: 'ms_kim87' },
    ]
  }
];

const BlogAdmin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [edit, setEdit] = useState(false);
  const [bannerImage, setBannerImage] = useState(banner);
  const [text, setText] = useState('저의 블로그에 오신것을 환영합니다. 반가워요')


  const fileInputRef = useRef(null);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result); // 상태를 업데이트하여 이미지 변경
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 입력 클릭 이벤트 트리거
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSave = () => {
    setEdit(false); // 저장 후 수정 상태 종료
  };

  return (
    <div className="blog_admin_wrap">
      <div className="img_banner">
        <img src={bannerImage} alt="banner" /> {/* bannerImage 상태를 사용 */}
      </div>
      <div className="admin_cover">
        <div className="admin_wrap">
          <div className="admin_inner">
            <button onClick={handleButtonClick}>메인 이미지 배너 업로드</button>
            <label htmlFor="fileupload" className='visually-hidden'></label>
            <input
              type="file"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
              id="fileupload"
            />
          </div>
          <div className="text_wrap">
            {!edit ? (
              <>
                <p className="text">{text}</p>
                <button onClick={handleEdit}>수정하기</button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={text}
                  onChange={handleTextChange}
                  placeholder={'한 줄 소개를 입력해주세요'}
                />
                <button onClick={handleSave}>저장하기</button>
              </>
            )}
          </div>
        </div>

        <ul className="tab_list">
          <li className={`tab_item ${activeTab === 0 ? 'active' : ''}`} onClick={() => setActiveTab(0)}>
            방문자수 통계
          </li>
          <li className={`tab_item ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>
            조회수 / 좋아요 통계
          </li>
          <li className={`tab_item ${activeTab === 2 ? 'active' : ''}`} onClick={() => setActiveTab(2)}>
            최신 댓글 알람
          </li>
        </ul>

        <div className="content_wrap">
          {activeTab === 0 && (
            <div className="content_item">
              <table>
                <caption>방문자 수 통계</caption>
                <thead>
                <tr>
                  <th scope="col">날짜</th>
                  <th scope="col">방문자 수</th>
                </tr>
                </thead>
                <tbody>
                {
                  AdminData.map((data, idx) => (
                    data.visitor.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.date}</td>
                        <td>{item.visit}</td>
                      </tr>
                    ))
                  ))
                }
                </tbody>
                <tfoot>
                <tr>
                  <th scope="row">총 방문자 수</th>
                  <td>1500명</td>
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
                  <th scope="col">총 조회수</th>
                  <th scope="col">총 좋아요수</th>
                </tr>
                </thead>
                <tbody>
                {
                  AdminData.map((data, idx) => (
                    data.engagement.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.view}</td>
                        <td>{item.like}</td>
                      </tr>
                    ))
                  ))
                }
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 2 && (
            <div className="content_item">
              <div className="apply_wrap">
                {
                  AdminData.map((data, idx) => (
                    data.reply.map((item, idx) => (
                      <div className="apply_item" key={idx}>
                        <div className="apply_title">{item.title}</div>
                        <div className="apply_user">{item.userId}</div>
                      </div>
                    ))
                  ))
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
