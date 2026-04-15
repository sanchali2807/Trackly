function FilterPanel({ show, onClose, filters, setFilters, labels, members }) {
  if (!show) return null;

  return (
    <div className="filter-panel">

      {/* HEADER */}
      <div className="filter-header">
        <h3>Filter</h3>
        <button className="Closebtn" onClick={onClose}>X</button>
      </div>

      {/* KEYWORD */}
      <div className="filter-section">
        <h4>Keyword</h4>
        <input
          className="filter-input"
          placeholder="Enter a keyword..."
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, keyword: e.target.value }))
          }
        />
        <div className="filter-desc">
          Search cards, members, labels, and more.
        </div>
      </div>

    <div className="filter-section">
  <h4>Members</h4>

  {/* NO MEMBERS */}
  <div className="filter-row">
    <input
      type="checkbox"
      checked={filters.member === "none"}
      onChange={() =>
        setFilters((prev) => ({
          ...prev,
          member: prev.member === "none" ? null : "none",
        }))
      }
    />
    <span>No members</span>
  </div>

  {/* ASSIGNED TO ME */}
  <div className="filter-row">
    <input
      type="checkbox"
      checked={filters.member === "me"}
      onChange={() =>
        setFilters((prev) => ({
          ...prev,
          member: prev.member === "me" ? null : "me",
        }))
      }
    />
    <span>Cards assigned to me</span>
  </div>
</div>

      {/* STATUS */}
     <div className="filter-section">
  <h4>Card status</h4>

  <div className="filter-row">
    <input
      type="checkbox"
      checked={filters.status === "complete"}
      onChange={() =>
        setFilters((prev) => ({
          ...prev,
          status: prev.status === "complete" ? null : "complete",
        }))
      }
    />
    <span>Marked as completed</span>
  </div>

  <div className="filter-row">
    <input
      type="checkbox"
      checked={filters.status === "incomplete"}
      onChange={() =>
        setFilters((prev) => ({
          ...prev,
          status: prev.status === "incomplete" ? null : "incomplete",
        }))
      }
    />
    <span>Not marked as completed</span>
  </div>
</div>

      {/* DUE DATE */}
     <div className="filter-section">
  <h4>Due date</h4>

  {[
    { key: "none", label: "No dates" },
    { key: "overdue", label: "Overdue" },
    { key: "day", label: "Due in next day" },
    { key: "week", label: "Due in next week" },
  ].map((d) => (
    <div className="filter-row" key={d.key}>
      <input
        type="checkbox"
        checked={filters.dueDate === d.key}
        onChange={() =>
          setFilters((prev) => ({
            ...prev,
            dueDate: prev.dueDate === d.key ? null : d.key,
          }))
        }
      />
      <span>{d.label}</span>
    </div>
  ))}
</div>


{/* LABELS */}
    <div className="filter-section">
  <h4>Labels</h4>

  {labels?.map((l) => (
   <div className="filter-row" key={l.id}>
  <input
    type="checkbox"
    checked={filters.labels.includes(l.id)}
    onChange={() => {
      setFilters((prev) => {
        const exists = prev.labels.includes(l.id);

        return {
          ...prev,
          labels: exists
            ? prev.labels.filter((id) => id !== l.id)
            : [...prev.labels, l.id],
        };
      });
    }}
  />

  <div
    className="label-box"
    style={{
      backgroundColor: l.color,
    }}
  >
    {l.name || ""}
  </div>
</div>
  ))}
</div>

    </div>
  );
}
export default FilterPanel;