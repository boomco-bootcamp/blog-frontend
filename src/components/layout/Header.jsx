import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className='header'>
            <span>Header</span>
            <ul className='flex'>
                <Link to='/login'>
                    <li>로그인</li>
                </Link>
                <Link to='/signup'>
                    <li>회원가입</li>
                </Link>
            </ul>
        </header>
    )
}

export default Header