import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import Wave from "../assets/wave.svg";

function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center justify-center w-full">
        {/* Hero Section */}
        <section className="relative w-full bg-gradient-to-b from-green-500 to-green-700 text-white overflow-hidden">
          <div className="max-w-[90rem] mx-auto px-4 py-24 text-center flex flex-col items-center gap-6">
            <h1 className="relative max-w-2xl text-4xl md:text-6xl font-bold">
              Create. Track. Resolve. Tick-it.
              {/* Decorative circles */}
              <span className="absolute -top-10 left-0 w-32 h-32 bg-green-300 rounded-full opacity-10"></span>
              <span className="absolute -bottom-10 right-0 w-32 h-32 bg-green-300 rounded-full opacity-10"></span>
            </h1>

            <p className="max-w-lg text-lg md:text-xl">
            Manage every ticket with ease, clarity, and confidence.
            </p>
            {!isAuthenticated ? (
              <div className="flex flex-col sm:flex-row gap-4 my-6">
                <Link
                  to="/auth/login"
                  className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold  hover:opacity-90 transition"
                >
                  Login
                </Link>
                <Link
                  to="/auth/signup"
                  className="bg-green-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-900 transition"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-center my-6">
                <Link
                  to="/dashboard"
                  className="text-green-700 bg-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
                >
                  Proceed to Dashboard
                </Link>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <img
              src={Wave}
              alt="Wave background"
              aria-hidden="true"
              className="w-full h-28"
            />
          </div>
        </section>

        {/* Feature Boxes */}
        <section className="max-w-[90rem] w-full px-4 py-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center border">
            <h3 className="text-xl font-semibold mb-2">Create Tickets</h3>
            <p className="text-gray-600">
              Log new issues with details and assign priorities effortlessly.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center border">
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              View ticket statuses in real time to monitor updates and
              resolutions.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center border">
            <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
            <p className="text-gray-600">
              Manage team workflows efficiently with role-based ticket
              assignments.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default LandingPage;
