import { getUserInfo } from '../../api/user';
import { postSignIn } from '../../api/auth';
import { useUser } from '../../context/UserContext';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const { login } = useUser();
    const [formData, setFormData] = useState({
        id: "",
        pw: ""
    })

    const Rest_api_key = process.env.REACT_APP_KAKAO_API; // REST API KEY
    const redirect_uri = `${process.env.REACT_APP_FRONT_URL}/kakao/oauth`; // Redirect URI
    const encodedRedirectUri = encodeURIComponent(redirect_uri); // 인코딩된 URI
    // OAuth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${encodedRedirectUri}&response_type=code`;

    const handleKakaoLogin = () => {
        if (!Rest_api_key) {
            console.error("Kakao API Key is missing!");
            return;
        }
        window.location.href = kakaoURL;
    };

    const handleChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }



    const handleClickLogin = async () => {
        if (formData.id && formData.pw) {
            try {
                const res = await postSignIn({
                    userId: formData.id,
                    userPswd: formData.pw,
                })

                localStorage.setItem('authToken', res.data);
                const userInfo = await getUserInfo()
                login({
                    userId: formData.id,
                    userPswd: formData.pw,
                    userNm: userInfo.data.userNm
                })
                window.location.href = '/'
            }
            catch (err) {
                alert('아이디 혹은 비밀번호를 확인해주세요.')
            }
        }
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
                <button type="button" className="btn_submit" onClick={handleClickLogin}>로그인</button>
                <div className='social_wrap'>
                    <div className='social_tit'>
                        <span className='tit_name'>소셜 로그인</span>
                    </div>
                    <ul className='social_menu'>
                        <li className='social_item'>
                            <Link to='' className='link google'>
                                <span className="visually-hidden">구글로 로그인</span>
                            </Link>

                            <button className="kakao_button" onClick={handleKakaoLogin} type='button' />
                        </li>
                    </ul>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
