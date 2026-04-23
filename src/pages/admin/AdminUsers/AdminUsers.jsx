import { useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import NotFoundPage from "../../NotFoundPage/NotFoundPage";
import UserTable from "../../../components/table/UserTable";

export default function AdminUsers() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "admin") {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!isAdmin) {
    return <NotFoundPage />;
  }

  return (
    <AdminLayout>
      <div className="w-full">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">
            Quản lý người dùng
          </h1>
          <p className="text-sm md:text-base text-zinc-500">
            Xem và quản lý tất cả người dùng trong hệ thống
          </p>
        </div>
        <UserTable />
      </div>
    </AdminLayout>
  );
}
