import React, { useState } from 'react';

const SearchBar = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);  // Trigger search on every input change (optional)
  };

  const handleButtonClick = () => {
    onSearch(query);  // Trigger search on button click
  };

  return (
    <div className="flex items-center border-b border-gray-300 py-2">
      <input
        type="text"
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
      <button
        className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
        type="button"
        onClick={handleButtonClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

