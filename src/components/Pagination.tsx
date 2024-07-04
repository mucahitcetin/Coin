import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  handlePageClick: (event: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  handlePageClick,
}) => {
  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination justify-center mt-4"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link px-2 py-1 border rounded-md text-gray-700"}
      previousClassName={"page-item"}
      previousLinkClassName={
        "page-link px-2 py-1 border rounded-md text-gray-700"
      }
      nextClassName={"page-item"}
      nextLinkClassName={"page-link px-2 py-1 border rounded-md text-gray-700"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link px-2 py-1 border rounded-md text-gray-700"}
      activeClassName={"active bg-gray-300"}
    />
  );
};

export default Pagination;
