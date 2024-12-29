import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
// import { Button, Dropdown, Modal, Table, Tag, Tooltip } from "antd";
import IconButton from "@/Components/IconButton";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import TertiaryButton from "@/Components/TertiaryButton";
import { HistoryIcon, VisibilityIcon } from "@/Icons/GeneralIcons";
import { capitalizeFirstLetter, numberWithCommas } from "@/utils/displayFunctions";
import { useEffect, useState } from "react";

export default function TableViewLoans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showStatusHistoryModal, setShowStatusHistoryModal] = useState(false);
  const [filters, setFilters] = useState({
    loanStatus: null,
    paymentStatus: null,
    nextDueStatus: null,
    finalDueStatus: null,
  });

  useEffect(() => {
    setLoading(true);
    fetch(route("loans.index"))
      .then((res) => res.json())
      .then((data) => {
        setLoans(data.loans);
        console.log("Loans:", data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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
        <span className="flex flex-grow">
          ₱{loan.loan_amount ? numberWithCommas(loan.loan_amount) : ""}
        </span>
      ),
    },
    {
      id: "interest_rate",
      label: "Interest Rate",
      sortable: true,
      minWidth: "100px",
      render: (loan) => <span className="flex flex-grow">{loan.interest_rate}%</span>,
    },
    {
      id: "loan_term",
      label: "Loan Term",
      sortable: true,
      minWidth: "150px",
      render: (loan) => (
        <span className="flex flex-grow">{`${loan.loan_term_period} ${loan.loan_term_unit}`}</span>
      ),
    },
    {
      id: "date_applied",
      label: "Date Applied",
      sortable: true,
      type: "date",
      minWidth: "120px",
      render: (loan) => new Date(loan.date_applied).toLocaleDateString(),
    },
    {
      id: "date_status_changed",
      label: "Date Status Changed",
      sortable: true,
      type: "date",
      minWidth: "120px",
      render: (loan) => new Date(loan.date_status_changed).toLocaleDateString(),
    },
    {
      id: "current_status",
      label: "Loan Status",
      sortable: true,
      minWidth: "100px",
      component: (loan) => (
        <div className="flex items-center">
          <Tag color={getStatusColor(loan.current_status)}>
            {capitalizeFirstLetter(loan.current_status)}
          </Tag>
          <Tooltip title="View Status History">
            <IconButton onClick={() => showStatusHistory(loan.getStatusHistory())}>
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
            disabled={disableRoleBtn}
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
      render: (loan) => new Date(loan.date_disbursed).toLocaleDateString(),
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
      minWidth: "120px",
      render: (loan) => <span className="flex flex-grow">{loan.is_amortized ? "Yes" : "No"}</span>,
    },
    {
      id: "payment_status",
      label: "Payment Status",
      sortable: true,
      minWidth: "120px",
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
        <Tooltip title="View Loan Files">
          <IconButton onClick={() => handleViewFiles(loan.getLoanFiles())}>
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
      render: (loan) => new Date(loan.next_due_date).toLocaleDateString(),
    },
    {
      id: "remaining_time_before_next_due",
      label: "Remaining Time Before Next Due",
      sortable: true,
      type: "date",
      minWidth: "120px",
      render: (loan) => new Date(loan.remaining_time_before_next_due).toLocaleDateString(),
    },
    {
      id: "periodic_payment_amount",
      label: "Periodic Payment Amount",
      sortable: true,
      minWidth: "130px",
      render: (loan) => (
        <span className="flex flex-grow">
          ₱{loan.periodic_payment_amount ? numberWithCommas(loan.periodic_payment_amount) : ""}
        </span>
      ),
    },
    {
      id: "final_due_date",
      label: "Final Due Date",
      sortable: true,
      type: "date",
      minWidth: "120px",
      render: (loan) => new Date(loan.final_due_date).toLocaleDateString(),
    },
    {
      id: "remaining_time_before_final_due",
      label: "Remaining Time Before Final Due",
      sortable: true,
      type: "date",
      minWidth: "120px",
      render: (loan) => new Date(loan.remaining_time_before_final_due).toLocaleDateString(),
    },
  ];

  const statuses = [
    // Payment_Status
    {
      id: "all",
      label: "All",
      column: "payment_status",
      comparison: "===", // includes paid, unpaid, partially_paid
      color: "black",
      bgColor: "gray",
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
      id: "next_not_yet_due",
      label: "Not Yet Due",
      column: "",
      comparison: "===",
      color: "black",
      bgColor: "#7FE5B0",
    },
    {
      id: "next_past_due",
      label: "Past Due",
      column: "",
      comparison: "===",
      color: "black",
      bgColor: "#FF7D7D",
    },
    // Final Due Date Status
    {
      id: "final_not_yet_due",
      label: "Not Yet Due",
      column: "",
      comparison: "===",
      color: "black",
      bgColor: "#7FE5B0",
    },
    {
      id: "final_past_due",
      label: "Past Due",
      column: "",
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
        <div className="flex items-center">
          <Tag color={getStatusColor(loan.current_status)}>
            {capitalizeFirstLetter(loan.current_status)}
          </Tag>
          <Tooltip title="View Status History">
            <IconButton onClick={() => showStatusHistory(loan.getStatusHistory())}>
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
        <div className="flex justify-center">
          <select
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
            onChange={(e) => handleChangeStatus(loan, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            disabled={disableRoleBtn}
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
      id: "view_loan_files",
      label: "View Loan Files",
      component: (loan) => (
        <Tooltip title="View Loan Files">
          <IconButton onClick={() => handleViewFiles(loan.getLoanFiles())}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  // Add all necessary handler functions and helper functions

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
      <Head title="Loans Table" />

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
        showModal={showStatusHistoryModal}
        onCancel={() => setShowStatusHistoryModal(false)}
        statusHistory={[]}
      />
    </AuthenticatedLayout>
  );
}

export function StatusHistoryModal({ showModal, closeModal, statusHistory }) {
  return (
    <Modal show={showModal} onClose={closeModal} maxWidth="2xl" title="Status History">
      {/* Status history content */}
      <div className="mt-6 flex justify-center">
        <PrimaryButton onClick={closeModal}>Close</PrimaryButton>
      </div>
    </Modal>
  );
}
