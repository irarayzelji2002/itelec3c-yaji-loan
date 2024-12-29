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
import { numberWithCommas, underscoreToTitleCase } from "@/utils/displayFunctions";
import { useEffect, useState } from "react";

export default function TableViewLoans() {
  const [loans, setLoans] = useState([]);
  const [statusCount, setStatusCount] = useState({});
  const [statusUpdateCounter, setStatusUpdateCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isStatusHistoryModalOpen, setIsStatusHistoryModalOpen] = useState(false);
  const [isLoanFilesModalOpen, setIsLoanFilesModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    loanStatus: null,
    paymentStatus: null,
    nextDueStatus: null,
    finalDueStatus: null,
  });
  const [disableChangeStatusBtn, setDisableChangeStatusBtn] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log("Starting fetch request to loans.index");

    fetch("/api/employee/loans")
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
        setStatusCount(data.statusCount);
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
  }, [statusUpdateCounter]);

  const columns = [
    {
      id: "loan_id",
      label: "Reference No.",
      sortable: true,
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
      minWidth: "130px",
      render: (loan) => (
        <span className="flex flex-grow justify-end">
          ₱{loan.loan_amount ? numberWithCommas(loan.loan_amount) : ""}
        </span>
      ),
    },
    {
      id: "interest_rate",
      label: "Interest Rate",
      sortable: true,
      minWidth: "80px",
      render: (loan) => <span className="flex flex-grow justify-end">{loan.interest_rate}%</span>,
    },
    {
      id: "loan_term",
      label: "Loan Term",
      sortable: true,
      minWidth: "90px",
      render: (loan) => (
        <span className="flex flex-grow justify-end">{`${loan.loan_term_period} ${loan.loan_term_unit}`}</span>
      ),
    },
    {
      id: "date_applied",
      label: "Date Applied",
      sortable: true,
      type: "date",
      minWidth: "120px",
      render: (loan) => (
        <span className="flex flex-grow justify-center">
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
        <span className="flex flex-grow justify-center">
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
        <div className="flex items-center justify-center gap-1">
          <Tag
            color={getStatusColor(loan.current_status)?.color}
            bgColor={getStatusColor(loan.current_status)?.bgColor}
          >
            {underscoreToTitleCase(loan.current_status)}
          </Tag>
          <Tooltip content="View Status History">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
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
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
            onChange={(e) => handleChangeStatus(loan, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            disabled={disableChangeStatusBtn}
            value={loan.current_status}
          >
            <option value="" disabled>
              Change Status
            </option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="disapproved">Disapproved</option>
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
        <span className="flex flex-grow justify-center">
          {loan.date_disbursed ? new Date(loan.date_disbursed).toLocaleDateString() : "-"}
        </span>
      ),
    },
    {
      id: "outstanding_balance",
      label: "Outstanding Balance",
      sortable: true,
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
        <span className="flex flex-grow justify-center">{loan.is_amortized ? "Yes" : "No"}</span>
      ),
    },
    {
      id: "payment_status",
      label: "Payment Status",
      sortable: true,
      minWidth: "120px",
      render: (loan) => (
        <div className="flex items-center justify-center">
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
        <Tooltip content="View Loan Files">
          <IconButton
            onClick={() => {
              e.stopPropagation();
              handleViewFiles(loan);
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      id: "next_due_date",
      label: "Next Due Date",
      sortable: true,
      type: "date",
      minWidth: "120px",
      render: (loan) => (
        <span className="flex flex-grow justify-center">
          {loan.next_due_date ? new Date(loan.next_due_date).toLocaleDateString() : "-"}
        </span>
      ),
    },
    {
      id: "remaining_time_before_next_due",
      label: "Remaining Time Before Next Due",
      sortable: true,
      type: "date",
      minWidth: "150px",
      render: (loan) => (
        <span className="flex flex-grow justify-end">
          {loan.remaining_time_before_next_due
            ? new Date(loan.remaining_time_before_next_due).toLocaleDateString()
            : "-"}
        </span>
      ),
    },
    {
      id: "periodic_payment_amount",
      label: "Periodic Payment Amount",
      sortable: true,
      minWidth: "160px",
      render: (loan) => (
        <span className="flex flex-grow justify-end">
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
        <span className="flex flex-grow justify-center">
          {loan.final_due_date ? new Date(loan.final_due_date).toLocaleDateString() : "-"}
        </span>
      ),
    },
    {
      id: "remaining_time_before_final_due",
      label: "Remaining Time Before Final Due",
      sortable: true,
      type: "date",
      minWidth: "150px",
      render: (loan) => (
        <span className="flex flex-grow justify-end">
          {loan.remaining_time_before_final_due
            ? new Date(loan.remaining_time_before_final_due).toLocaleDateString()
            : "-"}
        </span>
      ),
    },
  ];

  const statuses = [
    // Loan Status
    {
      id: "all_current_status",
      label: "All",
      column: "current_status",
      comparison: "===", // includes pending, approved, disapproved, discontinued, canceled
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
    // Payment Status
    {
      id: "all_payment_status",
      label: "All",
      column: "payment_status",
      comparison: "===", // includes paid, unpaid, partially_paid
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
    // Next Due Date Status
    {
      id: "all_next_due_date",
      label: "All",
      column: "next_due_date",
      comparison: "===", // includes next_not_yet_due, next_past_due
      color: "black",
      bgColor: "#c4c4c4",
    },
    {
      id: "next_not_yet_due",
      label: "Not Yet Due",
      column: "next_due_date",
      comparison: "===",
      color: "black",
      bgColor: "#7FE5B0",
    },
    {
      id: "next_past_due",
      label: "Past Due",
      column: "next_due_date",
      comparison: "===",
      color: "black",
      bgColor: "#FF7D7D",
    },
    // Final Due Date Status
    {
      id: "all_final_due_date",
      label: "All",
      column: "final_due_date",
      comparison: "===", // includes final_not_yet_due, final_past_due
      color: "black",
      bgColor: "#c4c4c4",
    },
    {
      id: "final_not_yet_due",
      label: "Not Yet Due",
      column: "final_due_date",
      comparison: "===",
      color: "black",
      bgColor: "#7FE5B0",
    },
    {
      id: "final_past_due",
      label: "Past Due",
      column: "final_due_date",
      comparison: "===",
      color: "black",
      bgColor: "#FF7D7D",
    },
  ];

  const actions = [
    {
      id: "view_status_history",
      label: "View Status History",
      render: (loan) => (
        <div className="flex items-center justify-center gap-2">
          <Tooltip content="View Status History">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
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
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              onChange={(e) => handleChangeStatus(loan, e.target.value)}
              onClick={(e) => e.stopPropagation()}
              disabled={disableChangeStatusBtn}
              value={loan.current_status}
            >
              <option value="" disabled>
                Change Status
              </option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="disapproved">Disapproved</option>
            </select>
          </div>
        </Tooltip>
      ),
    },
    {
      id: "view_loan_files",
      label: "View Loan Files",
      render: (loan) => (
        <Tooltip content="View Loan Files">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleViewFiles(loan);
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      // Loan Status
      pending: { color: "black", bgColor: "#FFD563" },
      approved: { color: "black", bgColor: "#7FE5B0" },
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
    setShowStatusHistoryModal(true);
  };

  const handleChangeStatus = (loan, newStatus) => {
    // Implement status change API call
    axios
      .post(route("loans.updateStatus"), {
        loan_id: loan.id,
        status: newStatus,
      })
      .then((response) => {
        setStatusUpdateCounter((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleViewFiles = (loan) => {
    setSelectedLoan(loan);
    setIsLoanFilesModalOpen(true);
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
            <Link href={route("payments.index")}>
              <TertiaryButton>View Payments Table</TertiaryButton>
            </Link>
          </div>
        </div>
      }
    >
      <Head content="Loans Table" />

      <div className="py-6">
        <div className="max-w-100 mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm sm:rounded-lg">
            <Table
              columns={columns}
              data={loans}
              loading={loading}
              showSearch={true}
              showStatusBar={true}
              itemsPerPage={10}
              defaultSort={{ column: "created_at", direction: "desc" }}
              statuses={statuses}
              actions={actions}
              selectedRow={selectedLoan}
              setSelectedRow={setSelectedLoan}
              idField="loan_id"
            />
          </div>
        </div>
      </div>
      <StatusHistoryModal
        isOpen={isStatusHistoryModalOpen}
        onClose={() => setIsStatusHistoryModalOpen(false)}
        loan={selectedLoan}
      />
      <LoanFilesModal
        isOpen={isLoanFilesModalOpen}
        onClose={() => setIsLoanFilesModalOpen(false)}
        loan={selectedLoan}
      />
    </AuthenticatedLayout>
  );
}

export function StatusHistoryModal({ showModal, closeModal, loan }) {
  return (
    <Modal show={showModal} onClose={closeModal} maxWidth="2xl">
      <div className="p-6">
        <h2 className="mb-4 text-lg font-medium">Status History</h2>
        <div className="space-y-4">
          {loan?.status_history?.map((history, index) => (
            <div key={index} className="border-b pb-2">
              <div className="flex justify-between">
                <span className="font-medium">{history.status}</span>
                <span className="text-gray-500">
                  {new Date(history.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600">{history.remarks}</p>
              <p className="text-sm text-gray-500">By: {history.changed_by_user?.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <PrimaryButton onClick={closeModal}>Close</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}

function LoanFilesModal({ isOpen, onClose, loan }) {
  return (
    <Modal show={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="p-6">
        <h2 className="mb-4 text-lg font-medium">Loan Files</h2>
        <div className="space-y-4">
          {loan?.loan_files?.map((file, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{file.file_type}</p>
                <p className="text-sm text-gray-500">
                  Uploaded: {new Date(file.created_at).toLocaleDateString()}
                </p>
              </div>
              <a
                href={file.file_path}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
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
