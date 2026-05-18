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
import DataTable from "../../../components/table/DataTable";
import {
  getDashboardStats,
  getPaymentChart,
} from "../../../services/adminServices";
import CountUp from "react-countup";

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
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOwners: 0,
    totalTeams: 0,
    totalEmployees: 0,
  });

  const [lineData, setLineData] = useState([]);
  const [range, setRange] = useState("week");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    if (userRole === "admin") {
      setIsAdmin(true);
      fetchDashboardStats();
      fetchPaymentChart(range);
    }

    setLoading(false);
  }, [range]);

  const fetchPaymentChart = async (selectedRange = "week") => {
    try {
      const response = await getPaymentChart(selectedRange);

      console.log("payment chart response:", response.data);

      const formattedData = response.data.map((item) => ({
        name: item.label,
        total: Number(item.total),
      }));

      console.log("formattedData:", formattedData);

      setLineData(formattedData);
    } catch (error) {
      console.error("Failed to fetch payment chart:", error);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!isAdmin) {
    return <NotFoundPage />;
  }

  return (
    <AdminLayout>
      <div className="w-full">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">
            Dashboard
          </h1>
          <p className="text-sm md:text-base text-zinc-500">
            Chào mừng đến trang quản trị hệ thống
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <div className="text-gray-500 text-sm font-medium">
              Tổng số người dùng (users)
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-2">
              <CountUp
                end={stats.totalUsers.toLocaleString()}
                duration={5}
                separator=","
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <div className="text-gray-500 text-sm font-medium">
              Tổng số chủ quản lý (owners)
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-2">
              <CountUp
                end={stats.totalOwners.toLocaleString()}
                duration={5}
                separator=","
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-600">
            <div className="text-gray-500 text-sm font-medium">
              Tổng số tổ công (teams)
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-2">
              <CountUp
                end={stats.totalTeams.toLocaleString()}
                duration={5}
                separator=","
              />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
            <div className="text-gray-500 text-sm font-medium">
              Tổng số nhân công (employees)
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-2">
              <CountUp
                end={stats.totalEmployees.toLocaleString()}
                duration={5}
                separator=","
              />
            </div>
          </div>
        </div>

        <DataTable />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Tổng thanh toán owner
              </h3>

              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="border px-3 py-1 rounded-lg"
              >
                <option value="week">Tuần</option>
                <option value="month">Tháng</option>
                <option value="year">Năm</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#3b82f6"
                  name="Tổng tiền"
                />
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
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
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
                <Bar
                  dataKey="thanh_toan"
                  stackId="a"
                  fill="#3b82f6"
                  name="Thanh toán"
                />
                <Bar
                  dataKey="nang_cap"
                  stackId="a"
                  fill="#10b981"
                  name="Nâng cấp"
                />
                <Bar dataKey="khac" stackId="a" fill="#f59e0b" name="Khác" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
