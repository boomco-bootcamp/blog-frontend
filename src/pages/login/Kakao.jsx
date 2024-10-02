import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Kakao = () => {
    const navigate = useNavigate();
    const getToken = async () => {
        const token = new URL(window.location.href).searchParams.get("code");
        const Rest_api_key = process.env.REACT_APP_KAKAO_API; // REST API KEY
        const redirect_uri = 'http://localhost:3000/kakao/oauth'; // Redirect URI


        const res = axios.post(
            "https://kauth.kakao.com/oauth/token",
            {
                grant_type: "authorization_code",
                client_id: Rest_api_key,
                redirect_uri: redirect_uri,
                code: token,
            },
            {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            }
        );
        return res;
    };

    useEffect(() => {
        getToken()
            .then((res) => {
                if (res) {
                    // 여기서 토큰 쏴버리는 콜 추가
                    // localStorage.setItem("authToken", JSON.stringify(res.data.access_token));
                    // 여기서 엑세슨 토큰 관리
                    navigate("/");
                }
            })
            .catch((err) => console.log(err));
    }, []);

    return <></>;

};

export default Kakao;