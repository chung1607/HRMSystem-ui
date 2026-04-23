import { useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";

export default function AdminOwnerRequest() {
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
        <h1>Yêu cầu làm chủ sở hữu</h1>
    </AdminLayout>
  );
}
