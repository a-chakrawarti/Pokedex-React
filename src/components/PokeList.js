import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const PokeList = () => {
  const limit = 10;
  const [lists, setList] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");
  const [currentPage, setCurrentPage] = useState(
    `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`
  );
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const fetchList = async () => {
      const response = await fetch(currentPage);
      const data = await response.json();

      const { next, previous, results } = data;

      setNextPage(next);
      setPreviousPage(previous);
      setList(results);
    };
    fetchList();
  }, [currentPage]);

  const gotoNextPage = () => {
    setCurrentPage(nextPage);
    setPageNumber((prevPage) => prevPage + 1);
  };

  const gotoPreviousPage = () => {
    setCurrentPage(previousPage);
    setPageNumber((prevPage) => prevPage - 1);
  };

  return (
    <>
      <div>
        {lists.map((pokemon, index) => {
          const idx = pageNumber * 10 + (index + 1);
          return (
            <Link key={index + 1} to={`/pokemon/${idx}`}>
              <div key={index + 1}>
                <span>#{idx}</span>
                <span>{pokemon.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
      <Pagination
        gotoNextPage={nextPage ? gotoNextPage : null}
        gotoPreviousPage={previousPage ? gotoPreviousPage : null}
      />
    </>
  );
};

export default PokeList;
