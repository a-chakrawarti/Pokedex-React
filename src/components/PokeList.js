import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import capitalize from "../utils/capitalize";

const PokeList = () => {
  const LIMIT = 10;
  const [results, setResult] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");
  const [currentPage, setCurrentPage] = useState(
    `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${LIMIT}`
  );
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const fetchList = async () => {
      const response = await fetch(currentPage);
      const data = await response.json();

      const { next, previous, results } = data;

      setNextPage(next);
      setPreviousPage(previous);
      setResult(results);
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
    <div className="main">
      <div className="body-style flex-container">
        {results.map((result, index) => {
          const idx = pageNumber * LIMIT + (index + 1);
          return (
            <div className="cards" key={idx}>
              <Link key={idx} to={`/Pokedex-React/pokemon/${idx}`}>
                <span className="number-tag">#{idx}</span>
                <span className="poke-name">
                  {capitalize(`${result.name}`)}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
      <Pagination
        gotoNextPage={nextPage ? gotoNextPage : null}
        gotoPreviousPage={previousPage ? gotoPreviousPage : null}
      />
    </div>
  );
};

export default PokeList;
