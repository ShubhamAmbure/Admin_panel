import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LogoutConfirmModal from "./LogoutConfirmModal";

const Header = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const [logoutOpen, setLogoutOpen] = useState(false);

  const getTitle = () => {
    if (location.pathname.includes("products")) return "Products";
    if (location.pathname.includes("categories")) return "Categories";
    if (location.pathname.includes("subcategories")) return "Subcategories";
    return "Dashboard";
  };

  const handleLogoutConfirm = () => {
    logout();
    setLogoutOpen(false);
  };

  return (
    <>
      <header className="h-14 bg-white border-b flex items-center justify-between px-6">
        {/* Page Title */}
        <h1 className="text-lg font-semibold text-gray-800">
          {getTitle()}
        </h1>

        {/* Profile Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center text-sm font-semibold">
              A
            </div>
            <span className="text-sm">Admin</span>
          </div>

          <button
            onClick={() => setLogoutOpen(true)}
            className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default Header;
