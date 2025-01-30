import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const generateMockOrders = () => {
      const mockOrders = [];
      const productNames = [
        { nameEn: "Latte", nameAr: "لاتيه", image: "/images/latte.png" },
        {
          nameEn: "Espresso",
          nameAr: "إسبريسو",
          image: "/images/espresso.png",
        },
        {
          nameEn: "Black Coffee",
          nameAr: "قهوة سوداء",
          image: "/images/black-coffee.png",
        },
        {
          nameEn: "Cappuccino",
          nameAr: "كابتشينو",
          image: "/images/cappuccino.png",
        },
      ];

      const milkOptions = [
        "Full Fat Milk",
        "Low Fat Milk",
        "Coconut Milk",
        "Almond Milk",
      ];
      const notes = [
        "Extra HotExtra HotExtra HotExtra HotExtra HotExtra HotExtra HotExtra HotExtra HotExtra HotExtra HotExtra HotExtra HotExtra HotExtra HotExtra HotExtra Hot",
        "No Sugar",
        "Less Milk",
        "Double Shot",
      ];

      for (let i = 1; i <= 100; i++) {
        const randomProduct =
          productNames[Math.floor(Math.random() * productNames.length)];
        const randomMilk =
          Math.random() > 0.5
            ? milkOptions[Math.floor(Math.random() * milkOptions.length)]
            : null;
        const randomNote =
          Math.random() > 0.5
            ? notes[Math.floor(Math.random() * notes.length)]
            : null;

        mockOrders.push({
          id: `ORD-${1000 + i}`,
          product: randomProduct,
          chairId:
            Math.random() > 0.5
              ? `CH-${Math.floor(Math.random() * 50) + 1}`
              : null,
          milkOption: randomMilk,
          note: randomNote,
          timestamp: new Date(
            new Date().setMinutes(new Date().getMinutes() - i * 5)
          ),
        });
      }
      return mockOrders.sort((a, b) => b.timestamp - a.timestamp);
    };

    setOrders(generateMockOrders());
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const currentOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const nextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  // Format Date & Time
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  };

  return (
    <>
      <Head>
        <title>VIP Admin - Orders</title>
      </Head>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar activePage="/admin/orders" />

        {/* Main Content */}
        <div className="flex-1 p-6 ml-64">
          <h1 className="text-2xl font-bold mb-4">Order Management</h1>

          {/* Orders Table */}
          <div className="bg-white p-6 shadow rounded">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Chair Number</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Milk Option</th>
                  <th className="p-3">Note</th>
                  <th className="p-3">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="text-xs p-3">{order.id}</td>
                    <td className="text-xs p-3">
                      {order.chairId ? order.chairId : "Null"}
                    </td>
                    <td className="text-xs p-3 flex items-center gap-3">
                      <img
                        src={order.product.image}
                        alt={order.product.nameEn}
                        className="w-12 h-12 rounded"
                      />
                      <div>
                        <p>
                          {order.product.nameEn} / {order.product.nameAr}
                        </p>
                      </div>
                    </td>
                    <td className="text-xs p-3">
                      {order.milkOption ? order.milkOption : "Null"}
                    </td>
                    <td className="text-xs p-3 max-w-60">
                      {order.note ? order.note : "Null"}
                    </td>
                    <td className="text-xs p-3">
                      {formatDate(order.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center items-center gap-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Prev
              </button>
              <span className="font-bold text-lg">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
