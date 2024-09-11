import { useUser } from '../../context/UserContext';
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../assets/img/blogyul.png"

const Header = () => {
    const { user, login, logout } = useUser();
    return (
        <header className='header'>
            <Link to='/'>
              <img src={Logo} alt="로고"/>
            </Link>
            {
                user.loginStatus ? <ul className='flex'>
                    <Link to='/blog/admin'>
                        블로그 관리
                    </Link>
                    <Link to='/mypage'>
                        마이페이지
                    </Link>
                </ul>
                    :
                    <ul className='flex'>
                        <Link to='/login'>
                            <li>로그인</li>
                        </Link>
                        <Link to='/signup'>
                            <li>회원가입</li>
                        </Link>
                    </ul>}
        </header>
    )
}

export default Header