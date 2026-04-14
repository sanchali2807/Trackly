import { useEffect, useState } from "react";
import { getBoard, reorderLists, moveCard } from "../api/api";
import List from "./List";
import { DragDropContext } from "@hello-pangea/dnd";

function Board() {
  const [board, setBoard] = useState(null);

  const fetchBoard = async () => {
    const res = await getBoard();
    setBoard(res.data);
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { type, source, destination } = result;

    // LIST DRAG
    if (type === "list") {
      const newLists = Array.from(board.Lists);
      const [removed] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, removed);

      setBoard({ ...board, Lists: newLists });

      await reorderLists(newLists);
    }

    // CARD DRAG
    if (type === "card") {
      await moveCard({
        cardId: result.draggableId,
        sourceListId: source.droppableId,
        destinationListId: destination.droppableId,
        newPosition: destination.index,
      });

      fetchBoard();
    }
  };

  if (!board) return <div>Loading...</div>;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board">
        {board.Lists?.map((list, index) => (
          <List key={list.id} list={list} index={index} />
        ))}
      </div>
    </DragDropContext>
  );
}

export default Board;