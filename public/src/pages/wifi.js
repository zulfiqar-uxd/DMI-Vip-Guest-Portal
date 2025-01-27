import GeneralUtils from "@/utils/GeneralUtils";

const WifiPage = () => {
  const { language } = GeneralUtils();
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
            <span className="text-[#D5202F] font-medium">Wifi</span>
          </li>
        </ul>
      </nav>

      {/* QR Code and Details */}
      <div className="p-6 flex flex-col h-full justify-between items-center gap-16 z-10">
        <div className="bg-white p-6 flex flex-col items-center shadow-xl rounded-xl">
          <h1 className="text-3xl mb-4">Connect to WiFi</h1>
          <img src="/images/qrcode.png" alt="QR Code" className="w-[26vw]" />
        </div>
        <div className="flex flex-col items-center gap-4 space-y-2 text-2xl">
          <div className="flex items-center gap-6 space-x-2">
            <span className="font-normal">Username</span>
            <span className="bg-[#D5202F] w-[20vw] text-center text-white px-4 pt-3 p-1 rounded-full">
              DMI_Guest
            </span>
          </div>
          <div className="flex items-center gap-6 space-x-2">
            <span className="font-normal">Password</span>
            <span className="bg-[#D5202F] w-[20vw] text-center text-white px-4 pt-3 p-1 rounded-full">
              dmi12345
            </span>
          </div>
        </div>
        <p className="mt-6 text-gray-500 text-center">
          Scan the QR code to connect to the WiFi, or enter the details
          manually.
        </p>
      </div>
    </div>
  );
};

export default WifiPage;
