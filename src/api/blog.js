import Axios from "./api";

// blog list 가져오기 -> tag category recommend 에 따라서 파라미터 추가
export const getBlogList = async (params) => {
    if (params) {
        return await Axios.get(`/api/post/list`, {
            params,
        })
    }
    else {
        return await (
            await Axios.get(`/api/post/list`)
        )
    }
};

// blog detail 가져오기 -> tag category 에 따라서 파라미터 추가
export const getBlogDetail = async (postId) => {
    // return await Axios.get(`/blog/post/${postId}`);
    return await Axios.get(`/api/post/detail?blogPostId=${postId}`);

};


// 내 blog list 가져오기 -> tag category recommend 에 따라서 파라미터 추가
export const getMyBlogList = async (id) => {
    return await Axios.get(`/api/post/list?blogId=${id}`)
};


// blog 작성하기
export const createArticle = async (data) => {
    return await Axios.post(
        `/api/post/save`,
        {
            ...data
        }
    );
};

// blog 수정하기
export const updateArticle = async (data) => {
    return await Axios.patch(
        `/api/post/save`,
        {
            data
        }
    );
};

// blog 삭제하기
export const deleteArticle = async (blogPostId) => {
    return await Axios.post(
        `/api/post/delete`,
        { blogPostId }
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

// blog 게시글 좋아요 추가 및 삭제
export const postLikedEdit = async (blogPostId) => {
    return await Axios.post(
        `/api/like/post/save`,
        {
            blogPostId: blogPostId
        }
    );
};


// blog 게시글 댓글 달기
export const postComment = async (params) => {
    return await Axios.post(
        `/api/comment/post/save`,
        {
            ...params
        }
    );
};

// blog 게시글 댓글 삭제
export const deleteComment = async (id) => {
    return await Axios.post(
        `/api/comment/post/delete`,
        {
            blogCommentId: id
        }
    );
};

// blog 정보 가져오기

export const getBlogInfo = async (blogId) => {
    return await Axios.get(`/api/blog/info?blogId=${blogId}`)
};

export const getBlogViewCount = async (blogPostId) => {
    return await Axios.get(`/api/post/view/list?blogPostId=${blogPostId}`)
};

export const getBlogLikeCount = async (blogPostId) => {
    return await Axios.get(`/api/post/like/list?blogPostId=${blogPostId}`)
};


// blog 업데이트
export const updateBlogInfo = async (data) => {
    return await Axios.post(
        `/api/blog/update`,
        data
    );
};

// 방문자수
export const getViewCount = async (blogPostId) => {
    return await Axios.get(`/api/post/view/list?blogPostId=${blogPostId}`)
};


// 좋아요
export const getLikeCount = async (blogPostId) => {
    return await Axios.get(`/api/post/like/list?blogPostId=${blogPostId}`)
};


export const getCategoryList = async () => {
    return await Axios.get(`/api/category/list/all`)
};

export const getTagList = async () => {
    return await Axios.get(`/api/my/tag/list`)
};

