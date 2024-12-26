import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function LoanApplicationForm() {
  const [selectedLoanType, setSelectedLoanType] = useState(null);

  return (
    <AuthenticatedLayout>
      <Head title="Loan Application Form" />
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-white py-12">
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold text-green-900">
            Loan Application Form
          </h1>
          <form>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="amount">
                How much do you want to borrow? <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="amount"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter amount"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="purpose">
                Purpose of Loan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="purpose"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter purpose"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="term">
                Loan Term (Months/Years) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="term"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter term"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block font-bold text-green-900">
                Select a Loan Type <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { name: "Entry", range: "Php 5,000-20,000", rate: "3% monthly interest" },
                  { name: "Standard", range: "Php 20,001-150,000", rate: "3% monthly interest" },
                  { name: "Premium", range: "Php 150,001-1,500,000", rate: "3% monthly interest" },
                  {
                    name: "Enterprise",
                    range: "Php 1,500,000 - Above",
                    rate: "3% monthly interest",
                  },
                ].map((type, index) => (
                  <div
                    key={index}
                    className={`transform cursor-pointer rounded-lg border border-transparent bg-white p-4 transition-all hover:scale-105 hover:shadow-lg ${
                      selectedLoanType === type.name ? "scale-110 border-green-500 shadow-2xl" : ""
                    }`}
                    style={{
                      borderImage: "linear-gradient(to right, #22c55e, #16a34a) 1",
                      borderImageSlice: 1,
                      borderWidth: "2px",
                    }}
                    onClick={() => setSelectedLoanType(type.name)}
                  >
                    <h3 className="text-black-700 mb-2 text-lg font-bold">{type.name}</h3>
                    <p className="text-sm text-gray-600">{type.range}</p>
                    <p className="text-sm text-gray-600">{type.rate}</p>
                  </div>
                ))}
              </div>
            </div>

            {selectedLoanType && (
              <div className="mb-6">
                <h2 className="text-m text-center font-bold text-green-900">
                  Selected : <bold>{selectedLoanType}</bold>
                </h2>
              </div>
            )}

            <div className="mb-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox rounded text-green-700 focus:ring focus:ring-green-700"
                />
                <span className="text-black-700 ml-2 text-sm font-bold">
                  I understand and agree with
                  <a href="#" className="ml-1 text-green-700 underline hover:text-green-600">
                    Terms & Conditions
                  </a>
                  &nbsp;and
                  <a href="#" className="ml-1 text-green-700 underline hover:text-green-600">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
            </div>

            <div className="flex justify-center gap-4">
              <Link
                href="/success-loan"
                type="submit"
                className="!rounded-lg bg-green-700 px-6 py-2 font-bold text-black hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500"
              >
                <strong>Apply</strong>
              </Link>

              <button
                type="button"
                className="!rounded-lg border-2 border-green-700 bg-white px-6 py-2 font-bold text-black hover:bg-green-100 focus:outline-none focus:ring focus:ring-green-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
