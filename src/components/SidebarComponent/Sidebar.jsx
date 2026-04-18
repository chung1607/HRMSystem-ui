import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdPeople, MdSecurity, MdBusiness, MdAssignmentInd } from "react-icons/md";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      icon: MdDashboard,
      path: "/admin/dashboard",
    },
    {
      label: "Quản lý người dùng",
      icon: MdPeople,
      path: "/admin/users",
    },
    {
      label: "Quản lý yêu cầu",
      icon: MdAssignmentInd,
      path: "/admin/requests",
    },
    {
      label: "Quản lý Teams",
      icon: MdBusiness,
      path: "/admin/teams",
    },
    {
      label: "Quản lý role/quyền",
      icon: MdSecurity,
      path: "/admin/roles",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-blue-600 to-blue-700 text-white w-64 transform transition-transform md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-40 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-500 mt-16 md:mt-0 text-center">
          <h1 className="text-2xl font-bold">HRM System</h1>
          <p className="text-xs text-blue-100 mt-1">Quản lý nhân sự</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.path)
                    ? "bg-white text-blue-600 shadow-md font-semibold"
                    : "text-blue-100 hover:bg-blue-500 hover:text-white"
                }`}
              >
                <IconComponent size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}