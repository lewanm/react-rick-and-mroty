import React from "react";
import "./styles.css";

type PaginationProps = {
  totalPost: number;
  postPerPage: number;
  prevPage: (event: React.MouseEvent<HTMLButtonElement>) => void;
  nextPage: (event: React.MouseEvent<HTMLButtonElement>) => void;
  paginate: (page: number) => void;
};

export default function Pagination(props: PaginationProps) {
  const { totalPost, postPerPage, prevPage, nextPage, paginate } = props;
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="pagination">
        <button onClick={prevPage}> &#10094; </button>
        {pageNumbers.map((number) => (
          <span key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </span>
        ))}
        <button onClick={nextPage}> &#10095; </button>
      </div>
    </nav>
  );
}
