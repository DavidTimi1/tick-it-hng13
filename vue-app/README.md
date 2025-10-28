# Tick-it: Streamlined Ticket Management

## Overview

Tick-it is a modern, responsive single-page application built with Vue.js for efficient ticket creation, tracking, and management. It leverages Pinia for robust state management, Vue Router for seamless navigation, and Tailwind CSS for a sleek, utility-first design, providing a smooth user experience.

## Features

- **User Authentication**: Secure user registration, login, and logout functionalities.
- **Ticket Creation**: Easily create new tickets with titles, descriptions, and initial status.
- **Ticket Management**: View, edit, and delete existing tickets.
- **Dynamic Dashboard**: A personalized dashboard displaying a summary of all tickets, categorized by status (Open, In Progress, Closed).
- **Responsive Design**: Optimized for a consistent experience across various devices and screen sizes.
- **Client-Side Persistence**: User and ticket data are persisted locally using `localStorage`.
- **Form Validation**: Client-side validation for all forms to enhance user input quality.

## Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Installation

To get a copy of this project up and running on your local machine, follow these simple steps.

- 📥 Clone the repository to your local machine:
  ```bash
  git clone https://github.com/DeraTheOz/ticket-app-vue.git
  ```
- ➡️ Navigate into the project directory:
  ```bash
  cd ticket-app-vue
  ```
- 📦 Install the necessary dependencies:
  ```bash
  npm install
  ```
- 🚀 Start the development server:
  ```bash
  npm run dev
  ```

The application should now be running locally, typically accessible at `http://localhost:5173`.

### Environment Variables

This project primarily uses `localStorage` for data persistence and does not require external environment variables for basic functionality. All configurations are handled within the Vue application.

## Usage

Once the development server is running, open your web browser and navigate to the local address (e.g., `http://localhost:5173`).

### User Flow:

1.  **Landing Page**: You'll first land on the home page, which offers options to "Login" or "Get Started" (Sign Up).
2.  **Sign Up**: If you're a new user, click "Get Started" to register a new account. Fill in your name, email, and a strong password. Client-side validation will guide you through the process.
3.  **Login**: After signing up (or if you already have an account), log in using your registered email and password.
4.  **Dashboard**: Upon successful login, you'll be redirected to your personal dashboard. Here, you can see an overview of your total tickets and their statuses (Open, In Progress, Closed).
5.  **Manage Tickets**: Click "Manage Tickets" or navigate to the `/tickets` route to view, create, edit, and delete your tickets.
6.  **Create Ticket**: Use the form at the top of the Tickets page to create a new ticket. Provide a title, an optional description, and select its initial status.
7.  **Edit/Delete Ticket**: Each ticket card on the Tickets page includes "Edit" and "Delete" buttons for seamless management.
8.  **Logout**: Log out from the navigation bar to end your session.

## Technologies Used

| Technology                                                                                                              | Description                                                                                |
| :---------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| ![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)                   | A progressive JavaScript framework for building user interfaces.                           |
| ![Pinia](https://img.shields.io/badge/Pinia-FFD11B?style=for-the-badge&logo=pinia&logoColor=black)                      | The official state management library for Vue.js.                                          |
| ![Vue Router](https://img.shields.io/badge/Vue%20Router-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)         | The official routing library for Vue.js applications.                                      |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                         | A next-generation frontend tooling that provides an extremely fast development experience. |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | A utility-first CSS framework for rapidly building custom designs.                         |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)       | The core programming language for web development.                                         |

## Author Info

**Emmanuel Ihemedu**

I'm passionate about building elegant and efficient web applications. Connect with me on social media:

- [LinkedIn](https://linkedin.com/in/emmanuel-ihemedu)
- [Twitter](https://twitter.com/deraamaobi)

---

[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Pinia](https://img.shields.io/badge/Pinia-FFD11B?style=flat&logo=pinia&logoColor=black)](https://pinia.vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
