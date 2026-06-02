import React, { useState, useRef, useEffect } from "react";
import {
  FiBell,
  FiSearch,
  FiUser,
  FiLogOut,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HeaderComponent = ({ onToggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("userInfo");

    if (user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userInfo");

    window.location.href = "/";
  };

  const handleSettings = () => {
    navigate("/admin/settings");
    setIsDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 md:left-64 h-16 bg-white shadow flex items-center justify-between px-6 gap-6 z-50">
      <button
        onClick={onToggleSidebar}
        className="md:hidden p-2 text-blue-600 hover:bg-gray-100 rounded-lg transition"
      >
        <FiMenu size={24} />
      </button>
      <div className="flex items-center gap-8 ml-auto">
        <button className="relative hover:text-blue-600 transition">
          <FiBell className="text-gray-600 text-lg" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition"
          >
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
              {userInfo?.username?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <span className="hidden md:block text-sm font-medium">
              {userInfo?.username}
            </span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-semibold text-gray-900">
                  {userInfo?.username}
                </p>

                <p className="text-xs text-gray-500">{userInfo?.phone}</p>
              </div>

              <button
                onClick={handleSettings}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 transition"
              >
                <FiSettings size={16} />
                Cài đặt
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 transition border-t border-gray-100 font-medium"
              >
                <FiLogOut size={16} />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
