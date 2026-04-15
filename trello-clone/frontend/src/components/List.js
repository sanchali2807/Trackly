import { Droppable, Draggable } from "@hello-pangea/dnd";
import Card from "./Card";
import { createCard ,updateList} from "../api/api";
import { useState } from "react";

function List({ list, index ,onCardClick}) {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);

  const handleAddCard = async () => {
    if (!title.trim()) return;

    await createCard({
      title,
      listId: list.id,
      position: list.Cards.length,
    });

    setTitle("");
    setShowInput(false);

    window.dispatchEvent(new Event("refreshBoard"));
  };

  return (
    <Draggable draggableId={String(list.id)} index={index}>
      {(provided) => (
        <div
          className="list"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          {/* LIST HEADER */}
          <div className="list-header" {...provided.dragHandleProps}>
            {!isEditing ? (
              <h3 onClick={() => setIsEditing(true)}>
                {newTitle}
              </h3>
            ) : (
              <input
                className="list-title-input"
                value={newTitle}
                autoFocus
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={async () => {
  setIsEditing(false);

  await updateList(list.id, {
    title: newTitle,
  });

  window.dispatchEvent(new Event("refreshBoard"));
}}
onKeyDown={async (e) => {
  if (e.key === "Enter") {
    setIsEditing(false);

    await updateList(list.id, {
      title: newTitle,
    });

    window.dispatchEvent(new Event("refreshBoard"));
  }
}}
              />
            )}
          </div>

          {/* CARDS */}
          <Droppable droppableId={String(list.id)} type="CARD">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {list.Cards?.map((card, i) => (
                  <Card
  key={card.id}
  card={card}
  index={i}
  onClick={onCardClick}
/>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* ADD CARD */}
          {!showInput ? (
            <div className="add-card" onClick={() => setShowInput(true)}>
              + Add a card
            </div>
          ) : (
            <div className="add-card-box">
              <textarea
                placeholder="Enter a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="add-actions">
                <button onClick={handleAddCard}>Add card</button>
                <button onClick={() => setShowInput(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default List;