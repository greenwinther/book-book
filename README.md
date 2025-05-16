# Book Book

## 📌 About

This is a wizard-themed book tracking app using the Open Library API. You can search for books, explore detailed information, favorite titles, track your reading status, and see personal statistics such as total books read and pages completed. The app is built with React, TypeScript, Vite, and Sass, with a mobile-first layout and magical aesthetic inspired by an old wizard's library.

## 🛠 How to Install

1. Clone the repo:
    ```sh
    git clone https://github.com/greenwinther/book-book.git
    ```
2. Navigate into the project folder:
    ```sh
    cd your-repo
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## 🚀 How to Compile & Run

1. To start the project in development mode, run:
    ```sh
    npm run dev
    ```

## 🗂 Folder Structure

```
📁 src/
├── 📁 assets/                 # Static assets like fonts or images
├── 📁 components/             # Reusable UI components (e.g., BookCard, StatusDropdown)
├── 📁 context/                # Context API for global state (favorites, status)
├── 📁 hooks/                  # Custom React hooks (e.g., useAuthor, useSearchBooks)
├── 📁 pages/                  # Route-level views (Home, Search, BookDetail, etc.)
├── 📁 styles/                 # SCSS partials (base, layout, mixins, etc.)
├── 📁 types/                  # Global TypeScript types
├── 📁 utils/                  # Helper functions (e.g., fetchBookCover)
├── 📄 App.tsx                 # Root component with React Router setup
├── 📄 main.tsx                # Vite entry point
```

## 🌐 API Info

-   **API:** Open Library API
-   **Endpoints Used:**
    -   /search.json – for search results
    -   /works/:id.json – for book details
    -   /authors/:id.json – for author info
    -   /subjects/:name.json – for category recommendations
-   **Authentication:** No API key required

## 📚 Technologies Used

-   **React** - UI framework
-   **TypeScript** - For type safety
-   **Sass (SCSS)** - Styling with variables and mixins
-   **React Router** - Client-side routing
-   **Vite** - Build tool for fast development
-   **Open Library API** - Free book metadata source

## 🎨 Theme & Design

The app's aesthetic is inspired by a wizard's personal study: mystical fonts, aged paper tones, subtle glows, and medieval UI elements. The design adapts gracefully across devices while keeping its magical feel.

## 🔗 Connect with Me

[LinkedIn Profile](https://www.linkedin.com/in/dennis-gren-winther/)
