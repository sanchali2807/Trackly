import { Droppable, Draggable } from "@hello-pangea/dnd";
import Card from "./Card";

function List({ list, index }) {
  return (
    <Draggable draggableId={String(list.id)} index={index}>
      {(provided) => (
        <div
          className="list"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <h3 {...provided.dragHandleProps}>{list.title}</h3>

          <Droppable droppableId={String(list.id)} type="card">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {list.Cards?.map((card, i) => (
                  <Card key={card.id} card={card} index={i} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default List;