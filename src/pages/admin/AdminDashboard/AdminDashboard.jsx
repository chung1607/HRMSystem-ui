import { useEffect, useState } from "react";
import NotFoundPage from "../../NotFoundPage/NotFoundPage";

export default function AdminDashboard() {
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
  
  return <div>Admin Dashboard</div>;
}