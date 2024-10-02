import { useUser } from "../../context/UserContext";
import { getUserInfo, postKakaoLogin } from "../../api/user";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Kakao = () => {
    const { login } = useUser();
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const kakaoLogin = async () => {
            try {
                const code = new URL(window.location.href).searchParams.get("code");
                const res = await postKakaoLogin(code)
                localStorage.setItem('authToken', res.data)
                const userInfo = await getUserInfo()
                login({
                    userId: userInfo.data.userId,
                    userNm: userInfo.data.userNm
                })

                // window.location.href = '/'
                setIsAuth(true)
            }
            catch (err) {
                console.error(err)
            }

        }
        kakaoLogin()
    }, []);

    return (
        <div>
            <h1>카카오로그인</h1>
            <Link to='/'>
                <div>카카오로그인 완료</div>
            </Link>
        </div>
    );

};

export default Kakao;