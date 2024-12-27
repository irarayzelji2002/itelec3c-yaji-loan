import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
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
            <h2 className="mb-2 text-2xl font-bold text-green-900">Loan Payment Received</h2>
            <p className="mb-6 text-center text-sm font-medium text-gray-700">
              This has been processed and your payment will be posted in real time.
            </p>
            <div className="w-full !rounded-lg border bg-gray-50 p-4">
              <h3 className="mb-4 text-lg font-semibold text-green-900">Transaction Receipt</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-800">Account Name</span>
                  <span className="text-sm text-gray-600">Harry Edward Styles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-800">Amount Paid</span>
                  <span className="text-sm text-gray-600">₱ 2,265.17</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-800">Outstanding Balance</span>
                  <span className="text-sm text-gray-600">₱ 9,265.17</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-800">Ref. No.</span>
                  <span className="text-sm text-green-600">12345678</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-800">Date</span>
                  <span className="text-sm text-gray-600">16 April 2024 12:49 PM</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex w-full space-x-4">
              <PrimaryButton
                className="w-full !rounded-lg bg-green-700 px-4 py-2 text-sm font-bold text-black hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500"
                type="button"
              >
                Download
              </PrimaryButton>

              <SecondaryButton
                className="text-black-700 w-full !rounded-lg border border-green-700 bg-white px-4 py-2 text-sm font-bold hover:bg-green-100 focus:outline-none focus:ring focus:ring-green-500"
                type="button"
              >
                Done
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
