import Axios from "./api";

// blog list 가져오기 -> tag category recommend 에 따라서 파라미터 추가
export const getBlogList = async (params) => {
    if (params) {
        return await Axios.get(`/api/post/list`, {
            params
        })
    }
    else {
        return await (
            await Axios.get(`/api/post/list`)
        )
    }
};

// blog detail 가져오기 -> tag category 에 따라서 파라미터 추가
export const getBlogArticle = async (postId) => {
    // return await Axios.get(`/blog/post/${postId}`);
    return await Axios.get(`https://koreanjson.com/posts/${postId}`);

};

// blog 작성하기
export const createArticle = async (data) => {
    return await Axios.post(
        `/blog/create`,
        {
            data
        }
    );
};

// blog 수정하기
export const updateArticle = async (data) => {
    return await Axios.patch(
        `/blog/update`,
        {
            data
        }
    );
};

// blog 삭제하기
export const deleteArticle = async (postId) => {
    return await Axios.delete(
        `/blog/delete/${postId}`
    );
};

// blog 게시글 좋아요
export const postLikedArticle = async (postId) => {
    return await Axios.post(
        `/blog/post/like`,
        {
            postId
        }
    );
};

// blog 게시글 댓글 달기
export const postComment = async (postId, commentId) => {
    return await Axios.post(
        `/blog/post/comment`,
        {
            postId, commentId
        }
    );
};

// blog 게시글 댓글 달기
export const updateComment = async (postId, commentId) => {
    return await Axios.post(
        `/blog/update/comment`,
        {
            postId, commentId
        }
    );
};


export const getCategoryList = async () => {
    return await Axios.get(`/api/category/list/all`)
};