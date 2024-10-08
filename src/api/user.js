import Axios from "./api";

// user 정보 가져오기
export const getUserInfo = async () => {
    return await Axios.post(
        `/api/user/info`,
    );
};

// user 수정하기
export const updateUserInfo = async (userData) => {
    return await Axios.post(
        `/api/user/update`,

        userData

    );
};

// 관심 카테고리 리스트 가져오기
export const getListByCategory = async () => {
    return await Axios.get(`/api/my/category/list`)

};

// 관심 카테고리 수정
export const postMyCategory = async (data) => {
    return await Axios.post(
        `/blog/my/category`,
        {
            data
        }
    );
};

// 관심 태그 리스트 가져오기
export const getListByTag = async () => {
    return await Axios.get(`/api/my/tag/list`)

};

// 관심 태그 추가
export const postMyTag = async (blogLikeTagCon) => {
    return await Axios.post(
        `/api/my/tag/add`,
        {
            blogLikeTagCon
        }
    );
};


// 관심 태그 추가
export const deleteMyTag = async (blogLikeTagId) => {
    return await Axios.post(
        `/api/my/tag/delete`,
        {
            blogLikeTagId
        }
    );
};

// 좋아요 리스트
export const getListByLike = async () => {
    return await (
        await Axios.get(`/api/my/post/like/list`)
    )
};



// 카카오 로그인
export const postKakaoLogin = async (code) => {
    return await Axios.post(
        `/api/user/login/kakao`,
        {
            code
        }
    );
};

// 카카오 로그아웃
export const postKakaoLogout = async (code) => {
    return await Axios.post(
        `/api/user/logout/kakao`,
        {
            code
        }
    );
};