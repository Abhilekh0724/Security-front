import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchCategoriesApi } from "../../api/Api"; // Adjust the import path as necessary

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch search results from the server using Axios
    const fetchResults = async () => {
      try {
        const response = await searchCategoriesApi(query);
        setResults(response.data.categories); // Access categories array from response
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container mt-4">
      <h1>Search Results for "{query}"</h1>
      {results.length > 0 ? (
        <ul className="list-group">
          {results.map((result) => (
            <li key={result._id} className="list-group-item">
              <h5>{result.name}</h5>
              <p>{result.info}</p>
              {result.photo && (
                <img
                  src={`http://localhost:5500${result.photo}`} // Ensure URL is correctly formed
                  alt={result.name}
                  style={{ maxWidth: "200px", maxHeight: "200px" }} // Optional: set max dimensions
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
