import React, { useState } from 'react';
import { useSearch } from '../../../context/SearchContext';
import './index.css';
import { fetchCitiesByPage } from '../../../services/fetchCitiesByPage';

const Paginator: React.FC = () => {
  const { searchQuery, results, paginatorData, limit, setLimit, setResults, setPaginatorData } = useSearch();

  const { currentOffset, totalCount } = paginatorData;

  const handlePaginator = (button: string) => {
    switch (button) {
      case "first": {
        fetchData(searchQuery, limit, 0);
        break;
      } case "prev": {
        fetchData(searchQuery, limit, currentOffset - limit);
        break;
      }
      case "next": {
        fetchData(searchQuery, limit, currentOffset + limit);
        break;
      }
      case "last": {
        fetchData(searchQuery, limit, totalCount - limit);
        break;
      }
    }
  }

  const fetchData = async (query: string, limit: number, offset: number) => {
    console.log("limit", limit)
    await fetchCitiesByPage(query, limit, offset).then((data) => {
      console.log("data", data)
      setResults(data?.data);
      setPaginatorData(data?.metadata)
    });
  }

  const handleRecordsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setLimit(value);
    }
  };

  return (
    <div className="paginator-container">
      <div className="paginator-controls">
        <input
          type="number"
          value={limit}
          onChange={handleRecordsPerPageChange}
          min={1}
          max={10}
          className="records-per-page-input"
        />
        <span>records per page</span>
      </div>
      <ul className="pagination">
        <li>
          <button onClick={() => handlePaginator("first")} disabled={currentOffset === 0}>First</button>
        </li>
        <li>
          <button onClick={() => handlePaginator("prev")} disabled={currentOffset === 0}>Previous</button>
        </li>
        <li>
          <span>Page {totalCount ? (Math.ceil( (currentOffset ?? limit)/limit)) : 0} of {totalCount}</span>
        </li> 
        <li>
          <button onClick={() => handlePaginator("next")} disabled={!results.length || ((currentOffset + limit) === totalCount)}>Next</button>
        </li>
        <li>
          <button onClick={() => handlePaginator("last")} disabled={!results.length || ((currentOffset + limit) === totalCount)}>Last</button>
        </li>
      </ul>
    </div>
  );
};

export default Paginator;
