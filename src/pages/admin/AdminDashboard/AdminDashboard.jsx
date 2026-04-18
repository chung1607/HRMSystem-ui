import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import NotFoundPage from "../../NotFoundPage/NotFoundPage";

// Data mẫu
const lineData = [
  { name: "T1", users: 400, requests: 240 },
  { name: "T2", users: 500, requests: 350 },
  { name: "T3", users: 620, requests: 420 },
  { name: "T4", users: 580, requests: 500 },
  { name: "T5", users: 700, requests: 580 },
];

const barData = [
  { name: "Admin", value: 45 },
  { name: "Editor", value: 120 },
  { name: "Viewer", value: 200 },
];

const pieData = [
  { name: "Hoạt động", value: 780 },
  { name: "Không hoạt động", value: 150 },
  { name: "Chờ duyệt", value: 304 },
];

const requestData = [
  { name: "T1", thanh_toan: 45, nang_cap: 30, khac: 20 },
  { name: "T2", thanh_toan: 60, nang_cap: 45, khac: 25 },
  { name: "T3", thanh_toan: 75, nang_cap: 55, khac: 35 },
  { name: "T4", thanh_toan: 80, nang_cap: 60, khac: 40 },
  { name: "T5", thanh_toan: 95, nang_cap: 70, khac: 50 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

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

  return (
    <AdminLayout>
      <div className="h-full overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Chào mừng đến trang quản trị hệ thống
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <div className="text-gray-500 text-sm font-medium">Tổng người dùng</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">1,234</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <div className="text-gray-500 text-sm font-medium">Người dùng hoạt động</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">780</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-600">
            <div className="text-gray-500 text-sm font-medium">Yêu cầu chờ duyệt</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">156</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
            <div className="text-gray-500 text-sm font-medium">Vấn đề cần xử lý</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">24</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart - Người dùng & Yêu cầu theo tháng */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Người dùng & Yêu cầu (5 tháng)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" name="Người dùng" />
                <Line type="monotone" dataKey="requests" stroke="#10b981" name="Yêu cầu" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - Phân bổ theo vai trò */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Phân bổ theo vai trò
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" name="Số lượng" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Trạng thái người dùng */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Trạng thái người dùng
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - Loại yêu cầu */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Loại yêu cầu theo tháng
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={requestData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="thanh_toan" stackId="a" fill="#3b82f6" name="Thanh toán" />
                <Bar dataKey="nang_cap" stackId="a" fill="#10b981" name="Nâng cấp" />
                <Bar dataKey="khac" stackId="a" fill="#f59e0b" name="Khác" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}