// import { userRow } from '@/data/db/db'
import { postSignUp } from '../../api/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        pw: "",
        pwCheck: "",
        email: "",
        phone: ""
    })

    const handleChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleClickSign = async () => {
        if (formData.pw !== formData.pwCheck) {
            alert('비밀번호를 확인해주세요.')
            return
        }

        let result = {
            userId: formData.id,
            userPswd: formData.pw,
            userNm: formData.name,
            userEml: formData.em,
            userTel: formData.phone,
        }
        try {
            await postSignUp(result)
            alert('회원가입이 완료되었습니다. 로그인 후 이용해주세요.')
            window.location.href = '/'
        }
        catch (err) {
            alert('입력하신 정보를 다시 확인해주세요.')
        }

    }
    const Rest_api_key = process.env.REACT_APP_KAKAO_API; // REST API KEY
    const redirect_uri = `${process.env.REACT_APP_FRONT_URL}/kakao/oauth`; // Redirect URI
    const encodedRedirectUri = encodeURIComponent(redirect_uri); // 인코딩된 URI
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${encodedRedirectUri}&response_type=code`;

    const handleKakaoLogin = () => {
        if (!Rest_api_key) {
            console.error("Kakao API Key is missing!");
            return;
        }
        window.location.href = kakaoURL;
    };

    return (
        <div className='form'>
            <form className='flex-col flex-center signup_wrapper'>
                <h1 className='signup_tit'>Sign Up</h1>
                <div className='input_wrap'>
                    <label htmlFor='id' className='form_label'>아이디</label>
                    <input type='text' id='id' name='id' onChange={handleChangeInput} value={formData.id} placeholder='ID' className='form_input' />
                </div>
                <div className='input_wrap'>
                    <label htmlFor='name' className='form_label'>이름</label>
                    <input type='text' id='name' name='name' onChange={handleChangeInput} value={formData.name} placeholder='Name' className='form_input' />
                </div>
                <div className='input_wrap'>
                    <label htmlFor='pw' className='form_label'>비밀번호</label>
                    <input type='password' id='pw' name='pw' onChange={handleChangeInput} value={formData.pw} placeholder='Password' className='form_input' />
                </div>
                <div className='input_wrap'>
                    <label htmlFor='pwCheck' className='form_label'>비밀번호 확인</label>
                    <input type='password' id='pwCheck' name='pwCheck' onChange={handleChangeInput} value={formData.pwCheck} placeholder='Password confirmation' className='form_input' />
                </div>
                <div className='input_wrap'>
                    <label htmlFor='email' className='form_label'>이메일</label>
                    <input type='text' id='email' name='email' onChange={handleChangeInput} value={formData.email} placeholder='E-mail' className='form_input' />
                </div>
                <div className='input_wrap'>
                    <label htmlFor='phone' className='form_label'>연락처</label>
                    <input type='text' id='phone' name='phone' onChange={handleChangeInput} value={formData.phone} placeholder='phone' className='form_input' />
                </div>
                <button type="button" className="btn_submit" onClick={handleClickSign}>회원가입</button>
                <div className='social_wrap'>
                    <div className='social_tit'>
                        <span className='tit_name'>소셜 회원가입</span>
                    </div>
                    <ul className='social_menu'>
                        <li className='social_item'>
                            <button className="kakao_button" onClick={handleKakaoLogin} type='button' />
                        </li>
                    </ul>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm
