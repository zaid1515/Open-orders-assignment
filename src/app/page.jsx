"use client";

import { useState, useMemo } from "react";
import Papa from "papaparse";
import SearchBar from "./components/SearchBar";
import OrdersTable from "./components/OrdersTable";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

const initialOrders = [
  {
    id: 1,
    time: "08:14:31",
    client: "AAA001",
    ticker: "RELIANCE",
    side: "Buy",
    product: "CNC",
    executed: 50,
    total: 100,
    price: 250.5,
  },
  {
    id: 2,
    time: "08:14:31",
    client: "AAA003",
    ticker: "MRF",
    side: "Buy",
    product: "NRML",
    executed: 10,
    total: 20,
    price: 2700.0,
  },
  {
    id: 3,
    time: "08:14:31",
    client: "AAA002",
    ticker: "ASIANPAINT",
    side: "Buy",
    product: "NRML",
    executed: 10,
    total: 30,
    price: 1500.6,
  },
  {
    id: 4,
    time: "08:14:31",
    client: "AAA002",
    ticker: "TATAINVEST",
    side: "Sell",
    product: "INTRADAY",
    executed: 10,
    total: 10,
    price: 2300.1,
  },
];

export default function Page() {
  const [orders, setOrders] = useState(initialOrders);
  const [filters, setFilters] = useState({
    client: [],
    ticker: [],
    search: "",
  });
  const [sortConfig, setSort] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(
    () =>
      orders.filter((o) => {
        if (filters.client.length && !filters.client.includes(o.client))
          return false;
        if (filters.search) {
          const s = filters.search.toLowerCase();
          return Object.values(o).some((v) =>
            String(v).toLowerCase().includes(s)
          );
        }
        return true;
      }),
    [orders, filters]
  );
  

  const sorted = useMemo(() => {
    if (!sortConfig.key) return filtered;
    return [...filtered].sort((a, b) => {
      let v1 = a[sortConfig.key],
        v2 = b[sortConfig.key];
      if (typeof v1 === "string") {
        v1 = v1.toLowerCase();
        v2 = v2.toLowerCase();
      }
      if (v1 < v2) return sortConfig.direction === "asc" ? -1 : 1;
      if (v1 > v2) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortConfig]);

  const pages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice((page - 1) * pageSize, page * pageSize);

  const onSort = (key) =>
    setSort((cfg) => ({
      key,
      direction: cfg.key === key && cfg.direction === "asc" ? "desc" : "asc",
    }));
  const onFilter = (type, vals) => setFilters((f) => ({ ...f, [type]: vals }));
  const onSearch = (txt) => setFilters((f) => ({ ...f, search: txt }));
  const onCancel = (id) => setOrders((o) => o.filter((x) => x.id !== id));

  const onDownload = () => {
    const csvData = sorted.map(({ id, executed, total, ...o }) => ({
      ...o,
      Qty: `${executed}/${total}`,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "open_orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-8xl mx-auto p-6 ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-4">Open Orders</h1>
        <button
          onClick={onDownload}
          className="px-5 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 mr-5 m-2 font-semibold"
        >
          <div className="flex">
            <ArrowDownTrayIcon className="h-6 w-5" />

            <span className="px-1">Download</span>
          </div>
        </button>
      </div>

      <div className="mx-auto p-6 bg-white rounded-xl shadow">
        <SearchBar
          filters={filters}
          setOrders={setOrders}
          onFilterChange={onFilter}
          onSearch={onSearch}
        />

        <OrdersTable
          orders={paged}
          sortConfig={sortConfig}
          onSort={onSort}
          onCancel={onCancel}
          setOrders={setOrders}
          filters={filters}
        />

        <div className="flex justify-end items-center mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 m-2 font-semibold rounded border-gray-300 border-2"
          >
            Previous
          </button>

          <div className="font-semibold">
            Page {page} of {pages}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page === pages}
            className="px-4 py-2 m-2 font-semibold rounded border-gray-300 border-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
