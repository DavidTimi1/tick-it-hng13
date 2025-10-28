import { createContext, useContext, useEffect, useReducer } from "react";
import { validateTickets } from "../utils/validateTickets";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const TicketsContext = createContext();

const initialState = {
  tickets: [],
  editingTicket: null,
  formData: {
    title: "",
    description: "",
    status: "open",
  },
  errors: {},
};

function ticketsReducer(state, action) {
  switch (action.type) {
    case "setTickets":
      return {
        ...state,
        tickets: action.payload,
      };

    case "setEditingTicket":
      return {
        ...state,
        editingTicket: action.payload,
        formData: action.payload
          ? {
              title: action.payload.title,
              description: action.payload.description,
              status: action.payload.status,
            }
          : initialState.formData,
      };

    case "updateForm":
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };

    case "setErrors":
      return {
        ...state,
        errors: action.payload,
      };

    case "resetForm":
      return {
        ...state,
        formData: initialState.formData,
        editingTicket: null,
        errors: {},
      };

    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
}

function TicketsProvider({ children }) {
  const [state, dispatch] = useReducer(ticketsReducer, initialState);
  const { user } = useAuth(); // Get current user

  // Load tickets from localStorage for current user
  useEffect(() => {
    if (user) {
      const storedData = localStorage.getItem("ticketapp_session");
      const data = storedData ? JSON.parse(storedData) : { users: [] };

      // Find current user's tickets
      const currentUser = data.users.find((u) => u.email === user.email);
      const userTickets = currentUser?.tickets || [];

      dispatch({ type: "setTickets", payload: userTickets });
    }
  }, [user]);

  // Helper: Save tickets to localStorage for current user
  const saveTickets = (tickets) => {
    const storedData = localStorage.getItem("ticketapp_session");
    const data = storedData ? JSON.parse(storedData) : { users: [] };

    // Find and update current user's tickets
    const updatedUsers = data.users.map((u) => {
      if (u.email === user.email) {
        return { ...u, tickets };
      }
      return u;
    });

    // Save back to localStorage
    localStorage.setItem(
      "ticketapp_session",
      JSON.stringify({
        ...data,
        users: updatedUsers,
        currentUser: { ...user, tickets },
      })
    );

    dispatch({ type: "setTickets", payload: tickets });
  };

  const validate = () => {
    const validationErrors = validateTickets(
      state.formData.title,
      state.formData.description,
      state.formData.status
    );

    dispatch({ type: "setErrors", payload: validationErrors });

    // Check if there are any errors
    return !Object.values(validationErrors).some((error) => error !== null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the form errors");
      return;
    }

    let updatedTickets;
    if (state.editingTicket) {
      updatedTickets = state.tickets.map((ticket) =>
        ticket.id === state.editingTicket.id
          ? { ...state.formData, id: state.editingTicket.id }
          : ticket
      );
      toast.success("Ticket updated successfully!");
    } else {
      const newTicket = {
        id: Date.now(),
        ...state.formData,
        userId: user.email, // Add user identifier to ticket
      };
      updatedTickets = [...state.tickets, newTicket];
      toast.success("Ticket created successfully!");
    }

    saveTickets(updatedTickets);
    dispatch({ type: "resetForm" });
  };

  const handleEdit = (ticket) => {
    dispatch({ type: "setEditingTicket", payload: ticket });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;
    const filtered = state.tickets.filter((t) => t.id !== id);
    saveTickets(filtered);
    toast.success("Ticket deleted successfully!");
  };

  const resetForm = () => {
    dispatch({ type: "resetForm" });
  };

  const updateFormField = (field, value) => {
    dispatch({
      type: "updateForm",
      payload: { [field]: value },
    });

    // Validate the field as user types
    const validationErrors = validateTickets(
      field === "title" ? value : state.formData.title,
      field === "description" ? value : state.formData.description,
      field === "status" ? value : state.formData.status
    );

    dispatch({
      type: "setErrors",
      payload: { ...state.errors, [field]: validationErrors[field] },
    });
  };

  return (
    <TicketsContext.Provider
      value={{
        ...state,
        handleSubmit,
        handleEdit,
        handleDelete,
        resetForm,
        updateFormField,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
}

function useTickets() {
  const context = useContext(TicketsContext);
  if (context === undefined) {
    throw new Error("useTickets must be used within a TicketsProvider");
  }
  return context;
}

// eslint-disable-next-line
export { TicketsProvider, useTickets };
