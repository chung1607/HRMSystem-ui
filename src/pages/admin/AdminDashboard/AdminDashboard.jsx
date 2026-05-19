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
  getUnpaidOwnersStats,
  getSugarcaneByTeam,
  getSubscriptionStatusStats,
  getTeamPerformance,
} from "../../../services/adminServices";
import CountUp from "react-countup";

const COLORS = ["#2563eb", "#38bdf8", "#93c5fd"];

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOwners: 0,
    totalTeams: 0,
    totalEmployees: 0,
  });

  const [unpaidStats, setUnpaidStats] = useState({
    unpaid: 0,
    total: 0,
    percent: 0,
  });

  const [lineData, setLineData] = useState([]);
  const [range, setRange] = useState("week");

  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    if (userRole === "admin") {
      setIsAdmin(true);
      fetchDashboardStats();
      fetchUnpaidStats();
      fetchPaymentChart(range);
      fetchSugarcaneByTeam();
      fetchSubscriptionStatus();
      fetchTeamPerformance();
    }

    setLoading(false);
  }, [range]);

  const fetchUnpaidStats = async () => {
    try {
      const response = await getUnpaidOwnersStats();
      setUnpaidStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSugarcaneByTeam = async () => {
    try {
      const response = await getSugarcaneByTeam();

      const formattedData = response.data.map((item) => ({
        name: item.name,
        fresh: Number(item.fresh),
        burnt: Number(item.burnt),
      }));

      setBarData(formattedData);
    } catch (error) {
      console.error("Failed to fetch sugarcane stats:", error);
    }
  };

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await getSubscriptionStatusStats();

      setPieData([
        {
          name: "Đã duyệt",
          value: response.data.approved,
        },
        {
          name: "Chờ duyệt",
          value: response.data.pending,
        },
        {
          name: "Từ chối",
          value: response.data.rejected,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeamPerformance = async () => {
    try {
      const response = await getTeamPerformance();

      const formattedData = response.data.map((item) => ({
        name: item.name,
        member: item.member,
        total: Number(item.total),
      }));

      setRequestData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

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
            <div className="text-gray-500 text-md font-medium">
              Tổng số người dùng
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
            <div className="text-gray-500 text-md font-medium">
              Tổng số chủ quản lý
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
            <div className="text-gray-500 text-md font-medium">
              Tổng số tổ công
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
            <div className="text-gray-500 text-md font-medium">
              Tổng số nhân công
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

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600 mb-8">
          <div className="text-gray-500 text-sm font-medium">
            Owner chưa đóng phí
          </div>

          <div className="text-3xl font-bold text-gray-900 mt-2">
            {unpaidStats.unpaid} / {unpaidStats.total}
          </div>

          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-purple-600 h-2.5 rounded-full"
                style={{ width: `${unpaidStats.percent}%` }}
              />
            </div>

            <p className="text-sm text-gray-500 mt-2">
              {unpaidStats.percent}% owner chưa thanh toán tháng này
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Thống kê thanh toán của chủ quản lý
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
                <XAxis dataKey="name" tick={false} axisLine={false} />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    `${Number(value).toLocaleString("vi-VN")} VNĐ`,
                    "Tổng tiền",
                  ]}
                />
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

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sản lượng mía theo tổ công
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    `${Number(value).toLocaleString("vi-VN")} bó`,
                    name === "fresh" ? "Mía tươi" : "Mía cháy",
                  ]}
                />
                <Legend />

                <Bar
                  dataKey="fresh"
                  stackId="a"
                  fill="#2563eb"
                  name="Mía tươi"
                />

                <Bar
                  dataKey="burnt"
                  stackId="a"
                  fill="#38bdf8"
                  name="Mía cháy"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Trạng thái thanh toán của chủ quản lý
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  labelLine={false}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value, name) => [`${value} owner`, name]}
                />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Người kiếm nhiều nhất mỗi tổ công
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={requestData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />

                <Tooltip
                  formatter={(value) => [
                    `${Number(value).toLocaleString("vi-VN")} VNĐ`,
                    "Doanh thu",
                  ]}
                  labelFormatter={(label, payload) =>
                    payload?.[0]?.payload?.member || label
                  }
                />

                <Legend />

                <Bar dataKey="total" fill="#2563eb" name="Doanh thu cao nhất" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
