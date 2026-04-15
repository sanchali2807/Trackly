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
  dueDate: null,     // single
  labels: [],        // MULTIPLE
  member: null,      // single
  status : null
});

  // FETCH
const fetchBoard = async () => {
  try {
    const res = await getBoard();
    console.log("BOARD DATA:", res.data); // 👈 ADD THIS
    setBoard(res.data);
  } catch (err) {
    console.error("ERROR FETCHING BOARD:", err); // 👈 ADD THIS
  }
};

  useEffect(() => {
    fetchBoard();
  const refresh = () => fetchBoard();

  window.addEventListener("refreshBoard", refresh);
  return () => window.removeEventListener("refreshBoard", refresh);
}, []);

  useEffect(() => {
  if (board) {
    console.log(board.Lists[0].Cards[0]);
  }
}, [board]);

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
console.log("CARD:", card.title);
    console.log("ChecklistItems:", card.ChecklistItems);
    // KEYWORD
    if (
      filters.keyword &&
      !card.title.toLowerCase().includes(filters.keyword.toLowerCase())
    )
      return false;

    // LABELS (MULTI)
    if (filters.labels.length > 0) {
      const hasLabel = card.Labels?.some((l) =>
        filters.labels.includes(l.id)
      );
      if (!hasLabel) return false;
    }

   // MEMBERS
   
if (filters.member === "none") {
  if (card.Members && card.Members.length > 0) return false;
}

if (filters.member === "me") {
  const myId = 1; // Alice id for now

  if (!card.Members || card.Members.length === 0) return false;

  const assigned = card.Members.some((m) => m.id === myId);
  if (!assigned) return false;
}

   // DUE DATE
if (filters.dueDate) {
  const now = new Date();

  // ✅ Case 1: No dates
  if (filters.dueDate === "none") {
    if (card.dueDate !== null) return false;
    return true;
  }

  // ❗ From here onward → only cards WITH dates
  if (!card.dueDate) return false;

  const due = new Date(card.dueDate);

  // ✅ Case 2: Overdue
  if (filters.dueDate === "overdue") {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // remove time

  const due = new Date(card.dueDate);
  due.setHours(0, 0, 0, 0);   // remove time

  if (due >= today) return false;
}

  // ✅ Case 3: Next day
  if (filters.dueDate === "day") {
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);

    if (due < now || due > tomorrow) return false;
  }

  // ✅ Case 4: Next week
  if (filters.dueDate === "week") {
    const week = new Date();
    week.setDate(now.getDate() + 7);

    if (due < now || due > week) return false;
  }
}
    // STATUS
if (filters.status) {
  const isCompleted =
  card.ChecklistItems &&
  card.ChecklistItems.length > 0 &&
  card.ChecklistItems.every((item) => item.completed == 1);

  if (filters.status === "complete" && !isCompleted) return false;
  if (filters.status === "incomplete" && isCompleted) return false;
}

    return true;
  });
};
  if (!board) return <div>Loading...</div>;

  return (
    <div className="app">
      <Topbar
        onSearch={handleSearch}
        onOpenFilter={() => setShowFilter(prev => !prev)}
      />
<DragDropContext onDragEnd={handleDragEnd}>
  <div className="main">
    
    {/* ✅ Sidebar INSIDE context */}
    {board && <Sidebar lists={board.Lists} />}

    <div className="board-container">
  <div className="content">
      <div className="board-header">
        <h2>{board.title}</h2>
      </div>

      <div className="board-wrapper">
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
              {board.Lists
                ?.filter((list) => list.title !== "Inbox")
                .map((list, index) => {
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
      </div>
    </div>
    </div>
  </div>
</DragDropContext>

      <FilterPanel
  show={showFilter}
  onClose={() => setShowFilter(false)}
  filters={filters}
  setFilters={setFilters}
  labels={
  board?.Lists?.flatMap(list =>
    list.Cards.flatMap(card => card.Labels || [])
  ) || []
}  // TEMP (replace later with real data)
  members={[]}  // TEMP
/>
    </div>
  );
}

export default Board;