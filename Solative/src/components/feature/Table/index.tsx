import React from 'react';
import { useSearch } from '../../../context/SearchContext';
import "./index.css";

const Table: React.FC = () => {
  const { results } = useSearch();

  const hasResults = results.length > 0;

  return (
    <div className="table-container">
      {!hasResults ? (
        <div className="no-data">
          <p>Welcome! Start searching to see results.</p>
          <p>No data found.</p>
        </div>
      ) : (
        <div>
          <h2>Results Table:</h2>
          <table>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Name</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{result.name}</td>
                  <td>{result.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
