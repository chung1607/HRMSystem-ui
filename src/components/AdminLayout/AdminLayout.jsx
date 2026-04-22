import { useState } from "react";
import Sidebar from "../SidebarComponent/Sidebar";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponent";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderComponent
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto pt-20">
          <div className="p-8">
            <div className="max-w-7xl">{children}</div>
          </div>
          <FooterComponent />
        </main>
      </div>
    </div>
  );
}
