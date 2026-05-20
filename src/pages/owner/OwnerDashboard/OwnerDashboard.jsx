import { useEffect, useState } from "react";
import OwnerLayout from "../../../components/OwnerLayout/OwnerLayout";
import NotFoundPage from "../../NotFoundPage/NotFoundPage";

export default function OwnerDashboard() {
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "owner") {
      setIsOwner(true);
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!isOwner) {
    return <NotFoundPage />;
  }

  return (
    <OwnerLayout>
      <div className="w-full">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">
            Dashboard
          </h1>
          <p className="text-sm md:text-base text-zinc-500">
            Chào mừng đến trang quản trị hệ thống
          </p>
        </div>
      </div>
    </OwnerLayout>
  );
}
