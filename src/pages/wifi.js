import GeneralUtils from "@/utils/GeneralUtils";

const WifiPage = () => {
  const { language, toggleLanguage } = GeneralUtils();

  const texts = {
    en: {
      breadcrumb: ["Home", "Wifi"],
      title: "Connect to WiFi",
      username: "Username",
      password: "Password",
      qrHint:
        "Scan the QR code to connect to the WiFi, or enter the details manually.",
      usernameValue: "DMI_Guest",
      passwordValue: "dmi12345",
      toggle: "ع",
    },
    ar: {
      breadcrumb: ["الرئيسية", "الانترنت"],
      title: "امسح للاتصال بالشبكة",
      username: "اسم الشبكة",
      password: "كلمة السر",
      qrHint: ".قم بمسح الرمز للاتصال بشبكة الواي فاي، أو أدخل التفاصيل يدوياً",
      usernameValue: "DMI_Guest",
      passwordValue: "dmi12345",
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

      {/* QR Code and Details */}
      <div className="p-6 flex flex-col h-full justify-between items-center gap-16 z-10">
        <div className="bg-white p-6 flex flex-col items-center shadow-xl rounded-xl">
          <h1 className="text-2xl mb-4">{texts[language].title}</h1>
          <img src="/images/qrcode.png" alt="QR Code" className="w-[26vw]" />
        </div>
        <div className="flex flex-col items-center gap-4 space-y-2 text-2xl">
          <div className="flex items-center gap-6 space-x-2">
            <span className="font-normal">{texts[language].username}</span>
            <span className="bg-[#D5202F] w-[20vw] text-center text-white px-4 pt-3 p-1 rounded-full">
              {texts[language].usernameValue}
            </span>
          </div>
          <div className="flex items-center gap-6 space-x-2">
            <span className="font-normal">{texts[language].password}</span>
            <span className="bg-[#D5202F] w-[20vw] text-center text-white px-4 pt-3 p-1 rounded-full">
              {texts[language].passwordValue}
            </span>
          </div>
        </div>
        <p className="mt-6 text-gray-500 text-center">
          {texts[language].qrHint}
        </p>
      </div>
    </div>
  );
};

export default WifiPage;
