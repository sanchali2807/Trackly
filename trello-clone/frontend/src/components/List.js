import { Droppable, Draggable } from "@hello-pangea/dnd";
import Card from "./Card";
import { createCard } from "../api/api";

function List({ list, index }) {
  const handleAddCard = async () => {
    await createCard({
      title: "New Card",
      listId: list.id,
      position: list.Cards.length,
    });

    window.location.reload(); // quick fix
  };

  return (
    <Draggable draggableId={String(list.id)} index={index}>
      {(provided) => (
        <div
          className="list"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <h3 {...provided.dragHandleProps}>{list.title}</h3>

          <Droppable droppableId={String(list.id)} type="CARD">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {list.Cards?.map((card, i) => (
                  <Card key={card.id} card={card} index={i} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <button className="add-card" onClick={handleAddCard}>
            + Add a card
          </button>
        </div>
      )}
    </Draggable>
  );
}

export default List;