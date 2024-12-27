import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function LoanApplicationForm() {
  const [selectedLoanType, setSelectedLoanType] = useState(null);
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [term, setTerm] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});

  const handleApply = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!amount) validationErrors.amount = "Amount is required";
    if (!purpose) validationErrors.purpose = "Purpose is required";
    if (!term) validationErrors.term = "Term is required";
    if (!selectedLoanType) validationErrors.loanType = "Loan type is required";
    if (!agree) validationErrors.agree = "You must agree to the terms and conditions";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Proceed to apply
    window.location.href = "/success-loan";
  };

  return (
    <AuthenticatedLayout>
      <Head title="Loan Application Form" />
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-white py-12">
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold text-green-900">
            Loan Application Form
          </h1>
          <form onSubmit={handleApply}>
            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="amount">
                How much do you want to borrow? <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="amount"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setErrors((prev) => ({ ...prev, amount: "" }));
                }}
              />
              {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
            </div>

            <div className="mb-4">
              <label className="mb-2 block font-bold text-green-900" htmlFor="purpose">
                Purpose of Loan <span className="text-red-500">*</span>
              </label>
              <select
                id="purpose"
                className="w-full !rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
                value={purpose}
                onChange={(e) => {
                  setPurpose(e.target.value);
                  setErrors((prev) => ({ ...prev, purpose: "" }));
                }}
              >
                <option value="">Select purpose</option>
                <optgroup label="Personal">
                  <option value="Emergency expenses">Emergency expenses</option>
                  <option value="Education">Education</option>
                  <option value="Medical bills">Medical bills</option>
                  <option value="Travel">Travel</option>
                  <option value="Household improvements">Household improvements</option>
                </optgroup>
                <optgroup label="Business">
                  <option value="Startup capital">Startup capital</option>
                  <option value="Operational expenses">Operational expenses</option>
                  <option value="Equipment purchase">Equipment purchase</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Marketing and advertising">Marketing and advertising</option>
                </optgroup>
                <optgroup label="Debt Consolidation">
                  <option value="Vehicle Purchase">Vehicle Purchase</option>
                  <option value="Real Estate or Home Purchase">Real Estate or Home Purchase</option>
                </optgroup>
                <option value="Other">Other (Please Specify)</option>
              </select>
              {errors.purpose && <p className="text-sm text-red-500">{errors.purpose}</p>}
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
                value={term}
                onChange={(e) => {
                  setTerm(e.target.value);
                  setErrors((prev) => ({ ...prev, term: "" }));
                }}
              />
              {errors.term && <p className="text-sm text-red-500">{errors.term}</p>}
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
                    onClick={() => {
                      setSelectedLoanType(type.name);
                      setErrors((prev) => ({ ...prev, loanType: "" }));
                    }}
                  >
                    <h3 className="text-black-700 mb-2 text-lg font-bold">{type.name}</h3>
                    <p className="text-sm text-gray-600">{type.range}</p>
                    <p className="text-sm text-gray-600">{type.rate}</p>
                  </div>
                ))}
              </div>
              {errors.loanType && <p className="text-sm text-red-500">{errors.loanType}</p>}
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
                  checked={agree}
                  onChange={(e) => {
                    setAgree(e.target.checked);
                    setErrors((prev) => ({ ...prev, agree: "" }));
                  }}
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
              {errors.agree && <p className="text-sm text-red-500">{errors.agree}</p>}
            </div>

            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="!rounded-lg bg-green-700 px-6 py-2 font-bold text-black hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500"
              >
                <strong>Apply</strong>
              </button>

              <button
                type="button"
                className="!rounded-lg border-2 border-green-700 bg-white px-6 py-2 font-bold text-black hover:bg-green-100 focus:outline-none focus:ring focus:ring-green-700"
                onClick={() => (window.location.href = "/")}
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
