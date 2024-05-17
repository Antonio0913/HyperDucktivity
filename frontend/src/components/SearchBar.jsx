import React from 'react';

const SearchBar = ({ placeholder, onSearch }) => {
  return (
    <div className="flex items-center border-b border-gray-300 py-2">
      <input
        type="text"
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
      <button
        className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
        type="button"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
