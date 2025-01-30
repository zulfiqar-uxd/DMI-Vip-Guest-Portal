import GeneralUtils from "@/utils/GeneralUtils";
import { useState, useEffect, useRef } from "react";

const CafeOrder = () => {
  const { language, toggleLanguage } = GeneralUtils();
  const [products, setProducts] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [selectedDrinkPosition, setSelectedDrinkPosition] = useState(null);
  const [selectedMilk, setSelectedMilk] = useState("");
  const [note, setNote] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const drinkRefs = useRef({});
  const customizerRef = useRef();

  const milkOptions = [
    "Full Fat Milk",
    "Low Fat Milk",
    "Coconut Milk",
    "Almond Milk",
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/fetch-products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        customizerRef.current &&
        !customizerRef.current.contains(event.target)
      ) {
        resetSelection();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedDrink && drinkRefs.current[selectedDrink.id]) {
      const drinkPosition =
        drinkRefs.current[selectedDrink.id].getBoundingClientRect();
      setSelectedDrinkPosition(drinkPosition);
    }
  }, [selectedDrink]);

  const resetSelection = () => {
    setSelectedDrink(null);
    setSelectedMilk("");
    setNote("");
  };

  const handleOrder = () => {
    if (selectedDrink.requires_customizer && !selectedMilk) {
      alert("Please select a milk option.");
      return;
    }
    setLastOrder({ drink: selectedDrink, milk: selectedMilk });
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      resetSelection();
    }, 2000);
  };

  const getCustomizerStyle = () => {
    if (!selectedDrinkPosition) return {};
    const { top, left, right, bottom } = selectedDrinkPosition;

    switch (selectedDrink.id % 4) {
      case 0:
        return { top: `100px`, left: `${right + 10}px` };
      case 1:
        return { top: `100px`, left: `${left - 300}px` };
      case 2:
        return {
          bottom: `100px`,
          left: `${right + 10}px`,
        };
      case 3:
        return {
          bottom: `100px`,
          left: `${left - 300}px`,
        };
      default:
        return {};
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 relative">
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
        {language === "en" ? "ع" : "E"}
      </button>

      <nav className="text-sm mb-4 w-full px-16">
        <ul className="flex items-center space-x-2">
          <li>
            <a href="/home" className="text-black hover:underline">
              {language === "en" ? "Home" : "الرئيسية"}
            </a>
          </li>
          <li className="text-black">{">"}</li>
          <li>
            <span className="text-[#D5202F] font-medium">
              {language === "en" ? "Cafe Order" : "الضيافة"}
            </span>
          </li>
        </ul>
      </nav>

      <h1 className="text-6xl mb-6">
        {language === "en" ? "Choose Your Drink" : "اختر مشروبك"}
        <span className="text-[#D5202F]">!</span>
      </h1>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-16 px-10">
        {products
          .filter((product) => !product.is_hidden) // Exclude hidden products
          .map((product) => (
            <div
              key={product.id}
              ref={(el) => (drinkRefs.current[product.id] = el)}
              className="flex flex-col items-center"
            >
              <div>
                <img
                  src={product.image_base64}
                  alt={product.name_en}
                  className="w-64"
                />
              </div>
              <div
                className="flex items-center justify-center gap-6 cursor-pointer"
                onClick={() => setSelectedDrink(product)}
              >
                <p className="mt-2 text-lg font-medium">
                  {language === "en" ? product.name_en : product.name_ar}
                </p>
              </div>
            </div>
          ))}
      </div>

      {selectedDrink && selectedDrinkPosition && (
        <div
          ref={customizerRef}
          className="absolute bg-white border rounded-lg shadow-lg p-4 z-10"
          style={getCustomizerStyle()}
        >
          {selectedDrink.requires_customizer ? (
            <>
              <div className="w-64">
                <div className="flex flex-col gap-2">
                  {milkOptions.map((milk) => (
                    <button
                      key={milk}
                      className={`w-full text-left py-2 px-4 border rounded ${
                        selectedMilk === milk
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 text-black hover:bg-red-100"
                      }`}
                      onClick={() => setSelectedMilk(milk)}
                    >
                      {milk}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="block font-medium mb-2">NOTE:</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full p-2 border rounded bg-gray-50"
                    rows="3"
                    placeholder="Add a note"
                  ></textarea>
                </div>
                <button
                  onClick={handleOrder}
                  className="w-full mt-4 pt-3 pb-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  ORDER
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="font-medium mb-4">
                {language === "en"
                  ? "This drink does not require customization."
                  : "هذا المشروب لا يتطلب تخصيصًا."}
              </p>
              <button
                onClick={handleOrder}
                className="w-full mt-4 pt-3 pb-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                {language === "en" ? "ORDER" : "اطلب"}
              </button>
            </div>
          )}
        </div>
      )}

      {orderPlaced && lastOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-4">Order Placed!</h2>
            <p className="mb-4">
              Your{" "}
              <strong>
                {language === "en"
                  ? lastOrder.drink.name_en
                  : lastOrder.drink.name_ar}
              </strong>{" "}
              {selectedDrink.requires_customizer && (
                <>
                  with <strong>{lastOrder.milk}</strong>
                </>
              )}{" "}
              is on its way.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CafeOrder;
