import { useTickets } from "../context/TicketsContext";

function TicketCard({ ticket }) {
  const { handleEdit, handleDelete } = useTickets();

  // Status Color Utility
  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "text-green-600 bg-green-100";
      case "in_progress":
        return "text-amber-600 bg-amber-100";
      case "closed":
        return "text-gray-600 bg-gray-100";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-gray-800">{ticket.title}</h3>
      <p className="text-sm text-gray-600">
        {ticket.description || "No description"}
      </p>
      <span
        className={`inline-block self-start text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(
          ticket.status
        )}`}
      >
        {ticket.status.replace("_", " ")}
      </span>
      <div className="flex gap-3 mt-3">
        <button
          onClick={() => handleEdit(ticket)}
          className="text-sm bg-amber-100 text-amber-700 hover:bg-amber-200 px-3 py-1 rounded-md font-medium transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(ticket.id)}
          className="text-sm bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TicketCard;
