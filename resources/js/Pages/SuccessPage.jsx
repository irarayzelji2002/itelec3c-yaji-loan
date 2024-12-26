import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function SuccessPage() {
  return (
    <AuthenticatedLayout>
      <Head title="Loan Payment Success" />
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
            <h2 className="mb-2 text-2xl font-semibold text-green-900">Loan Payment Received</h2>
            <p className="text-black-600 mb-6 text-center text-sm font-semibold">
              This has been processed and your payment will be posted in real time.
            </p>
            <div className="w-full !rounded-lg border bg-gray-50 p-4">
              <h3 className="mb-4 font-bold text-green-900">Transaction Receipt</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Name</span>
                  <span className="font-medium text-gray-800">Harry Edward Styles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid</span>
                  <span className="font-medium text-gray-800">₱ 2,265.17</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Outstanding Balance</span>
                  <span className="font-medium text-gray-800">₱ 9,265.17</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ref. No.</span>
                  <span className="font-medium text-green-600">12345678</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium text-gray-800">16 April 2024 12:49 PM</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex w-full space-x-4">
              <button
                className="w-full !rounded-lg bg-green-700 px-4 py-2 font-bold text-black hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500"
                type="button"
              >
                Download
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
