import { useEffect, useState } from "react";
import {
  getBoard,
  reorderLists,
  moveCard,
  searchCards,   // ✅ ADD THIS
} from "../api/api";

import List from "./List";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

function Board() {
  const [board, setBoard] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredCards, setFilteredCards] = useState(null);

  // =========================
  // FETCH BOARD
  // =========================
  const fetchBoard = async () => {
    const res = await getBoard();
    setBoard(res.data);
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  // =========================
  // DRAG HANDLER
  // =========================
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { type, source, destination } = result;

    // LIST DRAG
    if (type === "LIST") {
      const newLists = Array.from(board.Lists);
      const [removed] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, removed);

      setBoard({ ...board, Lists: newLists });
      await reorderLists(newLists);
    }

    // CARD DRAG
    if (type === "CARD") {
      await moveCard({
        cardId: result.draggableId,
        sourceListId: source.droppableId,
        destinationListId: destination.droppableId,
        newPosition: destination.index,
      });

      fetchBoard();
    }
  };

  // =========================
  // SEARCH
  // =========================
  const handleSearch = async (value) => {
    setSearch(value);

    if (!value) {
      setFilteredCards(null);
      return;
    }

    const res = await searchCards(value);
    setFilteredCards(res.data);
  };

  if (!board) return <div>Loading...</div>;

  return (
    <>
      {/* 🔍 SEARCH BAR */}
      <input
        placeholder="Search cards..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          margin: "10px",
          padding: "8px",
          width: "300px",
          borderRadius: "6px",
          border: "none",
        }}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="all-lists"
          direction="horizontal"
          type="LIST"
        >
          {(provided) => (
            <div
              className="board"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {board.Lists?.map((list, index) => {
                let cards = list.Cards;

                // ✅ APPLY SEARCH FILTER
                if (filteredCards) {
                  cards = list.Cards.filter((c) =>
                    filteredCards.some((fc) => fc.id === c.id)
                  );
                }

                return (
                  <List
                    key={list.id}
                    list={{ ...list, Cards: cards }}
                    index={index}
                  />
                );
              })}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default Board;