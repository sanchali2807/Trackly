import { useState } from "react";
import { createCard } from "../api/api";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import Card from "./Card"; // 🔥 IMPORTANT

function Sidebar({ lists ,onCardClick}) {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");

  if (!lists) return null;

  const inboxList = lists.find((l) => l.title === "Inbox");

  if (!inboxList) return null;

  const handleAddInboxCard = async () => {
    if (!title.trim()) return;

    try {
      await createCard({
        title,
        listId: inboxList.id,
        position: inboxList.Cards ? inboxList.Cards.length : 0,
      });

      setTitle("");
      setShowInput(false);

      window.dispatchEvent(new Event("refreshBoard"));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="sidebar">
      <h3>Inbox</h3>

      {/* ✅ DROPPABLE */}
      <Droppable
        droppableId={inboxList.id.toString()}
        type="CARD"
      >
        {(provided) => (
          <div
            className="sidebar-cards"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {inboxList.Cards?.map((card, index) => (
              <Draggable
                key={card.id.toString()}
                draggableId={card.id.toString()}
                index={index}
              >
                {(provided) => (
                 <div
  ref={provided.innerRef}
  {...provided.draggableProps}
  {...provided.dragHandleProps}
>
  <Card 
  card={card} 
  index={index}
  onClick={onCardClick} 
/>
</div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* ➕ ADD CARD */}
      {!showInput ? (
        <div
          className="sidebar-add"
          onClick={() => setShowInput(true)}
        >
          + Add a card
        </div>
      ) : (
        <div className="sidebar-add-box">
          <textarea
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="sidebar-actions">
            <button onClick={handleAddInboxCard}>
              Add card
            </button>
            <button onClick={() => setShowInput(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;