import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { CheckCircleGradientIcon } from "@/Icons/GeneralIcons";
import MemberLayout from "@/Layouts/MemberLayout";
import { numberWithCommas, showToast } from "@/utils/displayFunctions";
import { Head } from "@inertiajs/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [paymentData, setPaymentData] = useState({
    loanId: "-",
    paymentAmount: 0,
    paymentDate: "-",
    paymentMethod: "-",
    paymentReference: "-",
  });
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  useEffect(() => {
    // Retrieve payment data from localStorage
    const storageData = localStorage.getItem("paymentData");
    if (storageData) {
      const payment = JSON.parse(storageData);
      setPaymentData({
        loanId: payment.loan_id || "-",
        paymentAmount: payment.payment_amount || 0,
        paymentDate: payment.payment_date || "-",
        paymentMethod: payment.payment_method || "-",
        paymentReference: payment.payment_reference || "-",
      });
      localStorage.removeItem("paymentData");
    }
  }, []);

  const createFileName = (prefix, extension) => {
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
      .replace(/,/g, "")
      .replace(/\s+/g, "-")
      .replace(/:/g, "-")
      .replace(/-+/g, "-");

    const filename = `${prefix}-${formattedDateTime}.${extension}`;
    return filename;
  };

  const downloadAsPDF = async () => {
    try {
      const content = document.getElementById("app");

      if (!content) {
        console.error("Content element not found");
        showToast("error", "Failed to generate PDF");
        return;
      }

      const filename = createFileName("payment-summary", "pdf");

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
      const content = document.getElementById("app");

      if (!content) {
        console.error("Content element not found");
        showToast("error", "Failed to generate image");
        return;
      }

      const filename = createFileName("payment-summary", "png");

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDownloadOptions && !event.target.closest(".download-options")) {
        setShowDownloadOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDownloadOptions]);

  return (
    <MemberLayout>
      <Head title="Success Payment" />
      <div className="flex min-h-[100vh] items-center justify-center">
        <div className="m-10 w-full max-w-xl rounded-lg bg-white bg-opacity-60 p-6 shadow-lg">
          <div className="flex flex-col items-center">
            <div className="m-2">
              <CheckCircleGradientIcon size={70} />
            </div>
            <h2 className="mb-2 text-center font-bold text-green-800">
              <span className="text-3xl">Congrats!</span>
              <p className="text-xl font-bold text-green-900">Your payment was successful.</p>
            </h2>

            <p className="mx-5 mb-6 text-center text-sm text-gray-600 md:mx-10">
              Your payment has been recorded successfully. You can download the payment summary
              below.
            </p>
            <div className="w-full !rounded-lg border bg-gray-50 p-4">
              <h3 className="mb-4 text-lg font-bold text-green-900">Payment Summary</h3>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Loan ID</span>
                  <span className="text-gray-600">{paymentData.loanId}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Payment Amount</span>
                  <span className="text-gray-600">
                    ₱{numberWithCommas(paymentData.paymentAmount.toFixed(2))}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Payment Date</span>
                  <span className="text-gray-600">{paymentData.paymentDate}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Payment Method</span>
                  <span className="text-gray-600">{paymentData.paymentMethod}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-800">Payment Reference</span>
                  <span className="text-gray-600">{paymentData.paymentReference}</span>
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
