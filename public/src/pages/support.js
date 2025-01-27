import GeneralUtils from "@/utils/GeneralUtils";
import { useState } from "react";

const Support = () => {
  const { language } = GeneralUtils();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 relative">
      {/* Background Half Banner */}
      <img
        src="/images/bg-banner-half-top.png"
        className="absolute top-0 left-0 w-screen h-auto bg-center bg-cover -z-0"
      />

      {/* Breadcrumb */}
      <nav className="text-sm mb-4 w-full px-16 z-10">
        <ul className="flex items-center space-x-2">
          <li>
            <a href="/home" className="text-black hover:underline">
              Home
            </a>
          </li>
          <li className="text-black">{">"}</li>
          <li>
            <span className="text-[#D5202F] font-medium">Support</span>
          </li>
        </ul>
      </nav>

      {/* Support Button */}
      <div
        className="bg-[#D5202F] text-white pt-3 pb-1 px-24 text-2xl rounded-xl absolute top-[50%] cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        Ping for support
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Support Request Sent!</h2>
            <p className="mb-4">
              Your support request has been successfully sent. Our team will get
              back to you shortly.
            </p>
            <button
              className="bg-[#D5202F] text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
