import { useEffect, useState } from "react";

import {
  getCardDetails,
  updateCard,
  getLabels,
  addLabel,
  removeLabel,
  addMemberToCard,
  addChecklistItem,
  toggleChecklistItem,
  deleteChecklistItem
} from "../api/api";

function CardModal({ cardId, onClose }) {
  const [card, setCard] = useState(null);
  const [labels,setLabels] = useState([]);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
const [isEditingTitle, setIsEditingTitle] = useState(false);
const [search, setSearch] = useState("");
const [showChecklist, setShowChecklist] = useState(false);
const [checklistText, setChecklistText] = useState("");

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

  try {
    if (assigned) {
      await removeLabel(cardId, labelId);
    } else {
      await addLabel(cardId, labelId);
    }

    await fetchCard();
    window.dispatchEvent(new Event("refreshBoard"));

  } catch (err) {
    console.error("Error toggling label:", err);
  }
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
  <button onClick={() => setShowChecklist(!showChecklist)}>☑️Checklist</button>
 <button
  onClick={async () => {
    console.log("CLICKED MEMBER BUTTON"); // 👈 MUST print

    try {
      await addMemberToCard(cardId, 1);
      console.log("API CALLED");

      await fetchCard();
      window.dispatchEvent(new Event("refreshBoard"));

    } catch (err) {
      console.error("Error adding member:", err);
    }
  }}
>
  🙎🏻‍♂️ Member
</button>

  
</div>
{showLabels && (
  <div className="label-popup">
    <h4>Labels</h4>
    <input placeholder="Search labels..." 
    value={search}
    onChange={(e)=>setSearch(e.target.value)}/>

    {labels.filter((l) => 
      l.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((l)=>(
    <div
  key={l.id}
  className="label-option"
  onClick={() => toggleLabel(l.id)}
>
   <input
    type="checkbox"
    checked={card.Labels?.some(x => x.id === l.id)}
    onChange={()=>toggleLabel(l.id)}
  />
  <div
    className="label-color"
    style={{ background: l.color }}
  >
    {/* {l.name} */}
  </div>

  {/* <input
    type="checkbox"
    checked={card.Labels?.some(x => x.id === l.id)}
    readOnly
  /> */}
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
    <p
      className="desc-box"
      onClick={() => setIsEditingDesc(true)}
      style={{ cursor: "pointer", color: card.description ? "#e5e7eb" : "#9ca3af" }}
    >
      {card.description || "Add a description..."}
    </p>
  )}

  {/* EDIT MODE */}
  {isEditingDesc && (
    <div className="desc-editor">
      <textarea
        autoFocus
        value={card.description || ""}
        onChange={(e) =>
          setCard({ ...card, description: e.target.value })
        }
      />

      <div className="desc-actions">
        <button
          onClick={async () => {
            setIsEditingDesc(false);
            await updateCard(cardId, { description: card.description });
            window.dispatchEvent(new Event("refreshBoard"));
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

    {showChecklist && (
  <div className="modal-section">
    <h3>Checklist</h3>

    {/* Add item */}
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        value={checklistText}
        onChange={(e) => setChecklistText(e.target.value)}
        placeholder="Add item..."
      />
      <button
        onClick={async () => {
          if (!checklistText) return;

          await addChecklistItem(cardId, checklistText);
          setChecklistText("");
          await fetchCard();
        }}
      >
        Add
      </button>
    </div>

    {/* Items */}
    {card.ChecklistItems?.map((item) => (
     <div key={item.id} className="checklist-item">

  {/* LEFT SIDE */}
  <div className="checklist-left">
    <input
      type="checkbox"
      checked={item.completed}
      onChange={async () => {
        await toggleChecklistItem(item.id);
        await fetchCard();
      }}
    />

    <span
      className={`checklist-text ${item.completed ? "completed" : ""}`}
    >
      {item.text}
    </span>
  </div>

 

</div>
    ))}
  </div>
)}

      {/* DATE */}
      <div className="modal-section">
        <h3>Due Date</h3>
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