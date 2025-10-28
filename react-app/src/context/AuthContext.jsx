import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "setIsLoading":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "signup":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: false,
      };

    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Load existing session if any
  useEffect(function () {
    const storedData = localStorage.getItem("ticketapp_session");
    const data = storedData
      ? JSON.parse(storedData)
      : { users: [], currentUser: null };

    if (data.currentUser) {
      dispatch({ type: "login", payload: data.currentUser });
    } else {
      dispatch({ type: "logout" }); // Ensure logout state if there's no current user
    }
    dispatch({ type: "setIsLoading", payload: false });
  }, []);

  // SIGN UP
  function signup(name, email, password) {
    // Get all users from storage
    const storedData = localStorage.getItem("ticketapp_session");
    const storedUsers = storedData ? JSON.parse(storedData).users || [] : [];

    // Check if user exists
    const userExists = storedUsers.find((user) => user.email === email);

    if (userExists) {
      toast.error("User already exists. Please login");
      return;
    }

    // Create new user
    const newUser = { name, email, password };
    storedUsers.push(newUser); // Append new user

    // Store users array within an object
    localStorage.setItem(
      "ticketapp_session",
      JSON.stringify({
        users: storedUsers,
        currentUser: null,
      })
    );
    dispatch({ type: "signup", payload: newUser });
  }

  // LOGIN
  function login(email, password) {
    const storedData = localStorage.getItem("ticketapp_session");
    const data = storedData ? JSON.parse(storedData) : { users: [] };
    const storedUsers = data.users || [];

    const user = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Update storage with current user
      localStorage.setItem(
        "ticketapp_session",
        JSON.stringify({
          users: storedUsers,
          currentUser: user,
        })
      );

      dispatch({ type: "login", payload: user });
      toast.success("Login successful!");
      return true;
    } else {
      toast.error("Invalid login credentials!");
      return false;
    }
  }

  // LOGOUT
  function logout() {
    // Preserve users array while clearing current user
    const storedData = localStorage.getItem("ticketapp_session");
    const data = storedData ? JSON.parse(storedData) : { users: [] };

    localStorage.setItem(
      "ticketapp_session",
      JSON.stringify({
        users: data.users,
        currentUser: null,
      })
    );
    dispatch({ type: "logout" });
    toast.info("Logged out successfully");
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

// eslint-disable-next-line
export { AuthProvider, useAuth };
