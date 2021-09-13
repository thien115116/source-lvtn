import React, { useState } from "react";
function Search({ onSearch }) {
  const [search, setSearch] = useState("");
  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };
  return (
    <input
      type="text"
      className="form-control"
      style={{ width: 240 }}
      placeholder="Search..."
      value={search}
      onChange={(e) => onInputChange(e.target.value)}
    />
  );
}

Search.propTypes = {};

export default Search;
