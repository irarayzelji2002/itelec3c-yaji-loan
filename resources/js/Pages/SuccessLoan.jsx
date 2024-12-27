import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function LoanApplicationForm() {
  const [selectedLoanType, setSelectedLoanType] = useState(null);

  return (
    <AuthenticatedLayout>
      <Head title="Success Loan" />
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <div className="flex flex-col items-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-green-700">
              Congrats! <span className="font-bold text-green-900">You are eligible.</span>
            </h2>

            <p className="mb-6 text-sm text-gray-600 text-center">
              Kindly allow 3-4 hours for the loan to reflect in your bank account.
            </p>
            <div className="w-full !rounded-lg border bg-gray-50 p-4">
              <h3 className="mb-4 font-bold text-green-900">Transaction Summary</h3>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Account Name:</span>
                  <span className="text-gray-600">Harry Edward Styles</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Purpose of Loan:</span>
                  <span className="text-gray-600">University Tuition</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Next Repayment Date:</span>
                  <span className="text-gray-600">January 1, 2025</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Interest Rate:</span>
                  <span className="text-gray-600">3%</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Monthly Payment:</span>
                  <span className="text-gray-600">-</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">No. of Payments:</span>
                  <span className="text-gray-600">-</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Total Payback Amount:</span>
                  <span className="text-gray-600">-</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 flex w-full space-x-4">
              <button
                className="w-full !rounded-lg bg-green-700 px-4 py-2 font-bold text-black hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500"
                type="button"
              >
                Accept
              </button>

              <button
                className="w-full !rounded-lg border border-green-700 bg-white px-4 py-2 font-bold text-black hover:bg-green-100 focus:outline-none focus:ring focus:ring-green-500"
                type="button"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
