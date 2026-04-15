import { useState } from "react";

function Topbar({ onSearch, onOpenFilter }) {
  const [value, setValue] = useState("");
  return (
    <div className="topbar">
      <div className="logo">Trackly</div>

      <input
        className="search"
        placeholder="Search..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onSearch(e.target.value);
        }}
      />

      <div className="topbar-actions">
        <button className="filter-btn" onClick={onOpenFilter}>
  <span></span>
  <span></span>
  <span></span>
</button>
        <div className="profile">A</div>
      </div>
    </div>
  );
}

export default Topbar;