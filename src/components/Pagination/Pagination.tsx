import ReactPaginate from 'react-paginate';
import css from '../Pagination/Pagination.module.css';

interface Props {
  pageCount: number;
  forcePage: number;
  onPageChange: (selected: number) => void; // 0-based
}

export default function Pagination({ pageCount, forcePage, onPageChange }: Props) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={forcePage}
      onPageChange={(e) => onPageChange(e.selected)}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      previousLabel="<"
      nextLabel=">"
      breakLabel="…"
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousClassName={css.nav}
      nextClassName={css.nav}
      disabledClassName={css.disabled}
      breakClassName={css.break}
    />
  );
}
