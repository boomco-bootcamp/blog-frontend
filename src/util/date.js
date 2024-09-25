export const formatDate = (dateString) => {
    // 입력 문자열을 Date 객체로 변환
    const date = new Date(dateString);

    // 년, 월, 일을 각각 추출
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const day = String(date.getUTCDate()).padStart(2, '0');

    // 원하는 형식으로 반환
    return `${year}.${month}.${day}`;
}
