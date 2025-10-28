function TicketRow({ ticket }) {
  return (
    <tr className="border-t border-t-[#cfdbe7]">
      <td className="h-[72px] px-4 py-2 w-[400px] text-[#0d141b] text-sm font-normal leading-normal">
        {ticket.title}
      </td>
      <td className="table-ec19de06-ade5-48db-9432-08f80a721c73-column-240 h-[72px] px-4 py-2 w-[400px] text-[#4c739a] text-sm font-normal leading-normal">
        {ticket.description || "Not specified"}
      </td>
      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
        <button
          disabled
          className={`flex items-center justify-center overflow-hidden rounded-lg h-8 px-4 ${
            ticket.status === "open"
              ? "text-green-600 bg-green-100"
              : ticket.status === "in_progress"
              ? "text-amber-600 bg-amber-100"
              : "text-gray-600 bg-gray-100"
          }  text-sm font-medium leading-normal`}
        >
          <span className="truncate">{ticket.status.replace("_", " ")}</span>
        </button>
      </td>
    </tr>
  );
}

export default TicketRow;
