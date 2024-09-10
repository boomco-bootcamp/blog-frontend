// 블로그 게시글 작성
export const postArticle = async (articleData) => {
    return await Axios.post('/blog/post/create', {
        articleData
    });
};

// 블로그 게시글 수정
export const updateArticle = async (postId, articleData) => {
    return await Axios.patch('/blog/post/update', {
        postId, articleData
    });
};

// 배너 등록
export const updateBanner = async (data) => {
    return await Axios.post('/blog/update/banner', {
        data
    });
};

// 소개글 작성
export const postDescription = async (data) => {
    return await Axios.post('/blog/post/description', {
        data
    });
};

export const getStatistics = async () => {
    return (await Axios.get('/blog/statistics'));
};

export const getAlarm = async () => {
    return (await Axios.get('/alarm/list'));
};