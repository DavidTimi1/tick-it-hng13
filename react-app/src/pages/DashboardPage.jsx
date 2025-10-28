import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTickets } from "../context/TicketsContext";
import TicketRow from "../components/TicketRow";

function Dashboard() {
  const { user } = useAuth();
  const { tickets } = useTickets(); // Get tickets from context
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });

  useEffect(() => {
    // Compute statistics based on current user's tickets
    const total = tickets.length;
    const open = tickets.filter((ticket) => ticket.status === "open").length;
    const inProgress = tickets.filter(
      (ticket) => ticket.status === "in_progress"
    ).length;
    const closed = tickets.filter(
      (ticket) => ticket.status === "closed"
    ).length;

    setStats({ total, open, inProgress, closed });
  }, [tickets]);

  return (
    <>
      <Navbar />

      <main className="px-4 py-12 max-w-[90rem] mx-auto min-h-[80vh] flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Welcome back, <span className="text-orange-500">{user?.name}</span>
          </h1>

          {/* Navigation */}
          <div>
            <Link
              to="/tickets"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Manage Tickets
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-100">
            <h2 className="text-gray-600 text-sm uppercase tracking-wide">
              Total Tickets
            </h2>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {stats.total}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-100">
            <h2 className="text-gray-600 text-sm uppercase tracking-wide">
              Open
            </h2>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {stats.open}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-100">
            <h2 className="text-gray-600 text-sm uppercase tracking-wide">
              In Progress
            </h2>
            <p className="text-3xl font-bold text-amber-500 mt-2">
              {stats.inProgress}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-100">
            <h2 className="text-gray-600 text-sm uppercase tracking-wide">
              Closed
            </h2>
            <p className="text-3xl font-bold text-gray-500 mt-2">
              {stats.closed}
            </p>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-lg md:text-xl font-medium mb-4">
            Recent Activity
          </h2>

          {tickets.length === 0 ? (
            <p className="text-gray-500 text-center">
              No activity to show. Start by creating a ticket!
            </p>
          ) : (
            <div className="flex overflow-x-scroll rounded-lg border border-[#cfdbe7] bg-slate-50">
              <table className="flex-1">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="table-ec19de06-ade5-48db-9432-08f80a721c73-column-120 px-4 py-3 text-left text-[#0d141b] w-[400px] text-sm font-medium leading-normal">
                      Title
                    </th>
                    <th className="table-ec19de06-ade5-48db-9432-08f80a721c73-column-240 px-4 py-3 text-left text-[#0d141b] w-[400px] text-sm font-medium leading-normal">
                      Description
                    </th>
                    <th className="table-ec19de06-ade5-48db-9432-08f80a721c73-column-360 px-4 py-3 text-left text-[#0d141b] w-60 text-sm font-medium leading-normal">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <TicketRow ticket={ticket} key={ticket.id} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;
