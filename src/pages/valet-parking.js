import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/router";

const ValetParking = () => {
  const [language, setLanguage] = useState("en");
  const [numberPlate, setNumberPlate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "ar" : "en"));
  };

  const handleRequestCar = () => {
    if (numberPlate.trim() === "") {
      alert(
        language === "ar"
          ? "يرجى إدخال رقم لوحة السيارة."
          : "Please enter your car number plate."
      );
      return;
    }

    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      router.push("/");
    }, 3000);
  };

  return (
    <div className="bg-[#FFFAF4] h-screen">
      <Header language={language} onLanguageToggle={toggleLanguage} />
      <main className="px-8 md:px-24 p-6">
        {/* Breadcrumbs */}
        <div
          className="flex items-center gap-2 mb-8"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <a href="/" className="text-dmiRed1 font-medium hover:underline">
            {language === "ar" ? "الرئيسية" : "Home"}
          </a>
          <span className="text-gray-500">{">"}</span>
          <span className="text-gray-500 font-medium">
            {language === "ar" ? "صف السيارات" : "Valet Parking"}
          </span>
        </div>

        <div className="text-center" dir={language === "ar" ? "rtl" : "ltr"}>
          <h1 className="text-3xl font-bold text-neutral-700 mb-6">
            {language === "ar" ? "خدمة صف السيارات" : "Valet Parking Service"}
          </h1>
          <p className="text-gray-600 mb-6">
            {language === "ar"
              ? "يرجى إدخال رقم لوحة السيارة لطلب السيارة."
              : "Please enter your car number plate to request your car."}
          </p>

          <div className="mb-6">
            <input
              type="text"
              value={numberPlate}
              onChange={(e) => setNumberPlate(e.target.value)}
              placeholder={
                language === "ar"
                  ? "أدخل رقم لوحة السيارة"
                  : "Enter car number plate"
              }
              className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg text-center"
            />
          </div>

          <button
            onClick={handleRequestCar}
            className="px-6 py-3 bg-dmiRed1 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
            {language === "ar" ? "طلب السيارة" : "Request Car"}
          </button>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-dmiRed1 mb-4">
              {language === "ar"
                ? "تم إرسال طلبك!"
                : "Your request has been sent!"}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === "ar"
                ? "سيتم إحضار سيارتك قريبًا."
                : "Your car will be brought to you shortly."}
            </p>
            <p className="text-sm text-gray-400">
              {language === "ar"
                ? "سيتم إعادتك إلى الصفحة الرئيسية قريبًا."
                : "You will be redirected to the homepage shortly."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValetParking;
