import { useNavigate } from "react-router-dom";
import { useTickets } from "../context/TicketsContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TicketCard from "../components/TicketCard";
import TicketForm from "../components/TicketForm";

export default function Tickets() {
  const navigate = useNavigate();
  const { tickets } = useTickets();

  return (
    <>
      <Navbar />

      <main className="px-4 py-10 max-w-[90rem] mx-auto min-h-[80vh] flex flex-col gap-10">
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-semibold text-gray-900">
            Ticket Management
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md text-sm font-medium transition-colors"
          >
            Back to Dashboard
          </button>
        </section>

        <TicketForm />

        {/* Tickets List */}
        <section>
          <h2 className="text-lg md:text-xl font-medium mb-4">
            Created tickets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.length === 0 ? (
              <p className="text-gray-500 text-center col-span-full">
                No tickets yet. Create your first one above!
              </p>
            ) : (
              tickets.map((ticket) => (
                <TicketCard ticket={ticket} key={ticket.id} />
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
