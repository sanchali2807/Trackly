import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import CardModal from "./CardModal";

function Card({ card, index }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Draggable draggableId={String(card.id)} index={index}>
        {(provided) => (
          <div
            className="card"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setOpen(true)}
          >
            {card.title}
          </div>
        )}
      </Draggable>

      {open && (
        <CardModal
          cardId={card.id}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default Card;