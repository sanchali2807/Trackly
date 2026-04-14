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

    onClose();
  };
 
  const toggleLabel = async (labelId) => {
  const assigned = card.Labels.some(l => l.id === labelId);

  if (assigned) {
    await removeLabel({ cardId, labelId });
  } else {
    await addLabel({ cardId, labelId });
  }

  fetchCard();
};
  if (!card) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Card</h2>

        <input
          value={card.title}
          onChange={(e) =>
            setCard({ ...card, title: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          value={card.description || ""}
          onChange={(e) =>
            setCard({ ...card, description: e.target.value })
          }
        />

          <h3>Labels</h3>

<div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
  {card.Labels?.map((l) => (
    <div
      key={l.id}
      style={{
        background: l.color,
        padding: "5px 10px",
        borderRadius: "5px",
      }}
    >
      {l.name}
    </div>
  ))}
</div>

{labels?.map((l) => (
  <div key={l.id}>
    <input
      type="checkbox"
      checked={card.Labels?.some(x => x.id === l.id)}
      onChange={() => toggleLabel(l.id)}  // ✅ NOW USED
    />
    {l.name}
  </div>
))}

        <input
          type="date"
          value={card.dueDate ? card.dueDate.split("T")[0] : ""}
          onChange={(e) =>
            setCard({ ...card, dueDate: e.target.value })
          }
        />

        <button onClick={handleUpdate}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default CardModal;