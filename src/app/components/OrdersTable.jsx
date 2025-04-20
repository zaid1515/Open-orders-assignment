'use client'

import { FiChevronUp, FiChevronDown, FiMoreVertical } from 'react-icons/fi'
import { RiRadioButtonLine } from 'react-icons/ri'

export default function OrdersTable({ orders, sortConfig, onSort, onCancel, filters }) {
  const headers = [
    { key: 'time', label: 'Time' },
    { key: 'client', label: 'Client' },
    { key: 'ticker', label: 'Ticker' },
    { key: 'side', label: 'Side' },
    { key: 'product', label: 'Product' },
    { key: 'qty', label: 'Qty (Executed/Total)' },
    { key: 'price', label: 'Price' },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border border-gray-100 border-collapse">
        <thead className="bg-gray-50">
          <tr>
            {headers.map(h => (
              <th
                key={h.key}
                className="px-3 py-2 cursor-pointer select-none"
                onClick={() => onSort(h.key)}
              >
                <div className="flex items-center">
                  {h.label}
                  {sortConfig.key === h.key
                    ? sortConfig.direction === 'asc'
                      ? <FiChevronUp className="ml-1" />
                      : <FiChevronDown className="ml-1" />
                    : <FiChevronUp className="ml-1 opacity-0" />}
                </div>
              </th>
            ))}
            <th className="px-3 py-2 border border-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border border-gray-100">
              <td className="px-3 py-2 border border-gray-100">{o.time}</td>
              <td className="px-3 py-2 border border-gray-100">{o.client}</td>

              <td className="px-3 py-2 border border-gray-100">
                <div className="flex items-center">
                  {o.ticker}
                  {filters?.ticker?.includes(o.ticker) && (
                    <RiRadioButtonLine className="text-blue-500 mr-1" />
                  )}
                </div>
              </td>

              <td className="px-3 py-2 border border-gray-100">{o.side}</td>
              <td className="px-3 py-2 border border-gray-100">{o.product}</td>
              <td className="px-3 py-2 border border-gray-100">
                {o.executed}/{o.total}
              </td>
              <td className="px-3 py-2 border border-gray-100">{o.price.toFixed(2)}</td>
              <td className="px-3 py-2 border border-gray-100">
                <button
                  onClick={() => onCancel(o.id)}
                  className="p-1 hover:bg-gray-50 rounded"
                >
                  <FiMoreVertical />
                </button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={8} className="p-4 text-center text-gray-300 border border-gray-100">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
