import IconButton from "@/Components/IconButton";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import Tag from "@/Components/Tag";
import TertiaryButton from "@/Components/TertiaryButton";
import Tooltip from "@/Components/Tooltip";
import { VisibilityIcon } from "@/Icons/GeneralIcons";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { numberWithCommas, underscoreToTitleCase } from "@/utils/displayFunctions";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

const TableViewPayments = ({ auth }) => {
  // States
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [statusUpdateCounter, setStatusUpdateCounter] = useState(0);
  const [filters, setFilters] = useState({
    confirmation_status: "all_confirmed",
  });

  // Fetch payments data
  useEffect(() => {
    setLoading(true);
    console.log("Starting fetch request to loans.index");

    fetch(`/api/employee/payments`)
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
        setPayments(data.payments);
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
    console.log("loading", loading);
  }, [loading]);

  useEffect(() => {
    console.log("payments:", payments);
    // console.log("loanstatus pending count:", statusCount["loanStatus"]?.["pending"]);
  }, [payments]);

  useEffect(() => {
    console.log("filters:", filters);
  }, [filters]);

  // Column definitions
  const columns = [
    {
      id: "payment_id",
      label: "Reference No.",
      sortable: true,
      type: "number",
      sortKey: "payment_id",
      minWidth: "120px",
      render: (payment) => (
        <span className="flex flex-grow">{`P-${String(payment.payment_id).padStart(7, "0")}`}</span>
      ),
    },
    {
      id: "loan_id",
      label: "Loan Reference No.",
      sortable: true,
      type: "number",
      sortKey: "loan_id",
      minWidth: "130px",
      render: (payment) => (
        <span className="flex flex-grow">{`L-${String(payment.loan_id).padStart(7, "0")}`}</span>
      ),
    },
    {
      id: "payment_amount",
      label: "Amount",
      sortable: true,
      type: "number",
      minWidth: "130px",
      render: (payment) => (
        <span className="is-aligned flex flex-grow justify-end">
          ₱{payment.payment_amount ? numberWithCommas(payment.payment_amount) : ""}
        </span>
      ),
    },
    {
      id: "payment_date",
      label: "Payment Date",
      sortable: true,
      type: "date",
      minWidth: "120px",
      render: (payment) => (
        <span className="is-aligned flex flex-grow justify-center">
          {payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : "-"}
        </span>
      ),
    },
    {
      id: "payment_method",
      label: "Payment Method",
      sortable: false,
      searchable: false,
      minWidth: "60px",
      render: (payment) => (
        <div className="flex justify-center">
          {payment.payment_method ? (
            <div className="relative h-10 w-10">
              <img
                src={
                  payment.payment_method
                    ? `/storage/${payment.payment_method}`
                    : "/img/transparent-image.png"
                }
                alt=""
                className="h-full w-full rounded-md bg-gray-300 object-cover"
              />
            </div>
          ) : (
            <span>-</span>
          )}
        </div>
      ),
    },
    {
      id: "is_confirmed",
      label: "Confirmed",
      component: (payment) => (
        <div className="is-aligned has-tag payment-status flex items-center justify-center">
          <Tag
            color={getStatusColor(payment.is_confirmed ? "yes" : "pending")?.color}
            bgColor={getStatusColor(payment.is_confirmed ? "yes" : "pending")?.bgColor}
          >
            {underscoreToTitleCase(payment.is_confirmed ? "Yes" : "Pending")}
          </Tag>
        </div>
      ),
    },
    {
      id: "confirmed_by",
      label: "Confirmed By",
      sortable: true,
      minWidth: "130px",
      render: (payment) => payment.confirmedBy?.full_name || "-",
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
      id: "view_payment",
      label: "View Payment",
      isAction: true,
      sortable: false,
      minWidth: "80px",
      component: (payment) => (
        <div className="flex items-center justify-center gap-2">
          <Tooltip content="View Payment">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleViewPayment(payment);
              }}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      id: "view_loan",
      label: "View Loan",
      isAction: true,
      sortable: false,
      minWidth: "80px",
      component: (payment) => (
        <div className="flex items-center justify-center gap-2">
          <Tooltip content="View Loan">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleViewLoan(payment);
              }}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      id: "confirm_payment",
      label: "Confirm Payment",
      isAction: true,
      sortable: false,
      minWidth: "80px",
      component: (user) => (
        <div className="flex justify-center">
          <PrimaryButton onClick={() => handleViewDetails(user)}>Confirm</PrimaryButton>
        </div>
      ),
    },
  ];

  const statusGroups = {
    confirmation_status: {
      label: "Confirmation Status",
      defaultSelected: "all_confirmed",
      statuses: [
        {
          id: "all_confirmed",
          label: "All",
          column: "is_confirmed",
          color: "black",
          bgColor: "#c4c4c4",
        },
        {
          id: "pending",
          label: "Pending",
          column: "is_confirmed",
          comparison: "===",
          color: "black",
          bgColor: "#FFD563",
        },
        {
          id: "yes",
          label: "Yes",
          column: "is_confirmed",
          comparison: "===",
          color: "black",
          bgColor: "#7FE5B0",
        },
      ],
    },
  };

  const actions = [
    {
      id: "view_payment",
      label: "View Payment",
      render: (payment) => (
        <TertiaryButton
          onClick={(e) => {
            e.stopPropagation();
            handleViewPayment(payment);
          }}
        >
          View Payment
        </TertiaryButton>
      ),
    },
    {
      id: "view_loan",
      label: "View Loan",
      render: (payment) => (
        <TertiaryButton
          onClick={(e) => {
            e.stopPropagation();
            handleViewLoan(payment);
          }}
        >
          View Loan
        </TertiaryButton>
      ),
    },
    {
      id: "confirm_payment",
      label: "Confirm Payment",
      render: (user) => (
        <div className="flex justify-center">
          <PrimaryButton onClick={() => handleViewDetails(user)}>Confirm</PrimaryButton>
        </div>
      ),
    },
  ];

  // Action handlers
  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const handleViewLoan = async (payment) => {
    try {
      setSelectedPayment(payment);
      const response = await axios.get(`/api/loans/${payment.loan_id}`);
      setSelectedLoan(response.data);
      setShowLoanModal(true);
    } catch (error) {
      console.error("Error fetching loan details:", error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      // Is Comnfirmed Status
      pending: { color: "black", bgColor: "#FFD563" },
      yes: { color: "black", bgColor: "#7FE5B0" },
      no: { color: "black", bgColor: "#FF7D7D" },
    };
    return colors[status.toLowerCase()] || "#c4c4c4";
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">Payment Table</h2>
          <Link href={route("view.loans-table")}>
            <TertiaryButton>View Loans Table</TertiaryButton>
          </Link>
        </div>
      }
    >
      <Head title="Payments Table" />

      <div className="py-6">
        <div className="max-w-100 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 overflow-hidden sm:rounded-lg">
            <Table
              columns={columns}
              data={payments}
              loading={false}
              showSearch={true}
              showStatusBar={true}
              itemsPerPage={10}
              defaultSort={{ column: "created_at", direction: "desc" }}
              statusGroups={statusGroups}
              actions={actions}
              selectedRow={selectedPayment}
              setSelectedRow={setSelectedPayment}
              idField="payment_id"
              is_database_filter={false}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      {/* Payment Details Modal */}
      <PaymentDetailsModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        payment={selectedPayment}
      />

      {/* Loan Details Modal */}
      <LoanDetailsModal
        isOpen={showLoanModal}
        onClose={() => setShowLoanModal(false)}
        loan={selectedLoan}
      />
    </AuthenticatedLayout>
  );
};

export default TableViewPayments;

const PaymentDetailsModal = ({ isOpen, onClose, payment }) => {
  if (!payment) return null;

  return (
    <Modal show={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Payment Details - P-{String(payment.payment_id).padStart(7, "0")}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Amount</label>
              <div>₱{numberWithCommas(payment.payment_amount)}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Payment Date</label>
              <div>{new Date(payment.payment_date).toLocaleDateString()}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Payment Method</label>
              <div>{payment.payment_method}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Reference</label>
              <div>{payment.payment_reference || "-"}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <div>
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                    payment.is_confirmed
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {payment.is_confirmed ? "Confirmed" : "Pending"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {payment.proof_of_payment && (
              <div>
                <label className="text-sm font-medium text-gray-500">Proof of Payment</label>
                <div className="mt-2">
                  {payment.proof_of_payment.endsWith(".pdf") ? (
                    <embed
                      src={payment.proof_of_payment}
                      type="application/pdf"
                      width="100%"
                      height="400px"
                    />
                  ) : (
                    <img
                      src={payment.proof_of_payment}
                      alt="Proof of Payment"
                      className="max-h-96 w-full rounded-lg object-contain"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

const LoanDetailsModal = ({ isOpen, onClose, loan }) => {
  if (!loan) return null;

  return (
    <Modal show={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Loan Details - L-{String(loan.loan_id).padStart(7, "0")}
          </h2>
          <div className="space-x-2">
            <Link
              href={route("view.payments-table", { highlight: loan.loan_id })}
              className="rounded-md bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700"
            >
              Show in Loans Table
            </Link>
            <button
              onClick={onClose}
              className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>

        {/* Add loan details display here */}
        <div className="grid grid-cols-2 gap-4">{/* Add relevant loan information */}</div>
      </div>
    </Modal>
  );
};
