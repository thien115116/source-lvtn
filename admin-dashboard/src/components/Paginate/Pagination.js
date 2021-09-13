import { useState, useEffect, useMemo } from "react";
import Pagination from "react-bootstrap/Pagination";
import "./Pagination.css";
export const PaginationComponent = (props) => {
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    if (props.total > 0 && props.itemsPerPage > 0) {
      setTotalPages(Math.ceil(props.total / props.itemsPerPage));
    }
  }, [props]);
  const paginationItems = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          onClick={() => props.onPageChange(i)}
          key={i}
          active={i === props.currentPage}
        >
          {i}
        </Pagination.Item>
      );
    }
    return pages;
  }, [totalPages, props]);
  //   if (totalPages === 0) return; error here
  return (
    <>
      <Pagination>
        <Pagination.Prev
          onClick={() => props.onPageChange(props.currentPage - 1)}
          disabled={props.currentPage === 1}
        />
        {paginationItems}

        <Pagination.Next
          onClick={() => props.onPageChange(props.currentPage + 1)}
          disabled={props.currentPage === totalPages}
        />
      </Pagination>
    </>
  );
};
