import React from "react";

const Pagination = ({ gotoNextPage, gotoPreviousPage }) => {
  return (
    <div className="pagination">
      {gotoPreviousPage ? (
        <button className="btn" onClick={gotoPreviousPage}>
          Previous
        </button>
      ) : (
        <button className="btn" onClick={gotoPreviousPage} disabled>
          Previous
        </button>
      )}
      <button className="btn" onClick={gotoNextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
