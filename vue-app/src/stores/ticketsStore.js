import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useAuthStore } from "./authStore";
import { validateTickets } from "../utils/validateTickets";
import { toast } from "vue3-toastify";

export const useTicketsStore = defineStore("tickets", () => {
  // Auth
  const auth = useAuthStore();
  const user = computed(() => auth.user);

  // State
  const tickets = ref([]);
  const editingTicket = ref(null);
  const formData = ref({
    title: "",
    description: "",
    status: "open",
  });
  const errors = ref({});

  // Load tickets when user changes
  watch(
    user,
    (currentUser) => {
      if (currentUser) {
        const storedData = JSON.parse(
          localStorage.getItem("ticketapp_session")
        ) || { users: [] };
        const foundUser = storedData.users.find(
          (u) => u.email === currentUser.email
        );
        tickets.value = foundUser?.tickets || [];
      } else {
        tickets.value = [];
      }
    },
    { immediate: true }
  );

  // Save tickets to localStorage
  function saveTickets(newTickets) {
    const storedData = JSON.parse(
      localStorage.getItem("ticketapp_session")
    ) || { users: [] };
    const updatedUsers = storedData.users.map((u) =>
      u.email === user.value.email ? { ...u, tickets: newTickets } : u
    );
    localStorage.setItem(
      "ticketapp_session",
      JSON.stringify({
        ...storedData,
        users: updatedUsers,
        currentUser: { ...user.value, tickets: newTickets },
      })
    );
    tickets.value = newTickets;
  }

  // Validation
  function validate() {
    const validationErrors = validateTickets(
      formData.value.title,
      formData.value.description,
      formData.value.status
    );
    errors.value = validationErrors;
    return !Object.values(validationErrors).some((err) => err !== null);
  }

  // Actions
  function handleSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the form errors");
      return;
    }

    let updatedTickets;
    if (editingTicket.value) {
      updatedTickets = tickets.value.map((ticket) =>
        ticket.id === editingTicket.value.id
          ? { ...formData.value, id: editingTicket.value.id }
          : ticket
      );
      toast.success("Ticket updated successfully!");
    } else {
      const newTicket = {
        id: Date.now(),
        ...formData.value,
        userId: user.value.email,
      };
      updatedTickets = [...tickets.value, newTicket];
      toast.success("Ticket created successfully!");
    }

    saveTickets(updatedTickets);
    resetForm();
  }

  function handleEdit(ticket) {
    editingTicket.value = ticket;
    formData.value.title = ticket.title;
    formData.value.description = ticket.description;
    formData.value.status = ticket.status;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this ticket?")) return;
    const filtered = tickets.value.filter((t) => t.id !== id);
    saveTickets(filtered);
    toast.success("Ticket deleted successfully!");
  }

  function resetForm() {
    formData.value = {
      title: "",
      description: "",
      status: "open",
    };
    editingTicket.value = null;
    errors.value = {};
  }

  function updateFormField(field, value) {
    formData.value[field] = value;
    const validationErrors = validateTickets(
      field === "title" ? value : formData.value.title,
      field === "description" ? value : formData.value.description,
      field === "status" ? value : formData.value.status
    );
    errors.value[field] = validationErrors[field];
  }

  return {
    tickets,
    editingTicket,
    formData,
    errors,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    updateFormField,
  };
});
