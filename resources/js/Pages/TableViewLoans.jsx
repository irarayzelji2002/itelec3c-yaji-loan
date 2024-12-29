import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FileOutlined, HistoryOutlined } from "@ant-design/icons";
import { Head, Link } from "@inertiajs/react";
import { Button, Dropdown, Modal, Table, Tag, Tooltip } from "antd";
import { useState } from "react";

export default function TableViewLoans({ auth, loans, statusCounts }) {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [statusHistoryVisible, setStatusHistoryVisible] = useState(false);
  const [statusHistory, setStatusHistory] = useState([]);
  const [filters, setFilters] = useState({
    loanStatus: null,
    paymentStatus: null,
    nextDueStatus: null,
    finalDueStatus: null,
  });

  const columns = [
    {
      title: "Loan ID",
      dataIndex: "loan_id",
      key: "loan_id",
    },
    {
      title: "Borrower",
      dataIndex: "borrower_name",
      key: "borrower_name",
    },
    // Add all other columns similarly
    {
      title: "Status",
      dataIndex: "current_status",
      key: "current_status",
      render: (status, record) => (
        <div className="flex items-center">
          <Tag color={getStatusColor(status)}>{status}</Tag>
          <Tooltip title="View Status History">
            <HistoryOutlined
              className="ml-2 cursor-pointer"
              onClick={() => showStatusHistory(record.loan_id)}
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: "Files",
      dataIndex: "loan_files",
      key: "loan_files",
      render: (files) => (
        <Tooltip title="View Files">
          <FileOutlined className="cursor-pointer" onClick={() => handleViewFiles(files)} />
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button onClick={() => handleView(record)}>View</Button>
          <Button onClick={() => handleViewPayments(record)}>View Payments</Button>
          <Dropdown
            menu={{
              items: getStatusActions(record),
              onClick: ({ key }) => handleStatusChange(record, key),
            }}
          >
            <Button>Change Status</Button>
          </Dropdown>
        </div>
      ),
    },
  ];

  // Add all necessary handler functions and helper functions

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Loans Table" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
            <div className="mb-4 flex justify-between">
              <h2 className="text-2xl font-semibold">Loans</h2>
              <div className="space-x-2">
                <Link href={route("loan-types.index")}>
                  <Button>View Loan Types</Button>
                </Link>
                <Link href={route("payments.index")}>
                  <Button>View Payments</Button>
                </Link>
              </div>
            </div>

            {/* Status filters */}
            <div className="mb-4">{/* Add filter components */}</div>

            <Table columns={columns} dataSource={loans} rowKey="loan_id" />

            {/* Add all necessary modals */}
            <Modal
              title="Status History"
              open={statusHistoryVisible}
              onCancel={() => setStatusHistoryVisible(false)}
              footer={null}
            >
              {/* Status history content */}
            </Modal>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
