# E-Commerce Product Listing Application

This is a responsive, feature-rich product listing and detail application built using React, Vite, and Tailwind CSS. It integrates with the [DummyJSON API](https://dummyjson.com/docs/products) to display products, handle filtering, and manage pagination.

## Setup Instructions

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

4. **Build for production** (Optional):
   ```bash
   npm run build
   ```

## Assumptions Made

- **Data Fetching Strategy:** The DummyJSON API natively supports pagination and category filtering, but it lacks robust server-side query parameters for combined filtering (e.g., filtering simultaneously by Category, Price Range, and Brand). Therefore, the app fetches all products upfront (using `limit=0`) and performs pagination and advanced filtering on the client side. This ensures that the user experiences seamless, accurate, and instant updates across all combinations of filters.
- **URL Search Parameters:** State for filters and pagination is maintained via `URLSearchParams`. This ensures the UI remains intact when navigating back from the Product Detail page to the Listing page.
- **Design Specifications:** The app implements a fixed-layout approach (`100vh`) with internal scrollable areas to mimic a desktop-like web application, adhering to the provided design mockups.

## Architectural Decisions

- **Framework:** Initialized with **Vite** and **React (JavaScript)** to provide a fast and modern development experience.
- **Styling:** Used **Tailwind CSS v4** for clean, utility-first styling to closely match the provided UI mockups without the overhead of heavy UI component libraries. 
- **Routing:** Handled by `react-router-dom`, supporting robust navigation and state preservation (via query parameters).
- **Service Layer (API):** Extracted all API calls into a dedicated `src/services/api.js` file using **Axios**. Interceptors are configured for both requests and responses, keeping the components clean and preparing the app for scalability (e.g., adding authentication headers in the future).
- **Component Structure:** Segmented into reusable layout pieces:
  - `Navbar`: For top-level navigation and search.
  - `Sidebar`: Encapsulates all filter logic (Categories, Price, Brands).
  - `ProductCard`: A presentational component for grid items.
  - `Pagination`: A custom sliding-window pagination component that avoids overflow issues and precisely matches the UI mockup.

## Improvements if Given More Time

- **Debouncing & Performance:** Implement debouncing on the price inputs and search fields to prevent excessive re-renders while typing.
- **State Management Library:** Introduce a lightweight global state manager (like Zustand or Redux Toolkit) to simplify prop drilling if the application scales further.
- **Testing:** Add comprehensive unit testing using Jest/React Testing Library, particularly focusing on the combined filtering and pagination logic.
- **Accessibility (a11y):** Improve ARIA labels and keyboard navigation to ensure the sidebar filters and pagination controls are fully accessible to screen readers.
- **Skeleton Loaders:** Replace the standard loading spinners with skeleton loaders for the product grid and detail page to provide a smoother, perceived performance boost during data fetching.
