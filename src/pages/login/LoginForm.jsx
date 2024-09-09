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
            <form className='flex-col flex-center login_wrapper'>
                <h1 className='login_tit'>Login</h1>
                <div className='input_wrap'>
                    <label htmlFor='id' className='form_label'>아이디</label>
                    <input type='text' id='id' name='id' onChange={handleChangeInput} value={formData.id} placeholder='ID' className='form_input' />
                </div>
                <div className='input_wrap'>
                    <label htmlFor='pw' className='form_label'>비밀번호</label>
                    <input type='password' id='pw' name='pw' onChange={handleChangeInput} value={formData.pw} placeholder='Password' className='form_input' />
                </div>
                <ul className='login_menu'>
                    <li className='menu_item'>
                        <Link to='/password'>비밀번호 찾기</Link>
                    </li>
                    <li className='menu_item'>
                        <Link to='/signup'>회원가입</Link>
                    </li>
                </ul>
                <button type="submit" className="btn_submit">로그인</button>
                <div className='social_wrap'>
                    <div className='social_tit'>
                        <span className='tit_name'>소셜 로그인</span>
                    </div>
                    <ul className='social_menu'>
                        <li className='social_item'>
                            <Link to='/' className='link google'>
                                <span className="visually-hidden">구글로 로그인</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
