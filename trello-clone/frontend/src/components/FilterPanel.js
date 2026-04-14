function FilterPanel({ show, onClose, filters, setFilters, labels, members }) {
  if (!show) return null;

  return (
    <div className="filter-panel">
      <h3>Filter</h3>
      <button onClick={onClose}>Close</button>

      {/* KEYWORD */}
      <input
        placeholder="Search..."
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, keyword: e.target.value }))
        }
      />

      {/* MEMBERS */}
      <h4>Members</h4>
      {members?.map((m) => (
        <div key={m.id}>
          <input
            type="checkbox"
            onChange={() =>
              setFilters((prev) => ({ ...prev, member: m.id }))
            }
          />
          {m.name}
        </div>
      ))}

      {/* LABELS */}
      <h4>Labels</h4>
      <div style={{ display: "flex", gap: "6px" }}>
        {labels?.map((l) => (
          <div
            key={l.id}
            onClick={() =>
              setFilters((prev) => ({ ...prev, label: l.id }))
            }
            style={{
              width: "30px",
              height: "10px",
              background: l.color,
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {/* DUE DATE */}
      <h4>Due Date</h4>
      <input
        type="date"
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, dueDate: e.target.value }))
        }
      />
    </div>
  );
}

export default FilterPanel;