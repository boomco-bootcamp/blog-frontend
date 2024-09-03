import { useUser } from '../../context/UserContext';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginForm = () => {
    const { user, login, logout } = useUser();
    const [formData, setFormData] = useState({
        id: "",
        pw: ""
    })

    const handleChangeInput = (e) => {
        setFormData({
            [e.target.name]: e.target.value
        })
    }

    const handleClickLogin = () => {

    }

    return (
        <div className='form'>
            <form className='flex-col flex-center'>
                <input name='id' onChange={handleChangeInput} value={formData.id} placeholder='id' className='form_input' />
                <input name='pw' onChange={handleChangeInput} value={formData.pw} placeholder='password' className='form_input' type='password' />
                <button type='button'>로그인</button>
                <Link to='/signup'>
                    <a>회원가입</a>
                </Link>
            </form>
        </div>
    )
}

export default LoginForm
