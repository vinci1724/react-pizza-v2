import ReactPaginateExport from 'react-paginate';

import styles from './Pagination.module.scss';

const ReactPaginate = ReactPaginateExport;

interface PaginationProps {
  currentPage: number;
  onChangePage: (page: number) => void;
}

const Pagination = ({ currentPage, onChangePage }: PaginationProps) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={event => onChangePage(event.selected + 1)}
      pageRangeDisplayed={12}
      pageCount={3}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
