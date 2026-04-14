import { Draggable } from "@hello-pangea/dnd";

function Card({ card, index }) {
  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
}

export default Card;