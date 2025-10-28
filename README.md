# Tick-it Frameworks Overview

Welcome to the **Tick-it** application frameworks documentation! This project utilizes three key frameworks: **Vue**, **React**, and **Twig**. Each framework resides in its own directory. Below are links to the respective README files for detailed information on implementation, libraries used, state structure, and example test user credentials.

## Frameworks

* [Vue Framework](./vue-app/README.md)
* [React Framework](./react-app/README.md)
* [Twig Framework](./twig-app/README.md)

## General Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/DavidTimi1/tick-it-hng13
   cd tick-it-hng13
   ```
2. Ensure **Node.js** (for Vue and React) and **Composer** (for Twig) are installed.
3. Follow the framework-specific instructions below.

## Framework-Specific Setup

### Vue (located in `/vue-app`)

1. Navigate to the Vue directory:

   ```bash
   cd vue-app
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm run dev
   ```
4. Access the application at [http://localhost:5173](http://localhost:5173) (default port).

### React (located in `/react-app`)

1. Navigate to the React directory:

   ```bash
   cd react-app
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm run dev
   ```
4. Access the application at [http://localhost:3000](http://localhost:3000) (default port).

### Twig (located in `/twig-app`)

1. Navigate to the Twig directory:

   ```bash
   cd twig-app
   ```
2. Install PHP dependencies using Composer:

   ```bash
   composer install
   ```
3. Configure your web server to serve the `public/` folder, or use the built-in PHP server:

   ```bash
   php -S localhost:8000 -t public
   ```
4. Access the application at [http://localhost:8000](http://localhost:8000).
