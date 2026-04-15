// import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
// import CardModal from "./CardModal";

function Card({ card, index ,onClick}) {
  // const [open, setOpen] = useState(false);

  return (
    <>
      <Draggable draggableId={String(card.id)} index={index}>
        {(provided) => (
          <div
            className="card"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => onClick(card.id)}
            // onClick={() => setOpen(true)}
          >
            <div className="labels">
              {card.Labels?.map((l) => (
                <span
                  key={l.id}
                  className="label"
                  style={{ backgroundColor: l.color }}
                />
              ))}
            </div>

            <p className="card-title">{card.title}</p>

            <div className="card-footer">
              <div className="members">
                {card.Members?.map((m) => (
                  <div key={m.id} className="avatar">
                    {m.name[0]}
                  </div>
                ))}
              </div>

              {card.dueDate && (
                <span className="due">
                  📅 {new Date(card.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        )}
      </Draggable>

      
    </>
  );
}

export default Card;