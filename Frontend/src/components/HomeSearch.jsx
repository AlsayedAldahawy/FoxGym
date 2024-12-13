import { useState, useEffect } from "react";
import "../assets/css/SearchDropdown.css"; // Import the CSS file for styling
import axios from "axios";
import ResultCard from "./SearchResultCard";
import { containsBadChars } from "../assets/js/auxFunctions";

const SearchDropdown = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false)

  // Function to fetch members based on the query
  const fetchMembers = async (searchQuery) => {
    try {
      const params = { searchQuery: searchQuery.trim() };
      const response = await axios.get(
        "http://localhost:5000/member/getAllMembers",
        { params }
      );
      setResults(response.data.members);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  // Effect to fetch members whenever the query changes
  useEffect(() => {
    if (containsBadChars(query)) return;

    if (query) {
      fetchMembers(query);
    } else {
      setResults([]);
    }
  }, [query]);

  // Handle input change event
  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
  };



  return (
    <div className="search-dropdown">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 350)}
        placeholder="Search a member..."
        className="search-input"
      />
      {query && focused && results.length > 0 && (
        <ul className="dropdown-list"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}>
          {results.map((result, index) => (
           <ResultCard result={result} key={index} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;
