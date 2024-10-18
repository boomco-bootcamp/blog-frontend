// import { userRow } from '@/data/db/db'
import { postFindPassword } from '../../api/auth'
import React, { useState } from 'react'

const PasswordForm = () => {
    const [formData, setFormData] = useState({
        userId: "",
        userEl: ""
    }
    )

    const handleChangeInput = (e) => {
        setFormData({
            [e.target.name]: e.target.value
        })
    }

    const handleClickSign = async () => {
        if (formData.userId.length && formData.userEl.length) {
            await postFindPassword({
                userEl: formData.userEl,
                userId: formData.userId,
            })
        }
    }

    return (
        <div className='form'>
            <form className='flex-col flex-center password_wrapper'>
                <h1 className='signup_tit'>비밀번호 찾기</h1>
                <div className='input_wrap'>
                    <label htmlFor='email' className='form_label'>이메일</label>
                    <input type='text' id='userId' name='userId' onChange={handleChangeInput} value={formData.userId} placeholder='가입한 아이디' className='form_input' />
                    <input type='text' id='userEl' name='userEl' onChange={handleChangeInput} value={formData.userEl} placeholder='가입한 이메일' className='form_input' />
                </div>
                <button type="button" className="btn_submit" onClick={handleClickSign}>변경 링크 전송하기</button>
            </form>
        </div>
    )
}

export default PasswordForm
