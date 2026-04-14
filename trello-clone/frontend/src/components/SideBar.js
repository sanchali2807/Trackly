import { createCard } from "../api/api";

function Sidebar() {
  const handleAddCard = async () => {
    await createCard({
      title: "New Card",
      listId: 5, // 👈 give a default list ID (like Inbox list)
      position: 0,
    });

    window.location.reload();
  };

  return (
    <div className="sidebar">
      <h3>Inbox</h3>

      <button className="add-card" onClick={handleAddCard}>
        + Add a card
      </button>

      <button>Start using Trello</button>
    </div>
  );
}

export default Sidebar;