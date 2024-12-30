import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { CheckCircleGradientIcon } from "@/Icons/GeneralIcons";
import MemberLayout from "@/Layouts/MemberLayout";
import { capitalizeFirstLetter, numberWithCommas, showToast } from "@/utils/displayFunctions";
import { Head } from "@inertiajs/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";

export default function LoanApplicationForm() {
  const [summaryData, setSummaryData] = useState({
    accountName: "-",
    loanType: "-",
    purpose: "-",
    purposeDetails: "-",
    loanAmount: 0,
    interestRate: 0,
    loanTerm: "-",
    paymentFrequency: "-",
    periodicPayment: 0,
    numberOfPayments: 0,
    totalPayback: 0,
    estimatedApprovalDate: "-",
    estimatedDisbursementDate: "-",
    estimatedFirstPaymentDate: "-",
    estimatedFinalDueDate: "-",
    referenceNumber: "L-0000000",
    createdAt: "Dec 30 2024 8:00PM",
  });
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  useEffect(() => {
    console.log("Inside UseEffect");
    // Retrieve summary data from localStorage
    const storageData = localStorage.getItem("loanSummary");
    if (storageData) {
      const loanData = JSON.parse(storageData);
      const summaryData = {
        accountName: loanData?.accountName || "-",
        loanType: loanData?.loanType || "-",
        purpose: loanData?.purpose || "-",
        purposeDetails: loanData?.purposeDetails || "-",
        loanAmount: loanData?.loanAmount || 0,
        interestRate: loanData?.interestRate || 0,
        loanTerm: loanData?.loanTerm || "-",
        paymentFrequency: loanData?.paymentFrequency || "-",
        periodicPayment: loanData?.periodicPayment || 0,
        numberOfPayments: loanData?.numberOfPayments || 0,
        totalPayback: loanData?.totalPayback || 0,
        estimatedApprovalDate: loanData?.estimatedApprovalDate || "-",
        estimatedDisbursementDate: loanData?.estimatedDisbursementDate || "-",
        estimatedFirstPaymentDate: loanData?.estimatedFirstPaymentDate || "-",
        estimatedFinalDueDate: loanData?.estimatedFinalDueDate || "-",
        referenceNumber: loanData?.referenceNumber || "Not Available",
        createdAt: loanData?.createdAt || "",
      };
      setSummaryData(summaryData);
      localStorage.removeItem("loanSummary");
    }
  }, []);

  const createFileName = (prefix, extension) => {
    // Create formatted date-time string
    const now = new Date();
    const formattedDateTime = now
      .toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(/,/g, "") // Remove commas
      .replace(/\s+/g, "-") // Replace spaces with single dash
      .replace(/:/g, "-") // Replace colons with dash
      .replace(/-+/g, "-"); // Replace multiple consecutive dashes with single dash

    const filename = `${prefix}-${formattedDateTime}.${extension}`;
    return filename;
  };

  const downloadAsPDF = async () => {
    try {
      console.log("Download as PDF");
      const content = document.getElementById("app");
      console.log("content", content);

      if (!content) {
        console.error("Content element not found");
        showToast("error", "Failed to generate PDF");
        return;
      }

      const filename = createFileName("loan-summary", "pdf");

      const canvas = await html2canvas(content, {
        ignoreElements: (element) => {
          return element.hasAttribute("data-html2canvas-ignore");
        },
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(filename);
      showToast("success", "Downloaded as PDF");
      setShowDownloadOptions(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      showToast("error", "Failed to generate PDF");
    }
  };

  const downloadAsImage = async () => {
    try {
      console.log("Download as Image");
      const content = document.getElementById("app");
      console.log("content", content);

      if (!content) {
        console.error("Content element not found");
        showToast("error", "Failed to generate image");
        return;
      }

      const filename = createFileName("loan-summary", "png");

      const canvas = await html2canvas(content, {
        ignoreElements: (element) => {
          return element.hasAttribute("data-html2canvas-ignore");
        },
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = filename;
      link.href = canvas.toDataURL("image/png");
      link.click();
      showToast("success", "Downloaded as Image");
      setShowDownloadOptions(false);
    } catch (error) {
      console.error("Error generating image:", error);
      showToast("error", "Failed to generate image");
    }
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDownloadOptions && !event.target.closest(".download-options")) {
        setShowDownloadOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDownloadOptions]);

  //   if (!summaryData) {
  //     window.location.href = route("member.dashboard");
  //     return null;
  //   }

  return (
    <MemberLayout>
      <Head title="Success Loan" />
      <div className="flex min-h-[100vh] items-center justify-center">
        <div className="m-10 w-full max-w-xl rounded-lg bg-white bg-opacity-60 p-6 shadow-lg">
          <div className="flex flex-col items-center">
            <div className="m-2">
              <CheckCircleGradientIcon size={70} />
            </div>
            <h2 className="mb-2 text-center font-bold text-green-800">
              <span className="text-3xl">Congrats!</span>
              <p className="text-xl font-bold text-green-900">
                Your loan application is successful.
              </p>
            </h2>

            <p className="mx-5 mb-6 text-center text-sm text-gray-600 md:mx-10">
              Kindly allow 1-5 business days for the approval of your loan request. Your loan will
              be disbursed to your account 1-5 business days after its been approved.
            </p>
            <div className="w-full !rounded-lg border bg-gray-50 p-4">
              <h3 className="mb-4 text-lg font-bold text-green-900">Transaction Summary</h3>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Account Name</span>
                  <span className="text-gray-600">{summaryData?.accountName}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Loan Type</span>
                  <span className="text-gray-600">{summaryData?.loanType}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Purpose of Loan</span>
                  <span className="text-gray-600">
                    {summaryData?.purpose !== "Others"
                      ? summaryData?.purpose
                      : `${summaryData?.purposeDetails} (${summaryData?.purpose})`}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Loan Amount</span>
                  <span className="text-gray-600">
                    ₱{summaryData?.loanAmount ? numberWithCommas(summaryData?.loanAmount) : ""}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Payment Frequency</span>
                  <span className="text-gray-600">
                    {capitalizeFirstLetter(summaryData?.paymentFrequency)}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Loan Term</span>
                  <span className="text-gray-600">{summaryData?.loanTerm}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Interest Rate</span>
                  <span className="text-gray-600">{summaryData?.interestRate}%</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Periodic Payment</span>
                  <span className="text-gray-600">
                    ₱
                    {summaryData?.periodicPayment
                      ? numberWithCommas(summaryData?.periodicPayment.toFixed(2))
                      : ""}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Total Payback Amount</span>
                  <span className="text-gray-600">
                    ₱
                    {summaryData?.totalPayback
                      ? numberWithCommas(summaryData?.totalPayback.toFixed(2))
                      : ""}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Est. Approval Date</span>
                  <span className="text-gray-600">{summaryData?.estimatedApprovalDate}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Est. Disbursement Date</span>
                  <span className="text-gray-600">{summaryData?.estimatedDisbursementDate}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Est. First Payment Date</span>
                  <span className="text-gray-600">{summaryData?.estimatedFirstPaymentDate}</span>
                </li>
                <li className="mt-4 flex items-center justify-center gap-4">
                  <div>
                    <span className="text-lg font-bold text-gray-800">Ref. No. </span>
                    <span className="text-lg font-bold text-green-800">
                      {summaryData?.referenceNumber}
                    </span>
                  </div>
                  <span className="text-gray-600">{summaryData?.createdAt}</span>
                </li>
              </ul>
            </div>
            <div
              className="mt-6 flex w-full flex-wrap justify-center gap-4"
              data-html2canvas-ignore="true"
            >
              <div className="relative">
                <PrimaryButton
                  onClick={() => setShowDownloadOptions(!showDownloadOptions)}
                  className="min-w-[150px] !rounded-lg bg-green-700 px-4 py-2 text-center font-bold text-black hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500"
                >
                  Download
                </PrimaryButton>
                {showDownloadOptions && (
                  <div className="download-options absolute right-0 mt-0 w-48 rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadAsPDF();
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:rounded-t-lg hover:bg-gray-100"
                    >
                      Download as PDF
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadAsImage();
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:rounded-b-lg hover:bg-gray-100"
                    >
                      Download as Image
                    </button>
                  </div>
                )}
              </div>
              <SecondaryButton
                onClick={() => (window.location.href = route("member.dashboard"))}
                className="min-w-[150px] !rounded-lg border border-green-700 bg-white px-4 py-2 font-bold text-black hover:bg-green-100 focus:outline-none focus:ring focus:ring-green-500"
                type="button"
              >
                Done
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
}
