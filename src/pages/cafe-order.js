import GeneralUtils from "@/utils/GeneralUtils";
import { useState, useRef, useEffect } from "react";

const CafeOrder = () => {
  const { language } = GeneralUtils();

  const [selectedDrink, setSelectedDrink] = useState(null);
  const [selectedDrinkPosition, setSelectedDrinkPosition] = useState(null);
  const [selectedMilk, setSelectedMilk] = useState("");
  const [note, setNote] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [lastOrder, setLastOrder] = useState(null); // New state for last order
  const drinkRefs = useRef({});
  const customizerRef = useRef();

  const drinks = [
    { id: 1, name: "Latte", image: "/images/latte.png" },
    { id: 2, name: "Cortado", image: "/images/cortado.png" },
    { id: 3, name: "Black Coffee", image: "/images/black-coffee.png" },
    { id: 4, name: "Hot Chocolate", image: "/images/hot-chocolate.png" },
    { id: 5, name: "Cappuccino", image: "/images/cappuccino.png" },
    { id: 6, name: "Flat White", image: "/images/flat-white.png" },
    { id: 7, name: "Espresso", image: "/images/espresso.png" },
    { id: 8, name: "Arabic Coffee", image: "/images/arabic-coffee.png" },
  ];

  const milkOptions = [
    "Full Fat Milk",
    "Low Fat Milk",
    "Coconut Milk",
    "Almond Milk",
  ];

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
    if (!selectedMilk) {
      alert("Please select a milk option.");
      return;
    }
    setLastOrder({ drink: selectedDrink, milk: selectedMilk }); // Save the last order
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      resetSelection();
    }, 2000);
  };

  const getCustomizerStyle = () => {
    if (!selectedDrinkPosition) return {};
    const { top, left, right, bottom } = selectedDrinkPosition;

    switch (selectedDrink.id) {
      case 1:
      case 2:
        return { top: `100px`, left: `${right + 10}px` };
      case 3:
      case 4:
        return { top: `100px`, left: `${left - 300}px` };
      case 5:
      case 6:
        return {
          bottom: `100px`,
          left: `${right + 10}px`,
        };
      case 7:
      case 8:
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
      <nav className="text-sm mb-4 w-full px-16">
        <ul className="flex items-center space-x-2">
          <li>
            <a href="/home" className="text-black hover:underline">
              Home
            </a>
          </li>
          <li className="text-black">{">"}</li>
          <li>
            <span className="text-[#D5202F] font-medium">Cafe Order</span>
          </li>
        </ul>
      </nav>

      <h1 className="text-6xl mb-6">
        Choose Your Drink<span className="text-[#D5202F]">!</span>
      </h1>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-16 px-10">
        {drinks.map((drink) => (
          <div
            key={drink.id}
            ref={(el) => (drinkRefs.current[drink.id] = el)}
            className="flex flex-col items-center"
          >
            <div>
              <img src={drink.image} alt={drink.name} className="w-64" />
            </div>
            <div
              className="flex items-center justify-center gap-6 cursor-pointer"
              onClick={() => setSelectedDrink(drink)}
            >
              <p className="mt-2 text-lg font-medium">{drink.name}</p>
              <div
                className={`p-2 ease-in cursor-pointer bg-[#D5202F] text-white rounded-full transform transition-transform duration-300 ${
                  selectedDrink?.id === drink.id ? "rotate-180" : "rotate-0"
                }`}
              >
                <svg
                  width="250"
                  height="251"
                  viewBox="0 0 250 251"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <path
                    d="M0 125.25H250M125 0.25L125 250.25"
                    stroke="currentColor"
                    strokeWidth="20"
                  />
                </svg>
              </div>
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
        </div>
      )}

      {orderPlaced && lastOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-4">Order Placed!</h2>
            <p className="mb-4">
              Your <strong>{lastOrder.drink.name}</strong> with{" "}
              <strong>{lastOrder.milk}</strong> is on its way.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CafeOrder;
