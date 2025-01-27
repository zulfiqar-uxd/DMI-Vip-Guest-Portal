import { useState, useEffect } from "react";
import Header from "@/components/Header";

const TrackOrder = () => {
  const [language, setLanguage] = useState("en");

  const sampleOrders = [
    {
      id: "ORD001",
      service: { en: "Food & Beverage", ar: "الأطعمة والمشروبات" },
      details: { en: "Coffee", ar: "قهوة" },
      status: { en: "In Progress", ar: "قيد التنفيذ" },
      time: { en: "Ordered at: 12:30 PM", ar: "تم الطلب في: 12:30 م" },
    },
    {
      id: "ORD002",
      service: { en: "Technical Support", ar: "الدعم الفني" },
      details: { en: "WiFi Connectivity Issue", ar: "مشكلة اتصال الواي فاي" },
      status: { en: "Resolved", ar: "تم الحل" },
      time: { en: "Resolved at: 2:15 PM", ar: "تم الحل في: 2:15 م" },
    },
    {
      id: "ORD003",
      service: { en: "Valet Parking", ar: "صف السيارات" },
      details: { en: "Car: CH123", ar: "سيارة: CH123" },
      status: { en: "Completed", ar: "مكتمل" },
      time: { en: "Completed at: 3:45 PM", ar: "تم الإكمال في: 3:45 م" },
    },
  ];

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
            {language === "ar" ? "تتبع الطلب" : "Track Order"}
          </span>
        </div>

        {/* Orders Table */}
        <h1 className="text-2xl font-bold text-neutral-700 mb-6 text-center">
          {language === "ar" ? "طلباتك" : "Your Orders"}
        </h1>
        <div className="grid grid-cols-2 gap-6">
          {sampleOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 border border-gray-300 rounded-lg bg-white shadow-md"
            >
              <div
                className="flex flex-col md:flex-row justify-between items-start md:items-center"
                dir={language === "ar" ? "rtl" : "ltr"}
              >
                <div>
                  <h2 className="text-lg font-semibold text-dmiRed1">
                    {order.service[language]}
                  </h2>
                  <p className="text-gray-500">
                    <strong>
                      {language === "ar" ? "تفاصيل:" : "Details:"}
                    </strong>{" "}
                    {order.details[language]}
                  </p>
                  <p className="text-gray-500">
                    <strong>
                      {language === "ar" ? "رقم الطلب:" : "Order ID:"}
                    </strong>{" "}
                    {order.id}
                  </p>
                  <p className="text-gray-500">
                    <strong>{language === "ar" ? "الوقت:" : "Time:"}</strong>{" "}
                    {order.time[language]}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span
                    className={`px-4 py-2 text-sm font-medium rounded-full ${
                      order.status[language] === "In Progress" ||
                      order.status[language] === "قيد التنفيذ"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status[language]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TrackOrder;
