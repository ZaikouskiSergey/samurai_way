import React, {useState} from 'react';
import styles from 'components/common/Paginator/Paginator.module.css';

type PaginatorProps = {
    pageSize: number
    totalItemsCount: number
    currentPage: number
    onPageChanged: (p: number) => void
    portionSize?: number
}

const Paginator: React.FC<PaginatorProps> = ({
                                                 totalItemsCount,
                                                 pageSize,
                                                 currentPage,
                                                 onPageChanged,
                                                 portionSize = 10
                                             }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState<number>(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return (

        <div className={styles.paginator}>
            {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>PREV</button>

            }
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    //return <span className= { cn (styles.pageNumber, { [styles.selectedPage]: currentPage === p})}
                    return <span
                        className={currentPage === p ? styles.selectedPage : styles.pageNumber + styles.selectedPage}
                        key={p}
                        onClick={(eS) => {
                            onPageChanged(p)
                        }
                        }> {p}</span>
                })}
            {portionCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>NEXT</button>}
        </div>
    )
}
export default Paginator;