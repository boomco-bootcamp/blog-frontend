import React, {useState} from 'react'

const MyPage = () => {


  const [formData, setFormData] = useState({
    id: "",
    pw: "",
    pw_confirm : "",
    name: "",
    email: "",
  })

  const [edit, setEdit] = useState(false)

  const handleEdit = () => {
    setEdit(!edit)
  }

  const handleChangeInput = (e) => {
    setFormData({
      [e.target.name]: e.target.value
    })
  }


  return (
    <div className='mypage_wrap'>
      <ul className="mypage_list">
        <li className="mypage_item active">계정정보</li>
        <li className="mypage_item">메뉴02</li>
      </ul>
      {
        !edit ? (
          <div className="mypage_form_wrap">
            <form className="mypage_form">
              <div className='input_wrap'>
                <label htmlFor='id' className='form_label'>아이디</label>
                <input type='text' id='id' name='id' onChange={handleChangeInput} value={formData.id} placeholder='ID'
                       className='form_input'/>
              </div>
              <div className='input_wrap'>
                <label htmlFor='pw' className='form_label'>비밀번호</label>
                <input type='password' id='pw' name='pw' onChange={handleChangeInput} value={formData.pw} placeholder='PW'
                       className='form_input'/>
              </div>
              <div className='input_wrap'>
                <label htmlFor='name' className='form_label'>이름</label>
                <input type='text' id='name' name='name' onChange={handleChangeInput} value={formData.name}
                       placeholder='NAME' className='form_input'/>
              </div>
              <div className='input_wrap'>
                <label htmlFor='email' className='form_label'>이메일</label>
                <input type='text' id='email' name='email' onChange={handleChangeInput} value={formData.email}
                       placeholder='E-MAIL' className='form_input'/>
              </div>
            </form>
            <button className="form_edit" onClick={handleEdit}>수정하기</button>
          </div>

        ) : (
          <div className="mypage_form_wrap">
            <form className="mypage_form">
              <div className='input_wrap'>
                <label htmlFor='id' className='form_label'>아이디</label>
                <input type='text' id='id' name='id' onChange={handleChangeInput} value={formData.id} placeholder='ID'
                       className='form_input'/>
              </div>
              <div className='input_wrap'>
                <label htmlFor='pw' className='form_label'>비밀번호</label>
                <input type='password' id='pw' name='pw' onChange={handleChangeInput} value={formData.pw} placeholder='PW'
                       className='form_input'/>
              </div>
              <div className='input_wrap'>
                <label htmlFor='pw' className='form_label'>비밀번호 확인</label>
                <input type='password' id='pw_confirm' name='pw_confirm' onChange={handleChangeInput} value={formData.pw_confirm} placeholder='PW CONFIRM'
                       className='form_input'/>
              </div>
              <div className='input_wrap'>
                <label htmlFor='name' className='form_label'>이름</label>
                <input type='text' id='name' name='name' onChange={handleChangeInput} value={formData.name}
                       placeholder='NAME' className='form_input'/>
              </div>
              <div className='input_wrap'>
                <label htmlFor='email' className='form_label'>이메일</label>
                <input type='text' id='email' name='email' onChange={handleChangeInput} value={formData.email}
                       placeholder='E-MAIL' className='form_input'/>
              </div>
            </form>
            <div className="form_btn_wrap">
              <button className="form_edit">수정취소</button>
              <button className="form_edit">수정완료</button>
            </div>
          </div>

        )
      }

    </div>
  )
}

export default MyPage
