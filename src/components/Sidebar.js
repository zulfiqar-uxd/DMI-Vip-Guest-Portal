import Link from "next/link";

const Sidebar = ({ activePage }) => {
  const menuItems = [
    { name: "Inventory", path: "/admin/inventory" },
    { name: "Orders", path: "/admin/orders" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed">
      <nav className="p-5">
        <h2 className="text-center">VIP Guest Portal</h2>
        <h2 className="text-center text-xs text-[#999999]">- Admin Panel -</h2>
        <ul className="space-y-4 mt-12">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`block py-2 px-4 rounded ${
                  activePage === item.path
                    ? "bg-red-500 text-white font-bold"
                    : "hover:bg-gray-700"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
