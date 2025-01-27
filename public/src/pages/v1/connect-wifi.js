import { useState } from "react";
import Header from "@/components/Header";
import GeneralUtils from "@/utils/GeneralUtils";

const ConnectWifi = () => {
  const { language, toggleLanguage } = GeneralUtils();

  const wifiDetails = {
    ssid: "DMI_Guest",
    password: "dmi12345",
  };

  return (
    <div className="bg-[#FFFAF4] h-screen">
      <Header language={language} onLanguageToggle={toggleLanguage} />
      <main className="px-8 md:px-24 p-6">
        <div
          className="flex items-center gap-2 mb-8"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <a href="/" className="text-dmiRed1 font-medium hover:underline">
            {language === "ar" ? "الرئيسية" : "Home"}
          </a>
          <span className="text-gray-500">{">"}</span>
          <span className="text-gray-500 font-medium">
            {language === "ar" ? "ربط واي فاي" : "Connect Wifi"}
          </span>
        </div>

        <section className="text-center">
          <h1 className="text-3xl font-bold text-neutral-700 mb-6">
            {language === "ar" ? "اتصل بشبكة الواي فاي" : "Connect to WiFi"}
          </h1>
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 border rounded-lg bg-white shadow-md">
              <img
                src="/images/sample-qrcode.png"
                alt={language === "ar" ? "رمز الاستجابة السريع" : "QR Code"}
                className="w-36 h-36"
              />
            </div>

            <div className="mt-4 text-center">
              <p className="text-lg font-medium">
                {language === "ar" ? "اسم الشبكة: " : "SSID: "}
                <span className="text-dmiRed1">{wifiDetails.ssid}</span>
              </p>
              <p className="text-lg font-medium">
                {language === "ar" ? "كلمة المرور: " : "Password: "}
                <span className="text-dmiRed1">{wifiDetails.password}</span>
              </p>
            </div>

            <p className="mt-6 text-gray-600">
              {language === "ar"
                ? "امسح رمز الاستجابة السريع للاتصال بشبكة الواي فاي أو أدخل التفاصيل يدويًا."
                : "Scan the QR code to connect to the WiFi, or enter the details manually."}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ConnectWifi;
