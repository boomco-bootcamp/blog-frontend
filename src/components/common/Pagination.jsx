import { useEffect, useState } from 'react'

const Pagination = (props) => {
    const { pagingData, handlePaging } = props

    const handlePagingClick = (num) => {
        if (num > 0 && num <= pagingData.totalPage) { // 페이지 범위 확인
            handlePaging({ page: num })
        }
    }

    const [fullPage, setFullPage] = useState(0)

    const getFullPage = () => {
        if (pagingData.startPage && pagingData.endPage) {
            setFullPage(pagingData.endPage - pagingData.startPage + 1) // 전체 페이지 수 계산
        }
    }

    useEffect(() => {
        if (pagingData) getFullPage()
    }, [pagingData])

    if (!pagingData) {
        return null; // pagingData가 없으면 아무것도 렌더링하지 않음
    }

    return (
      <div className="paging_wrap">
          {pagingData.totalPage > 0 && (
            <>
                <button
                  className="first"
                  disabled={pagingData.page === 1}
                  onClick={() => handlePagingClick(1)}
                >
                    <span className="hide">처음</span>
                </button>
                <button
                  className="prev"
                  disabled={!pagingData.prev}
                  onClick={() => handlePagingClick(pagingData.page - 1)}
                >
                    <span className="hide">이전</span>
                </button>
                {Array.from({ length: fullPage }, (_, idx) => (
                  <button
                    key={idx}
                    className={`number ${pagingData.startPage + idx === pagingData.page ? 'active' : ''}`}
                    onClick={() => handlePagingClick(pagingData.startPage + idx)}
                  >
                      {(pagingData.startPage + idx)?.toString()}
                  </button>
                ))}
                <button
                  className="next"
                  disabled={!pagingData.next}
                  onClick={() => handlePagingClick(pagingData.page + 1)}
                >
                    <span className="hide">다음</span>
                </button>
                <button
                  className="last"
                  disabled={pagingData.page === pagingData.totalPage}
                  onClick={() => handlePagingClick(pagingData.totalPage)}
                >
                    <span className="hide">마지막</span>
                </button>
            </>
          )}
      </div>
    )
}

export default Pagination
