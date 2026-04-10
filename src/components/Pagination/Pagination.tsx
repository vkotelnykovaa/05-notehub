import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (selected: number) => void;
}

export default function Pagination({ pageCount, forcePage, onPageChange }: PaginationProps ) {
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
      containerClassName={.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousClassName={css.nav}
      nextClassName={css.nav}
      disabledClassName={css.disabled}
      breakClassName={css.break}
    />
  );
}
