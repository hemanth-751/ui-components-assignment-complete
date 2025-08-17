import React, { useMemo, useState } from "react";
import type { DataTableProps, Column } from "./DataTable.types";

type SortState<T> = { key: keyof T; direction: 'asc' | 'desc' } | null;

function sortData<T>(rows: T[], sort: SortState<T>): T[] {
  if (!sort) return rows;
  const { key, direction } = sort;
  return [...rows].sort((a: any, b: any) => {
    const va = a[key];
    const vb = b[key];
    if (va == null) return 1;
    if (vb == null) return -1;
    if (va === vb) return 0;
    const comp = va > vb ? 1 : -1;
    return direction === 'asc' ? comp : -comp;
  });
}

export function DataTable<T extends Record<string, any>>({ data, columns, loading, selectable, onRowSelect }: DataTableProps<T>) {
  const [selectedKeys, setSelectedKeys] = useState<Set<number>>(new Set());
  const [sort, setSort] = useState<SortState<T>>(null);

  const sorted = useMemo(() => sortData(data, sort), [data, sort]);

  function toggle(i: number) {
    if (!selectable) return;
    const next = new Set(selectedKeys);
    next.has(i) ? next.delete(i) : next.add(i);
    setSelectedKeys(next);
    onRowSelect?.(Array.from(next).map(idx => sorted[idx]));
  }

  function toggleAll() {
    if (!selectable) return;
    const all = sorted.map((_, i) => i);
    const next = selectedKeys.size === sorted.length ? new Set<number>() : new Set(all);
    setSelectedKeys(next);
    onRowSelect?.(Array.from(next).map(idx => sorted[idx]));
  }

  function onHeaderClick(col: Column<T>) {
    if (!col.sortable) return;
    setSort(prev => {
      if (!prev || prev.key !== col.dataIndex) return { key: col.dataIndex, direction: 'asc' };
      return { key: col.dataIndex, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
    });
  }

  return (
    <div className="relative overflow-x-auto rounded-xl border border-gray-200">
      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="animate-spin h-7 w-7 border-2 border-blue-600 border-t-transparent rounded-full" aria-label="Loading" />
        </div>
      )}

      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th className="px-4 py-3 text-left">
                <input aria-label="Select all" type="checkbox" checked={selectedKeys.size === sorted.length && sorted.length > 0}
                       onChange={toggleAll} />
              </th>
            )}
            {columns.map(col => (
              <th key={col.key}
                  className="px-4 py-3 text-left font-semibold text-gray-700 select-none cursor-pointer"
                  onClick={() => onHeaderClick(col)}
                  aria-sort={sort && sort.key === col.dataIndex ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}>
                <div className="inline-flex items-center gap-1">
                  {col.title}
                  {col.sortable && sort && sort.key === col.dataIndex && (
                    <span>{sort.direction === 'asc' ? '▲' : '▼'}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-gray-500" colSpan={columns.length + (selectable ? 1 : 0)}>
                No data available
              </td>
            </tr>
          ) : (
            sorted.map((row, i) => (
              <tr key={i} className="border-t last:border-b border-gray-100 hover:bg-gray-50/50">
                {selectable && (
                  <td className="px-4 py-3">
                    <input aria-label={`Select row ${i+1}`} type="checkbox" checked={selectedKeys.has(i)} onChange={() => toggle(i)} />
                  </td>
                )}
                {columns.map(col => (
                  <td key={String(col.key)} className="px-4 py-3">
                    {String(row[col.dataIndex] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
