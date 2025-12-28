import { NavLink } from "react-router-dom";
import {
  Home,
  LayoutGrid,
  List,
  Package,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const menu = [
    // {
    //   label: "Home",
    //   path: "/dashboard",
    //   icon: Home,
    // },
    {
      label: "Category",
      path: "/dashboard/categories",
      icon: LayoutGrid,
    },
    {
      label: "Subcategory",
      path: "/dashboard/subcategories",
      icon: List,
    },
    {
      label: "Products",
      path: "/dashboard/products",
      icon: Package,
    },
  ];

  return (
    <aside className="w-64 h-full bg-[#FFFDF5] border-r">
      {/* Logo / Title */}
      <div className="h-14 flex items-center px-6 border-b">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
      </div>

      {/* Menu */}
      <nav className="mt-4">
        <ul className="space-y-1">
          {menu.map(({ label, path, icon: Icon }) => (
            <li key={label}>
              <NavLink
                to={path}
                end={label === "Home"}
                className={({ isActive }) =>
                  `flex items-center justify-between px-6 py-3 text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-yellow-100 text-black"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{label}</span>
                </div>

                <ChevronRight
                  size={16}
                  className="text-gray-400"
                />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
