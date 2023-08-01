import React from 'react';
import styles from 'components/common/Paginator/Paginator.module.css';

type PaginatorProps = {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (p: number) => void
}

const Paginator: React.FC<PaginatorProps> = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let pagesShow = currentPage > 10
        ? pages.slice(currentPage - 5, currentPage + 10)
        : pages.slice(0, 11)
    return (

        <div className={styles.users_pages}> page...
            {pagesShow.map(p => {
                return <span className={currentPage === p ? styles.selectedPage : ''}
                             onClick={(e) => onPageChanged(p)}>{p}</span>
            })}
            ...
        </div>
    )
}

export default Paginator;