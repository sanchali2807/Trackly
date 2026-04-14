import { useEffect, useState } from "react";
import {
  getBoard,
  reorderLists,
  moveCard,
  searchCards,
} from "../api/api";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import List from "./List";
import Topbar from "./TopBar";
import Sidebar from "./SideBar";
import FilterPanel from "./FilterPanel";

function Board() {
  const [board, setBoard] = useState(null);
  const [filteredCards, setFilteredCards] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    keyword: "",
    dueDate: null,
    label: null,
    member: null,
  });

  // FETCH
  const fetchBoard = async () => {
    const res = await getBoard();
    setBoard(res.data);
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  // DRAG
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { type, source, destination } = result;

    if (type === "LIST") {
      const newLists = Array.from(board.Lists);
      const [removed] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, removed);

      setBoard({ ...board, Lists: newLists });
      await reorderLists(newLists);
    }

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

  // SEARCH
  const handleSearch = async (value) => {
    if (!value) {
      setFilteredCards(null);
      return;
    }

    const res = await searchCards(value);
    setFilteredCards(res.data);
  };

  // FILTER LOGIC
  const applyFilters = (cards) => {
    return cards.filter((card) => {
      if (
        filters.keyword &&
        !card.title.toLowerCase().includes(filters.keyword.toLowerCase())
      )
        return false;

      if (
        filters.label &&
        !card.Labels?.some((l) => l.id === filters.label)
      )
        return false;

      if (
        filters.member &&
        !card.Members?.some((m) => m.id === filters.member)
      )
        return false;

      if (filters.dueDate) {
        const d1 = new Date(card.dueDate).toDateString();
        const d2 = new Date(filters.dueDate).toDateString();
        if (d1 !== d2) return false;
      }

      return true;
    });
  };

  if (!board) return <div>Loading...</div>;

  return (
    <div className="app">
      <Topbar
        onSearch={handleSearch}
        onOpenFilter={() => setShowFilter(true)}
      />

      <div className="main">
        <Sidebar />

        <div className="content">
          <div className="board-header">
            <h2>{board.title}</h2>
          </div>

          <div className="board-wrapper">
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

                      if (filteredCards) {
                        cards = list.Cards.filter((c) =>
                          filteredCards.some((fc) => fc.id === c.id)
                        );
                      }

                      cards = applyFilters(cards);

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
          </div>
        </div>
      </div>

      <FilterPanel
        show={showFilter}
        onClose={() => setShowFilter(false)}
        setFilters={setFilters}
      />
    </div>
  );
}

export default Board;