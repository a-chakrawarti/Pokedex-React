import React from "react";

const Pagination = ({ gotoNextPage, gotoPreviousPage }) => {
  return (
    <>
      <div>Pagination</div>
      {gotoPreviousPage ? (
        <button onClick={gotoPreviousPage}>Previous</button>
      ) : (
        <button onClick={gotoPreviousPage} disabled>
          Previous
        </button>
      )}
      <button onClick={gotoNextPage}>Next</button>
    </>
  );
};

export default Pagination;
