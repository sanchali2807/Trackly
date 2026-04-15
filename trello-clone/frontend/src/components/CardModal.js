import { useEffect, useState } from "react";

import {
  getCardDetails,
  updateCard,
  getLabels,
  addLabel,
  removeLabel
} from "../api/api";

function CardModal({ cardId, onClose }) {
  const [card, setCard] = useState(null);
  const [labels,setLabels] = useState([]);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
const [isEditingTitle, setIsEditingTitle] = useState(false);

  const fetchCard = async () => {
    const res = await getCardDetails(cardId);
    const labelRes = await getLabels();
    setCard(res.data);
    setLabels(labelRes.data);
  };

  useEffect(() => {
    fetchCard();
  }, []);

  const handleUpdate = async () => {
  await updateCard(cardId, {
    title: card.title,
    description: card.description,
    dueDate: card.dueDate,
  });

  window.dispatchEvent(new Event("refreshBoard")); // ✅
  onClose();
};
 
  const toggleLabel = async (labelId) => {
  const assigned = card.Labels?.some(l => l.id === labelId);

  if (assigned) {
    await removeLabel({ cardId, labelId });
  } else {
    await addLabel({ cardId, labelId });
  }

  fetchCard();
};
  if (!card) return null;

  return (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>

      {/* HEADER */}
    <div className="modal-header">

  <div className="modal-title">

  <input
    type="checkbox"
    checked={card.completed}
    onChange={async () => {
      const updated = !card.completed;
      setCard({ ...card, completed: updated });
      await updateCard(cardId, { completed: updated });
    }}
  />

  {/* VIEW MODE */}
  {!isEditingTitle && (
    <h2
      className={card.completed ? "completed" : ""}
      onClick={() => setIsEditingTitle(true)}
      style={{ cursor: "pointer" }}
    >
      {card.title}
    </h2>
  )}

  {/* EDIT MODE */}
  {isEditingTitle && (
    <input
      className="title-input"
      value={card.title || ""}
      autoFocus
      onChange={(e) =>
        setCard({ ...card, title: e.target.value })
      }
      onBlur={() => {
  setTimeout(async () => {
    setIsEditingTitle(false);
    await updateCard(cardId, { title: card.title });
    window.dispatchEvent(new Event("refreshBoard"));
  }, 200);
}}
      onKeyDown={async (e) => {
        if (e.key === "Enter") {
          setIsEditingTitle(false);
          await updateCard(cardId, { title: card.title });
          window.dispatchEvent(new Event("refreshBoard"));
        }
      }}
    />
  )}

</div>

  <span className="close-btn" onClick={onClose}>✕</span>
</div>

      {/* ACTION BUTTONS */}
     <div className="modal-actions">
  <button>+ Add</button>
  <button onClick={() => setShowLabels(!showLabels)}>
    🏷 Labels
  </button>
  <button>📅 Dates</button>
  <button>☑ Checklist</button>

  
</div>
{showLabels && (
  <div className="label-popup">
    <h4>Labels</h4>

    <input placeholder="Search labels..." />

    {labels.map((l) => (
    <div
  key={l.id}
  className="label-option"
  onClick={() => toggleLabel(l.id)}
>
  <div
    className="label-color"
    style={{ background: l.color }}
  >
    {l.name}
  </div>

  <input
    type="checkbox"
    checked={card.Labels?.some(x => x.id === l.id)}
    readOnly
  />
</div>
    ))}
  </div>
)}

      {/* DESCRIPTION */}
    <div className="modal-section">
  <div className="section-header">
    <h3>Description</h3>

    {!isEditingDesc && (
      <button onClick={() => setIsEditingDesc(true)}>Edit</button>
    )}
  </div>

  {/* VIEW MODE */}
  {!isEditingDesc && (
    <p>{card.description || "Add a description..."}</p>
  )}

  {/* EDIT MODE (like pic 3) */}
  {isEditingDesc && (
    <div className="desc-editor">
      <textarea
        value={card.description || ""}
        onChange={(e) =>
          setCard({ ...card, description: e.target.value })
        }
      />

      <div className="desc-actions">
        <button
          onClick={() => {
            setIsEditingDesc(false);
          }}
        >
          Save
        </button>

        <button onClick={() => setIsEditingDesc(false)}>
          Cancel
        </button>
      </div>
    </div>
  )}
</div>

      {/* LABELS DISPLAY */}
      <div className="modal-section">
        <h3>Labels</h3>

        <div className="label-row">
          {card.Labels?.map((l) => (
            <span
              key={l.id}
              className="label-pill"
              style={{ background: l.color }}
            >
              {l.name}
            </span>
          ))}
        </div>

        {/* SELECT LABELS */}
        {/* {labels.map((l) => (
          <div key={l.id}>
            <input
              type="checkbox"
              checked={card.Labels?.some(x => x.id === l.id)}
              onChange={() => toggleLabel(l.id)}
            />
            {l.name}
          </div>
        ))} */}
      </div>

      {/* DATE */}
      <div className="modal-section">
        <input
          type="date"
          value={card.dueDate ? card.dueDate.split("T")[0] : ""}
          onChange={(e) =>
            setCard({ ...card, dueDate: e.target.value })
          }
        />
      </div>

      {/* FOOTER */}
      <div className="modal-footer">
        <button onClick={handleUpdate}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>

    </div>
  </div>
);
}

export default CardModal;