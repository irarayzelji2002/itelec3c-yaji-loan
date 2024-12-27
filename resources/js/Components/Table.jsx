// resources/js/Components/Table.jsx
import TextInput from "@/Components/TextInput";
import { useEffect, useState } from "react";

const Table = ({
  columns,
  data: initialData,
  showSearch = true,
  showStatusBar = true,
  itemsPerPage = 10,
  loading: externalLoading = false,
  defaultSort = { column: "id", direction: "asc" },
  statuses = [], // Array of status objects { id, label, column, comparison }
  actions = [], // Array of action objects { id, label, render }
  selectedRow,
  setSelectedRow,
}) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [activeSort, setActiveSort] = useState(defaultSort);
  const [loading, setLoading] = useState(externalLoading);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState(() => {
    const sortState = columns.reduce((acc, col) => {
      if (col.sortable) {
        acc[col.id] = col.id === defaultSort.column ? defaultSort.direction : "asc";
      }
      return acc;
    }, {});
    return sortState;
  });

  // Apply default sort on initial data load
  useEffect(() => {
    if (initialData.length > 0) {
      const sorted = sortData(initialData, defaultSort.column, defaultSort.direction);
      setData(sorted);
      setFilteredData(sorted);
    }
  }, [initialData]);

  // Filtering data
  useEffect(() => {
    if (!data.length) return;

    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      let filtered = filterData(data, searchQuery);
      // Apply status filter if selected
      if (selectedStatus) {
        filtered = filtered.filter((item) => item[selectedStatus.column] === selectedStatus.id);
      }
      setFilteredData(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, data, selectedStatus]);

  const filterData = (data, query) => {
    if (!query) return data;

    return data.filter((item) => {
      const searchStr = columns
        .filter((col) => col.searchable !== false)
        .map((col) => {
          const value = col.getValue ? col.getValue(item) : item[col.id];
          return value?.toString() || "";
        })
        .join(" ")
        .toLowerCase();

      return searchStr.includes(query.toLowerCase());
    });
  };

  const handleStatusClick = (status) => {
    setSelectedStatus(selectedStatus?.id === status.id ? null : status);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSort = (columnId) => {
    const newDirection = sort[columnId] === "asc" ? "desc" : "asc";
    setSort({ ...sort, [columnId]: newDirection });
    setActiveSort({ column: columnId, direction: newDirection });
    const sorted = sortData(filteredData, columnId, newDirection);
    setFilteredData(sorted);
  };

  const sortData = (data, columnId, order) => {
    return [...data].sort((a, b) => {
      const column = columns.find((col) => col.id === columnId);
      let aValue = column?.getValue ? column.getValue(a) : a[columnId];
      let bValue = column?.getValue ? column.getValue(b) : b[columnId];

      // Handle null/undefined values
      aValue = aValue ?? "";
      bValue = bValue ?? "";

      // Handle different data types
      if (column?.type === "date") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
        return order === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (column?.type === "number") {
        aValue = Number(aValue);
        bValue = Number(bValue);
        return order === "asc" ? aValue - bValue : bValue - aValue;
      }

      return order === "asc"
        ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
    });
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Calculate status counts based on the comparison operator
  const statusCounts = statuses.reduce((acc, status) => {
    acc[status.id] = initialData.filter((item) => {
      if (status.comparison === "===") {
        return item[status.column] === status.id;
      }
      console.log(`item[status.column] ${item[status.column]}; status.id ${status.id}`);
      // Add other comparison operators if needed
      return false;
    }).length;

    return acc;
  }, {});

  // Handle row selection
  const handleRowClick = (row) => {
    setSelectedRow(selectedRow?.id === row.id ? null : row);
  };

  return (
    <div>
      {/* Search Bar */}
      {showSearch && (
        <div className="mx-4 mb-4 sm:mx-0">
          <div className="relative">
            <TextInput
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full"
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-800">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          {isSearching && <div className="mt-1 text-sm">Searching {searchQuery}...</div>}
        </div>
      )}

      {/* Status and Actions Bar */}
      <div
        className="flex min-h-[56px] items-center justify-between rounded-t-lg border-gray-300 bg-gray-50 px-4 py-2"
        style={{ borderWidth: "1px" }}
      >
        <div className="flex gap-1">
          {statuses.map((status) => (
            <div
              key={status.id}
              onClick={() => handleStatusClick(status)}
              className={`flex cursor-pointer items-center gap-2 px-2 pb-1 font-medium capitalize transition-all ${
                selectedStatus?.id === status.id
                  ? "border-b-2 border-green-800"
                  : "hover:border-b-2 hover:border-green-800/50"
              }`}
            >
              <span className="text-sm font-medium capitalize">{status.label}</span>

              <span
                className="rounded-full bg-gray-200 px-2 py-0.5 text-sm"
                style={{ color: status.color, backgroundColor: status.bgColor }}
              >
                {statusCounts[status.id]}
              </span>
            </div>
          ))}
        </div>

        {selectedRow && (
          <div className="flex gap-2">
            {actions.map((action) => (
              <div key={action.id}>{action.render(selectedRow)}</div>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-900 text-white">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={`px-2 py-1 text-center text-sm ${
                    activeSort.column === column.id ? "font-bold" : "font-medium"
                  }`}
                  style={{ minWidth: column.minWidth }}
                >
                  <div className="flex items-center justify-between">
                    <span className={`${column.sortable && "mr-2"} flex flex-grow justify-center`}>
                      {column.label}
                    </span>
                    {column.sortable && !column.isAction && (
                      <button
                        className={`text-gray-500 ${
                          activeSort.column === column.id ? "text-white" : ""
                        }`}
                        onClick={() => handleSort(column.id)}
                      >
                        {sort[column.id] === "asc" ? (
                          <i className="fa-solid fa-chevron-up" />
                        ) : (
                          <i className="fa-solid fa-chevron-down" />
                        )}
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-2 py-1 text-center">
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-2 py-1 text-center">
                  No results found
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  className={`cursor-pointer transition-colors ${
                    selectedRow?.id === item.id
                      ? "!border-b-2 !border-t-2 !border-green-500 bg-green-400"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {columns.map((column) => (
                    <td key={column.id} className="whitespace-nowrap px-2 py-1 text-sm">
                      {column.isAction ? (
                        typeof column.component === "function" ? (
                          // Wrap the component call to include row selection
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowSelection(item);
                              column.component(item);
                            }}
                          >
                            {column.component(item)}
                          </div>
                        ) : (
                          column.component
                        )
                      ) : column.render ? (
                        column.render(item)
                      ) : (
                        item[column.id] || column.defaultValue || "-"
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 ${currentPage === i + 1 ? "bg-gray-300" : "bg-white"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Table;