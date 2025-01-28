import GeneralUtils from "@/utils/GeneralUtils";
import { useState } from "react";

const SupportPage = () => {
  const { language, toggleLanguage } = GeneralUtils();
  const [showPopup, setShowPopup] = useState(false);

  const texts = {
    en: {
      breadcrumb: ["Home", "Support"],
      button: "Ping for Support",
      hint: "Click here for support",
      popupTitle: "Support Request Sent!",
      popupMessage:
        "Your support request has been successfully sent. Our team will get back to you shortly.",
      close: "Close",
      toggle: "ع",
    },
    ar: {
      breadcrumb: ["الرئيسية", "الدعم"],
      button: "اضغط هنا للدعم",
      hint: "اضغط هنا للدعم",
      popupTitle: "تم إرسال طلب الدعم!",
      popupMessage: "تم إرسال طلب الدعم بنجاح. سيتواصل فريقنا معك قريباً.",
      close: "إغلاق",
      toggle: "E",
    },
  };

  if (!language) {
    return <div></div>;
  }

  return (
    <div
      className={`min-h-screen bg-white flex flex-col items-center py-10 relative ${
        language === "ar" ? "rtl" : "ltr"
      }`}
    >
      {/* Background Half Banner */}
      <img
        src="/images/bg-banner-half-top.png"
        className="absolute top-0 left-0 w-screen h-auto bg-center bg-cover -z-0"
      />

      {/* Language Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleLanguage();
        }}
        aria-label={
          language === "en" ? "Switch to Arabic" : "Switch to English"
        }
        className="absolute top-4 right-4 bg-[#D5202F] text-white py-2 px-4 rounded-full shadow-md hover:opacity-90 z-10"
      >
        {texts[language].toggle}
      </button>

      {/* Breadcrumb */}
      <nav className="text-sm mb-4 w-full px-16 z-10">
        <ul
          className={`flex items-center gap-2 ${
            language === "ar" ? "space-x-reverse" : "space-x-2"
          }`}
        >
          <li>
            <a href="/home" className="text-black hover:underline">
              {texts[language].breadcrumb[0]}
            </a>
          </li>
          <li className="text-black">{">"}</li>
          <li>
            <span className="text-[#D5202F] font-medium">
              {texts[language].breadcrumb[1]}
            </span>
          </li>
        </ul>
      </nav>

      {/* Support Button */}
      <div
        className="bg-[#D5202F] text-white pt-3 pb-1 px-24 text-2xl rounded-xl absolute top-[45%] cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        {texts[language].button}
      </div>
      <p className="mt-4 text-center text-black">{texts[language].hint}</p>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {texts[language].popupTitle}
            </h2>
            <p className="mb-4">{texts[language].popupMessage}</p>
            <button
              className="bg-[#D5202F] text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={() => setShowPopup(false)}
            >
              {texts[language].close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportPage;
