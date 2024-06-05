import React, { useState } from "react";

const SearchBar = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState("");

  //searches on every input change for real time results
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center py-2">
      <input
        type="text"
        className="rounded-xl appearance-none bg-transparent border-none w-full text-background-gray placeholder-background-gray py-1 px-2 leading-tight focus:outline-none"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
