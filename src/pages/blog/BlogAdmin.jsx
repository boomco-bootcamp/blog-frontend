import banner from '../../assets/img/til_banner.png';
import { useState } from "react";



const AdminData = [
  {
    visitor : [
      {
        date: '2024-01-01',
        visit : '30',
      },
      {
        date: '2024-01-02',
        visit : '55',
      },
      {
        date: '2024-01-03',
        visit : '333',
      }
      ,{
        date: '2024-01-04',
        visit : '111',
      }
    ],
    engagement: [
      {
        view : '555',
        like : '22'
      }
    ],
    reply: [
      {
        title : '도움이 잘 되었어요. 감사합니다.',
        userId : 'mjkim93'
      },
      {
        title : '맞아요. 자바스크립트는 어려워요',
        userId : 'hisong99'
      },
      {
        title : '좋은글입니다.',
        userId : 'ms_kim87'
      },
    ]
  }
]



const BlogAdmin = () => {

  const [activeTab, setActiveTab] = useState(0);
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(true);
  }

  return (
    <div className="blog_admin_wrap">
      <div className="img_banner">
        <img src={banner} alt="banner" />
      </div>
      <div className="admin_cover">
        <div className="admin_wrap">
          <div className="admin_inner">
            <button>메인 이미지 배너 업로드</button>
          </div>
          <div className="text_wrap">
            {
              !edit ? (
                <>
                  <p className="text">저의 블로그에 오신것을 환영합니다. 반가워요</p>
                  <button onClick={handleEdit}>수정하기</button>
                </>
              ) : (
                <>
                  <input type="text" placeholder={'한 줄 소개를 입력해주세요'} />
                  <button>저장하기</button>
                </>
              )
            }
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
  )
}

export default BlogAdmin
