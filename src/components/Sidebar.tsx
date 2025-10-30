import { Link, useLocation } from "react-router-dom";
import { ExclamationTriangleIcon, HomeIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
    { label: "Dashboard", icon: HomeIcon, path: "/" },
    { label: "Critical Incidents", icon: ExclamationTriangleIcon, path: "/incidents/critical" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-full">
      <div className="p-4 text-xl font-bold border-b">C&C IT</div>
      <nav className="mt-4">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ${
              pathname === item.path ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            <item.icon className="w-5 h-5 text-gray-600" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
