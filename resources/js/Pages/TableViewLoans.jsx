import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
// import { Button, Dropdown, Modal, Table, Tag, Tooltip } from "antd";
import IconButton from "@/Components/IconButton";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import Tag from "@/Components/Tag";
import TertiaryButton from "@/Components/TertiaryButton";
import Tooltip from "@/Components/Tooltip";
import { HistoryIcon, VisibilityIcon } from "@/Icons/GeneralIcons";
import { numberWithCommas, showToast, underscoreToTitleCase } from "@/utils/displayFunctions";
import { useEffect, useState } from "react";

export default function TableViewLoans() {
  const [loans, setLoans] = useState([]);
  const [users, setUsers] = useState([]);
  const [statusCount, setStatusCount] = useState({});
  const [statusUpdateCounter, setStatusUpdateCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isStatusHistoryModalOpen, setIsStatusHistoryModalOpen] = useState(false);
  const [isLoanFilesModalOpen, setIsLoanFilesModalOpen] = useState(false);
  const [disableChangeStatusBtn, setDisableChangeStatusBtn] = useState(false);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    loanStatus: "all_loan",
    paymentStatus: "all_payment",
    nextDueStatus: "all_next_due",
    finalDueStatus: "all_final_due",
  });

  useEffect(() => {
    setLoading(true);
    console.log("Starting fetch request to loans.index");

    fetch(`/api/employee/loans?${new URLSearchParams(filters)}`)
      .then((res) => {
        console.log("Received response:", {
          status: res.status,
          statusText: res.statusText,
          headers: Object.fromEntries(res.headers.entries()),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          throw new Error(`Expected JSON, but received ${contentType || "unknown content type"}`);
        }
      })
      .then((data) => {
        console.log("Successfully parsed JSON:", data);
        setLoans(data.loans);
        setStatusCount(data.statusCounts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", {
          name: err.name,
          message: err.message,
          stack: err.stack,
        });
        setLoading(false);
      });
  }, [filters, statusUpdateCounter]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log("Users:", data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    console.log("loans:", loans);
    console.log("statusCount:", statusCount);
    console.log("loanstatus pending count:", statusCount["loanStatus"]?.["pending"]);
  }, [loans, statusCount]);

  useEffect(() => {
    console.log("filters:", filters);
  }, [filters]);

  const columns = [
    {
      id: "loan_id",
      label: "Reference No.",
      sortable: true,
      type: "number",
      sortKey: "loan_id",
      minWidth: "120px",
      render: (loan) => (
        <span className="flex flex-grow">{`L-${String(loan.loan_id).padStart(7, "0")}`}</span>
      ),
    },
    {
      id: "borrower_name",
      label: "Borrower",
      sortable: true,
      minWidth: "120px",
    },
    {
      id: "loan_amount",
      label: "Loan Amount",
      sortable: true,
      type: "number",
      minWidth: "130px",
      render: (loan) => (
        <span className="is-aligned flex flex-grow justify-end">
          ₱{loan.loan_amount ? numberWithCommas(loan.loan_amount) : ""}
        </span>
      ),
    },
    {
      id: "payment_frequency",
      label: "Payment Frequency",
      sortable: true,
      minWidth: "120px",
      render: (loan) => (
        <span className="is-aligned flex flex-grow justify-center">
          {underscoreToTitleCase(loan.payment_frequency)}
        </span>
      ),
    },
    {
      id: "interest_rate",
      label: "Interest Rate",
      sortable: true,
      type: "number",
      minWidth: "80px",
      render: (loan) => (
        <span className="is-aligned flex flex-grow justify-end">{loan.interest_rate}%</span>
      ),
    },
    {
      id: "loan_term",
      label: "Loan Term",
      sortable: true,
      type: "period_unit",
      minWidth: "90px",
      getValue: (loan) => {
        const convertToDays = (period, unit) => {
          const value = parseFloat(period) || 0;
          switch (unit.toLowerCase()) {
            case "days":
              return value;
            case "weeks":
              return value * 7;
            case "months":
              return value * 30;
            case "years":
              return value * 365;
            default:
              return value;
          }
        };
        return convertToDays(loan.loan_term_period, loan.loan_term_unit);
      },
      render: (loan) => (
        <span className="is-aligned flex flex-grow justify-end">{`${loan.loan_term_period} ${loan.loan_term_unit}`}</span>
      ),
    },
    {
      id: "date_applied",
      label: "Date Applied",
      sortable: true,
      type: "date",
      minWidth: "120px",
      render: (loan) => (
        <span className="is-aligned flex flex-grow justify-center">
          {loan.date_applied ? new Date(loan.date_applied).toLocaleDateString() : "-"}
        </span>
      ),
    },
    {
      id: "date_status_changed",
      label: "Date Status Changed",
      sortable: true,
      type: "date",
      minWidth: "120px",
      render: (loan) => (
        <span className="is-aligned flex flex-grow justify-center">
          {loan.date_status_changed ? new Date(loan.date_status_changed).toLocaleDateString() : "-"}
        </span>
      ),
    },
    {
      id: "current_status",
      label: "Loan Status",
      isAction: true,
      sortable: true,
      minWidth: "100px",
      component: (loan) => (
        <div className="is-aligned has-tag flex items-center justify-center gap-1">
          <div className="is-aligned flex flex-grow items-center justify-center">
            <Tag
              color={getStatusColor(loan.current_status)?.color}
              bgColor={getStatusColor(loan.current_status)?.bgColor}
            >
              {underscoreToTitleCase(loan.current_status)}
            </Tag>
          </div>
          <Tooltip content="View Status History">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                showStatusHistory(loan);
              }}
            >
              <HistoryIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      id: "current_remarks",
      label: "Loan Status Remarks",
      sortable: true,
      minWidth: "150px",
    },
    {
      id: "status_action",
      label: "Change Loan Status",
      isAction: true,
      sortable: false,
      minWidth: "150px",
      component: (loan) => (
        <div className="flex justify-center">
          <select
            className="min-w-[140px] rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
            onChange={(e) => handleChangeStatus(loan, e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedLoan(loan);
            }}
            disabled={disableChangeStatusBtn}
            value={loan.current_status}
          >
            <option value="" disabled>
              Change Status
            </option>
            {loan.current_status === "pending" && (
              <option value="pending" disabled>
                Pending
              </option>
            )}
            {(loan.current_status === "pending" ||
              loan.current_status === "disapproved" ||
              loan.current_status === "approved") && (
              <option value="approved" disabled={loan.current_status === "approved"}>
                Approved
              </option>
            )}
            {(loan.current_status === "approved" || loan.current_status === "disbursed") && (
              <option value="disbursed" disabled={loan.current_status === "disbursed"}>
                Disbursed
              </option>
            )}
            {(loan.current_status === "disbursed" || loan.current_status === "completed") && (
              <option value="completed" disabled={loan.current_status === "completed"}>
                Completed
              </option>
            )}
            {(loan.current_status === "pending" ||
              loan.current_status === "approved" ||
              loan.current_status === "disapproved") && (
              <option value="disapproved" disabled={loan.current_status === "disapproved"}>
                Disapproved
              </option>
            )}
            {(loan.current_status === "approved" ||
              loan.current_status === "discontinued" ||
              loan.current_status === "disbursed") && (
              <option value="discontinued" disabled={loan.current_status === "discontinued"}>
                Discontinued
              </option>
            )}
            {(loan.current_status === "pending" || loan.current_status === "canceled") && (
              <option value="canceled" disabled={loan.current_status === "canceled"}>
                Canceled
              </option>
            )}
          </select>
        </div>
      ),
    },
    {
      id: "date_disbursed",
      label: "Date Disbursed",
      sortable: true,
      type: "date",
      minWidth: "120px",
      render: (loan) => (
        <span className="is-aligned flex flex-grow justify-center">
          {loan.date_disbursed ? new Date(loan.date_disbursed).toLocaleDateString() : "-"}
        </span>
      ),
    },
    {
      id: "outstanding_balance",
      label: "Outstanding Balance",
      sortable: true,
      type: "number",
      minWidth: "130px",
      render: (loan) => (
        <span className="flex flex-grow">
          ₱{loan.outstanding_balance ? numberWithCommas(loan.outstanding_balance) : ""}
        </span>
      ),
    },
    {
      id: "created_at",
      label: "Created At",
      sortable: true,
      type: "timestamp",
      minWidth: "130px",
      render: (user) =>
        new Date(user.created_at).toLocaleString("en-US", {
          dateStyle: "short",
          timeStyle: "short",
          hour12: true,
        }),
    },
    {
      id: "updated_at",
      label: "Updated At",
      sortable: true,
      type: "timestamp",
      minWidth: "120px",
      render: (user) =>
        new Date(user.updated_at).toLocaleString("en-US", {
          dateStyle: "short",
          timeStyle: "short",
          hour12: true,
        }),
    },
    {
      id: "loan_type_name",
      label: "Loan Type",
      sortable: true,
      minWidth: "120px",
    },
    {
      id: "is_amortized",
      label: "Amortized",
      sortable: true,
      minWidth: "90px",
      render: (loan) => (
        <span className="is-aligned flex flex-grow justify-center">
          {loan.is_amortized ? "Yes" : "No"}
        </span>
      ),
    },
    {
      id: "payment_status",
      label: "Payment Status",
      isAction: true,
      sortable: true,
      minWidth: "120px",
      component: (loan) => (
        <div className="is-aligned has-tag payment-status flex items-center justify-center">
          <Tag
            color={getStatusColor(loan.payment_status)?.color}
            bgColor={getStatusColor(loan.payment_status)?.bgColor}
          >
            {underscoreToTitleCase(loan.payment_status)}
          </Tag>
        </div>
      ),
    },
    {
      id: "approved_by",
      label: "Approved By",
      sortable: true,
      minWidth: "120px",
    },
    {
      id: "disbursed_by",
      label: "Disbursed By",
      sortable: true,
      minWidth: "120px",
    },
    {
      id: "loan_files",
      label: "Loan Files",
      isAction: true,
      sortable: false,
      minWidth: "80px",
      component: (loan) => (
        <div className="flex items-center justify-center gap-2">
          <Tooltip content="View Loan Files">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleViewFiles(loan);
              }}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      id: "next_due_date",
      label: "Next Due Date",
      sortable: true,
      type: "date",
      minWidth: "120px",
      render: (loan) => (
        <span className="is-aligned flex flex-grow justify-center">
          {loan.next_due_date ? new Date(loan.next_due_date).toLocaleDateString() : "-"}
        </span>
      ),
    },
    {
      id: "remaining_time_before_next_due",
      label: "Remaining Time Before Next Due",
      sortable: true,
      minWidth: "150px",
      render: (loan) => (
        <span className="is-aligned flex flex-grow justify-end">
          {loan.remaining_time_before_next_due || "-"}
        </span>
      ),
    },
    {
      id: "periodic_payment_amount",
      label: "Periodic Payment Amount",
      sortable: true,
      type: "number",
      minWidth: "160px",
      render: (loan) => (
        <span className="is-aligned flex flex-grow justify-end">
          {loan.periodic_payment_amount
            ? "₱" + numberWithCommas(loan.periodic_payment_amount)
            : "-"}
        </span>
      ),
    },
    {
      id: "final_due_date",
      label: "Final Due Date",
      sortable: true,
      type: "date",
      minWidth: "150px",
      render: (loan) => (
        <span className="is-aligned flex flex-grow justify-center">
          {loan.final_due_date ? new Date(loan.final_due_date).toLocaleDateString() : "-"}
        </span>
      ),
    },
    {
      id: "remaining_time_before_final_due",
      label: "Remaining Time Before Final Due",
      sortable: true,
      minWidth: "150px",
      render: (loan) => (
        <span className="is-aligned flex flex-grow justify-end">
          {loan.remaining_time_before_final_due || "-"}
        </span>
      ),
    },
  ];

  const statusGroups = {
    loan_status: {
      label: "Loan Status",
      defaultSelected: "all_loan",
      statuses: [
        {
          id: "all_loan",
          label: "All",
          column: "current_status",
          color: "black",
          bgColor: "#c4c4c4",
        },
        {
          id: "pending",
          label: "Pending",
          column: "current_status",
          comparison: "===",
          color: "black",
          bgColor: "#FFD563",
        },
        {
          id: "approved",
          label: "Approved",
          column: "current_status",
          comparison: "===",
          color: "black",
          bgColor: "#7FE5B0",
        },
        {
          id: "disbursed",
          label: "Disbursed",
          column: "current_status",
          comparison: "===",
          color: "white",
          bgColor: "#31896b",
        },
        {
          id: "completed",
          label: "Completed",
          column: "current_status",
          comparison: "===",
          color: "white",
          bgColor: "#043c3c",
        },
        {
          id: "disapproved",
          label: "Disapproved",
          column: "current_status",
          comparison: "===",
          color: "black",
          bgColor: "#FF7D7D",
        },
        {
          id: "discontinued",
          label: "Discontinued",
          column: "current_status",
          comparison: "===",
          color: "white",
          bgColor: "#e34e4e",
        },
        {
          id: "canceled",
          label: "Canceled",
          column: "current_status",
          comparison: "===",
          color: "white",
          bgColor: "#aa2c2c",
        },
      ],
    },
    payment_status: {
      label: "Payment Status",
      defaultSelected: "all_payment",
      statuses: [
        {
          id: "all_payment",
          label: "All",
          column: "payment_status",
          color: "black",
          bgColor: "#c4c4c4",
        },
        {
          id: "paid",
          label: "Paid",
          column: "payment_status",
          comparison: "===",
          color: "black",
          bgColor: "#7FE5B0",
        },
        {
          id: "unpaid",
          label: "Unpaid",
          column: "payment_status",
          comparison: "===",
          color: "black",
          bgColor: "#FF7D7D",
        },
        {
          id: "partially_paid",
          label: "Partially Paid",
          column: "payment_status",
          comparison: "===",
          color: "black",
          bgColor: "#FFD563",
        },
      ],
    },
    next_due_status: {
      label: "Next Due Status",
      defaultSelected: "all_next_due",
      statuses: [
        {
          id: "all_next_due",
          label: "All",
          column: "next_due_date",
          color: "black",
          bgColor: "#c4c4c4",
        },
        {
          id: "overdue",
          label: "Overdue",
          column: "next_due_date",
          color: "black",
          bgColor: "#FF7D7D",
        },
        {
          id: "due_today",
          label: "Due Today",
          column: "next_due_date",
          color: "black",
          bgColor: "#FFD563",
        },
        {
          id: "due_this_week",
          label: "Due This Week",
          column: "next_due_date",
          color: "black",
          bgColor: "#7FE5B0",
        },
      ],
    },
    final_due_status: {
      label: "Final Due Status",
      defaultSelected: "all_final_due",
      statuses: [
        {
          id: "all_final_due",
          label: "All",
          column: "final_due_date",
          color: "black",
          bgColor: "#c4c4c4",
        },
        {
          id: "overdue",
          label: "Overdue",
          column: "final_due_date",
          color: "black",
          bgColor: "#FF7D7D",
        },
        {
          id: "due_this_month",
          label: "Due This Month",
          column: "final_due_date",
          color: "black",
          bgColor: "#FFD563",
        },
        {
          id: "due_next_month",
          label: "Due Next Month",
          column: "final_due_date",
          color: "black",
          bgColor: "#7FE5B0",
        },
      ],
    },
  };

  const actions = [
    {
      id: "view_loan_files",
      label: "View Loan Files",
      render: (loan) => (
        <Tooltip content="View Loan Files">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleViewFiles(loan);
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: "view_status_history",
      label: "View Status History",
      render: (loan) => (
        <div className="flex items-center justify-center gap-2">
          <Tooltip content="View Status History">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                showStatusHistory(loan);
              }}
            >
              <HistoryIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      id: "status_action",
      label: "Change Loan Status",
      render: (loan) => (
        <Tooltip content="Change Loan Status">
          <div className="flex justify-center">
            <select
              className="min-w-[140px] rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              onChange={(e) => handleChangeStatus(loan, e.target.value)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLoan(loan);
              }}
              disabled={disableChangeStatusBtn}
              value={loan.current_status}
            >
              <option value="" disabled>
                Change Status
              </option>
              {loan.current_status === "pending" && (
                <option value="pending" disabled>
                  Pending
                </option>
              )}
              {(loan.current_status === "pending" ||
                loan.current_status === "disapproved" ||
                loan.current_status === "approved") && (
                <option value="approved" disabled={loan.current_status === "approved"}>
                  Approved
                </option>
              )}
              {(loan.current_status === "approved" || loan.current_status === "disbursed") && (
                <option value="disbursed" disabled={loan.current_status === "disbursed"}>
                  Disbursed
                </option>
              )}
              {(loan.current_status === "disbursed" || loan.current_status === "completed") && (
                <option value="completed" disabled={loan.current_status === "completed"}>
                  Completed
                </option>
              )}
              {(loan.current_status === "pending" ||
                loan.current_status === "approved" ||
                loan.current_status === "disapproved") && (
                <option value="disapproved" disabled={loan.current_status === "disapproved"}>
                  Disapproved
                </option>
              )}
              {(loan.current_status === "approved" ||
                loan.current_status === "discontinued" ||
                loan.current_status === "disbursed") && (
                <option value="discontinued" disabled={loan.current_status === "discontinued"}>
                  Discontinued
                </option>
              )}
              {(loan.current_status === "pending" || loan.current_status === "canceled") && (
                <option value="canceled" disabled={loan.current_status === "canceled"}>
                  Canceled
                </option>
              )}
            </select>
          </div>
        </Tooltip>
      ),
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      // Loan Status
      pending: { color: "black", bgColor: "#FFD563" },
      approved: { color: "black", bgColor: "#7FE5B0" },
      disbursed: { color: "white", bgColor: "#31896b" },
      completed: { color: "white", bgColor: "#043c3c" },
      disapproved: { color: "black", bgColor: "#FF7D7D" },
      discontinued: { color: "white", bgColor: "#e34e4e" },
      canceled: { color: "white", bgColor: "#aa2c2c" },
      // Payment Status
      paid: { color: "black", bgColor: "#7FE5B0" },
      unpaid: { color: "black", bgColor: "#FF7D7D" },
      partially_paid: { color: "black", bgColor: "#FFD563" },
      // Next Due Date Status
      next_not_yet_due: "#7FE5B0",
      next_past_due: { color: "black", bgColor: "#FF7D7D" },
      // Final Due Date Status
      final_not_yet_due: "#7FE5B0",
      final_past_due: { color: "black", bgColor: "#FF7D7D" },
    };
    return colors[status.toLowerCase()] || "#c4c4c4";
  };

  const showStatusHistory = (loan) => {
    setSelectedLoan(loan);
    setIsStatusHistoryModalOpen(true);
  };

  const handleChangeStatus = (loan, newStatus) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

    axios
      .put(
        `/api/employee/loans/${loan.loan_id}/status`,
        {
          status: newStatus,
          remarks: `Loan ${newStatus}`,
          ...(newStatus === "disbursed" && { date_disbursed: new Date().toISOString() }),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrfToken,
            "X-Requested-With": "XMLHttpRequest",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("Status updated successfully:", response.data);
        // Update the local loans state
        setLoans((prevLoans) =>
          prevLoans.map((l) =>
            l.loan_id === loan.loan_id
              ? {
                  ...l,
                  current_status: newStatus,
                  ...(newStatus === "disbursed" && { date_disbursed: new Date().toISOString() }),
                }
              : l
          )
        );
        // Update the selected row if it exists
        if (selectedLoan?.loan_id === loan.loan_id) {
          setSelectedLoan((prev) => ({
            ...prev,
            current_status: newStatus,
            ...(newStatus === "disbursed" && { date_disbursed: new Date().toISOString() }),
          }));
        }
        showToast("success", `Loan status changed to ${newStatus}`);
        setStatusUpdateCounter((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        showToast("error", error.response?.data?.error || "Failed to update loan status");
      });
  };

  const handleViewFiles = (loan) => {
    setSelectedLoan(loan);
    setIsLoanFilesModalOpen(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between gap-2 sm:flex-row">
          <h2>Loans Table</h2>
          <div className="flex gap-4">
            <Link href={route("loan-types.index")}>
              <TertiaryButton>View Loan Types Table</TertiaryButton>
            </Link>
            <Link href={route("view.payments-table")}>
              <TertiaryButton>View Payments Table</TertiaryButton>
            </Link>
          </div>
        </div>
      }
    >
      <Head content="Loans Table" />

      <div className="py-6">
        <div className="max-w-100 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 overflow-hidden sm:rounded-lg">
            <Table
              columns={columns}
              data={loans}
              loading={loading}
              showSearch={true}
              showStatusBar={true}
              itemsPerPage={10}
              defaultSort={{ column: "created_at", direction: "desc" }}
              statusGroups={statusGroups}
              actions={actions}
              selectedRow={selectedLoan}
              setSelectedRow={setSelectedLoan}
              idField="loan_id"
              is_database_filter={true}
              statusCount={statusCount}
              onFilterChange={handleFilterChange}
            />
            <LoanDetailsExpanded
              loan={selectedLoan}
              columns={columns}
              isDetailsExpanded={isDetailsExpanded}
              onExpand={() => setIsDetailsExpanded(true)}
              onCollapse={() => setIsDetailsExpanded(false)}
            />
          </div>
        </div>
      </div>
      <StatusHistoryModal
        isOpen={isStatusHistoryModalOpen}
        onClose={() => setIsStatusHistoryModalOpen(false)}
        loan={selectedLoan}
        users={users}
      />
      <LoanFilesModal
        isOpen={isLoanFilesModalOpen}
        onClose={() => setIsLoanFilesModalOpen(false)}
        loan={selectedLoan}
        users={users}
      />
    </AuthenticatedLayout>
  );
}

function StatusHistoryModal({ isOpen, onClose, loan, users }) {
  const getStatusColor = (status) => {
    const colors = {
      // Loan Status
      pending: { color: "black", bgColor: "#FFD563" },
      approved: { color: "black", bgColor: "#7FE5B0" },
      disbursed: { color: "white", bgColor: "#31896b" },
      completed: { color: "white", bgColor: "#043c3c" },
      disapproved: { color: "black", bgColor: "#FF7D7D" },
      discontinued: { color: "white", bgColor: "#e34e4e" },
      canceled: { color: "white", bgColor: "#aa2c2c" },
      // Payment Status
      paid: { color: "black", bgColor: "#7FE5B0" },
      unpaid: { color: "black", bgColor: "#FF7D7D" },
      partially_paid: { color: "black", bgColor: "#FFD563" },
      // Next Due Date Status
      next_not_yet_due: "#7FE5B0",
      next_past_due: { color: "black", bgColor: "#FF7D7D" },
      // Final Due Date Status
      final_not_yet_due: "#7FE5B0",
      final_past_due: { color: "black", bgColor: "#FF7D7D" },
    };
    return colors[status.toLowerCase()] || "#c4c4c4";
  };

  useEffect(() => {
    if (isOpen) {
      console.log("Status history modal opened");
      console.log("Selected loan:", loan);
    }
    return () => {
      console.log("Status history modal closed");
    };
  }, [isOpen]);

  return (
    <Modal show={isOpen} onClose={onClose} maxWidth="2xl" title="Status History">
      <div className="p-6">
        <div className="space-y-4">
          {loan?.status_history?.map((history, index) => (
            <div key={index} className="border-b pb-2">
              <div className="flex justify-between">
                <span
                  className="rounded-lg px-2 font-medium"
                  style={{
                    color: getStatusColor(history.status)?.color,
                    backgroundColor: getStatusColor(history.status)?.bgColor,
                  }}
                >
                  {underscoreToTitleCase(history.status)}
                </span>
                <span className="text-md text-black">
                  {new Date(history.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-1 flex items-center gap-2 text-sm">
                <span className="text-xs text-gray-500">Changed By:</span>
                <span>{users.find((user) => user.user_id === history.changed_by)?.full_name}</span>
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm">
                <span className="text-xs text-gray-500">Remarks:</span>
                <span className="">{history.remarks}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <PrimaryButton onClick={onClose}>Close</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}

function LoanFilesModal({ isOpen, onClose, loan, users }) {
  useEffect(() => {
    if (isOpen) {
      console.log("Loan files modal opened");
      console.log("Selected loan:", loan);
    }
    return () => {
      console.log("Loan files modal closed");
    };
  }, [isOpen]);

  return (
    <Modal show={isOpen} onClose={onClose} maxWidth="2xl" title="Loan Files">
      <div className="p-6">
        <div className="space-y-4">
          {loan?.loan_files?.map((file, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{file.file_type}</p>
                <p className="text-sm text-gray-500">
                  Uploaded: {new Date(file.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  By: {users.find((user) => user.user_id === file.uploaded_by)?.full_name}
                </p>
              </div>
              <a href={`/storage/${file.file_path}`} target="_blank" rel="noopener noreferrer">
                <PrimaryButton>Download</PrimaryButton>
              </a>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <PrimaryButton onClick={onClose}>Close</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}

const LoanDetailsExpanded = ({ loan, columns, isDetailsExpanded, onExpand, onCollapse }) => {
  if (!loan) return null;

  return (
    <div className="rounded-lg bg-white p-2">
      <div className="flex items-center justify-start gap-2">
        {isDetailsExpanded ? (
          <IconButton onClick={onCollapse} className="min-w-[32px]">
            <i className="fa-solid fa-chevron-down"></i>
          </IconButton>
        ) : (
          <IconButton onClick={onExpand} className="min-w-[32px]">
            <i className="fa-solid fa-chevron-right"></i>
          </IconButton>
        )}
        <h3 className="text-md font-semibold">
          {`Loan Details (L-${String(loan.loan_id).padStart(7, "0")})`}
        </h3>
      </div>
      {isDetailsExpanded && (
        <div className="view-loan-details grid grid-cols-1 gap-5 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {columns
            .filter((column) => column.id !== "status_action")
            .map((column) => (
              <div key={column.id}>
                <label className="block text-sm font-medium text-gray-700">{column.label}</label>
                <div>
                  {column.isAction ? (
                    typeof column.component === "function" ? (
                      // Wrap the component call to include row selection
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(loan);
                          column.component(loan);
                        }}
                      >
                        {column.component(loan)}
                      </div>
                    ) : (
                      <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                        {column.component}
                      </div>
                    )
                  ) : column.render ? (
                    <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                      {column.render(loan)}
                    </div>
                  ) : (
                    <div className="mt-1 !rounded-lg bg-gray-50 p-2 ring-1 ring-gray-300">
                      {loan[column.id] || column.defaultValue || "-"}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
