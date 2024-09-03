// import { userRow } from '@/data/db/db'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        id: "",
        pw: ""
    })

    const handleChangeInput = (e) => {
        setFormData({
            [e.target.name]: e.target.value
        })
    }

    const handleClickSign = () => {
        // userRow.find() 
    }

    return (
        <div className='form'>
            <form className='flex-col flex-center'>
                <input name='id' onChange={handleChangeInput} value={formData.id} placeholder='아이디' className='form_input' />
                <input name='이름' onChange={handleChangeInput} value={formData.id} placeholder='이름' className='form_input' />
                <input name='pw' onChange={handleChangeInput} value={formData.pw} placeholder='비밀번호' className='form_input' type='password' />
                <input name='pw' onChange={handleChangeInput} value={formData.pw} placeholder='비밀번호 확인' className='form_input' type='password' />
                <button type='button'>회원가입</button>
            </form>
        </div>
    )
}

export default SignUpForm
