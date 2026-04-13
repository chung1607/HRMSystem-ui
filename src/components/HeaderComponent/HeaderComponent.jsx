import React from "react";
import { Link } from "react-router-dom";
import { FiBell, FiSearch, FiUser } from "react-icons/fi";
const HeaderComponent = () => {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          HRM System
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-4 text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">
            Dashboard
          </Link>
          <Link to="/employees" className="hover:text-blue-600 transition">
            Employees
          </Link>
          <Link to="/teams" className="hover:text-blue-600 transition">
            Teams
          </Link>
        </nav>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-lg">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-sm"
          />
        </div>

        {/* Notification */}
        <button className="relative">
          <FiBell className="text-gray-600 text-lg" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <FiUser />
          </div>
          <span className="hidden md:block text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
