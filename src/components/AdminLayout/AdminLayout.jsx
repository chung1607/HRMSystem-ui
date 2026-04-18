import { useState } from "react";
import Sidebar from "../SidebarComponent/Sidebar";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">  {/* đổi min-h-screen → h-screen */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">  {/* thêm overflow-hidden */}
        <HeaderComponent onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-8 pt-20">  {/* thêm overflow-y-auto */}
          <div className="max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}