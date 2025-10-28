import { create } from 'zustand';

// --- TYPES ---
export type Status = 'open' | 'in_progress' | 'closed';
export type Priority = 'Low' | 'Medium' | 'High';
export type Page = '/' | '/auth/login' | '/auth/signup' | '/dashboard' | '/tickets';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  lastUpdated: string;
}

export interface User {
  email: string;
  token: string;
}

// --- MOCK DATA ---
export const SESSION_KEY = 'ticketapp_session';
export const MOCK_USER: User = { email: 'user@Tick-it.com', token: 'mock-auth-token-123' };
export const AUTH_PASSWORD = 'password';

const initialTickets: Ticket[] = [
  { id: 'T-123', title: 'Server Connection Issue', description: 'The main server is intermittently failing.', priority: 'High', status: 'open', lastUpdated: '2 hours ago' },
  { id: 'T-124', title: 'UI Glitch on Login Page', description: 'Misaligned password field.', priority: 'Medium', status: 'in_progress', lastUpdated: '1 day ago' },
  { id: 'T-125', title: 'Export to CSV Fails', description: 'Results in an empty file.', priority: 'Low', status: 'closed', lastUpdated: '3 days ago' },
];

// --- HELPERS ---
const generateId = () => `T-${Math.floor(Math.random() * 900) + 100}`;
const getCurrentTimeAgo = () => `just now`;

// --- STORE ---
interface StoreState {
  user: User | null;
  tickets: Ticket[];
  login: (user: User) => void;
  logout: () => void;
  addTicket: (ticket: Omit<Ticket, 'id' | 'lastUpdated'>) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  user: localStorage.getItem(SESSION_KEY) ? MOCK_USER : null,
  tickets: initialTickets,
  login: (user) => {
    localStorage.setItem(SESSION_KEY, user.token);
    set({ user });
  },
  logout: () => {
    localStorage.removeItem(SESSION_KEY);
    set({ user: null });
  },
  addTicket: (ticket) =>
    set((state) => ({
      tickets: [
        { ...ticket, id: generateId(), lastUpdated: getCurrentTimeAgo() },
        ...state.tickets,
      ],
    })),
  updateTicket: (id, updates) =>
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id ? { ...t, ...updates, lastUpdated: getCurrentTimeAgo() } : t
      ),
    })),
  deleteTicket: (id) =>
    set((state) => ({
      tickets: state.tickets.filter((t) => t.id !== id),
    })),
}));

// --- TOAST STORE ---
export const useToast = create<{
  message: string | null;
  variant: 'success' | 'error';
  show: (msg: string, v: 'success' | 'error') => void;
  hide: () => void;
}>((set) => ({
  message: null,
  variant: 'success',
  show: (message, variant) => {
    set({ message, variant });
    setTimeout(() => set({ message: null }), 3000);
  },
  hide: () => set({ message: null }),
}));
