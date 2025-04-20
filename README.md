# Open-orders-assignment# Orders Page

A mobile‐responsive recreation of the “Open Orders” page from the web application, built with Next.js (Client Components). This repo demonstrates a clean UI/UX, dynamic filtering, sorting, CSV export, and order cancellation features, optimized for both desktop and mobile screens.

---

## 🚀 Project Overview

- **Tech Stack**: Next.js (v14+), React, Tailwind CSS, Heroicons, Papaparse
- **Components**:
  - **Navbar**: Displays logo and real‐time stock quotes; collapsible menu on mobile
  - **SearchBar**: Filter by ticker (pill tags + icon), global search, and “Cancel All”
  - **OrdersTable**: Sortable columns, paginated rows, single‐click cancel per row
  - **Page**: Parent layout handling state, filters, sorting, pagination, and CSV download
- **Key Features**:
  - Mobile‐first design with Tailwind utilities and responsive breakpoints
  - **Download** button exports the currently filtered & sorted table to a CSV file
  - **Search/Add Ticker**: Enter a symbol, hit Enter to add a pill tag; matches show a blue radio icon
  - **Sorting**: Click headers to toggle ascending/descending on nearly every column
  - **Cancel All**: Clears every order from the list instantly
  - **Pagination**: Simple previous/next controls for large data sets

---

## 📁 Project Structure

```txt
src/
├─ app/
│  └─ page.jsx           # Main entry (Client Component) with state management
├─ components/
│  ├─ Navbar.jsx         # Logo + stock ticker display + mobile menu
│  ├─ SearchBar.jsx      # Search input, add ticker, cancel all
│  └─ OrdersTable.jsx    # Table with sorting, cancel row, pagination
├─ styles/
│  └─ globals.css        # Tailwind base imports and custom overrides
├─ public/
│  └─ logo.jpeg          # Company logo
└─ package.json          # Dependencies & scripts
```

---

## 💻 Installation & Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zaid1515/Open-orders-assignment
   cd Open-orders-assignment
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Run development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Open in browser:**
   Navigate to `http://localhost:3000`.

---

## ⚙️ Usage Details

- **Download CSV**
  - Click the **Download** button in the header. It exports a CSV containing the filtered & sorted orders (excluding internal IDs), with a `Qty` column combining executed/total values.

- **Search & Add Ticker**
  - Enter a symbol (e.g., `RELIANCE`) in the search input.
  - Press **Enter** or click search icon.
  - A pill tag is added and the table filters to matching tickers.
  - Each matching ticker shows a blue radio icon in its cell.
  - Click the ❌ icon on a pill to remove that ticker filter.

- **Sorting Columns**
  - Click on any column header (Time, Client, Ticker, Side, Product, Qty, Price).
  - Click again to toggle ascending/descending order.

- **Cancel Individual Order**
  - Click the ⋮ icon in the Actions column to delete that row.

- **Cancel All Orders**
  - Click the **Cancel All** button in the search bar to clear all orders.

- **Pagination**
  - Use **Previous** and **Next** buttons below the table to navigate pages.

---

## 📱 Mobile Responsiveness

- Utilizes Tailwind’s responsive utilities (e.g., `md:`, `lg:` prefixes) to adjust layouts:
  - **Navbar** collapses into a hamburger menu on small screens.
  - **Table** scrolls horizontally if content overflows.
  - **Controls** (buttons, inputs, pills) wrap and resize for touch targets.

---

## 📖 Approach & Notes

1. **State Management**: Kept local to the page using React’s `useState` & `useMemo` for filtering and sorting performance.
2. **CSV Export**: Leveraged `papaparse` to unparse JSON to CSV, then created a Blob for download.
3. **Accessibility**: Interactive elements use semantic HTML and focus styles are customized.
4. **Icons**: Heroicons and React Icons for consistent look.
5. **Folder Organization**: Components are small, focused, and reusable.

---

## 🔗 Live Demo

A live deployment is available at: [https://open-orders-assignment.vercel.app/](https://open-orders-assignment.vercel.app/)

---