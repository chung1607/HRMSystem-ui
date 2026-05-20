import { useEffect, useState } from "react";
import OwnerLayout from "../../../components/OwnerLayout/OwnerLayout";
import NotFoundPage from "../../NotFoundPage/NotFoundPage";
import {
  getOwnerDashboardStats,
  getOwnerCaneChart,
  getCaneTypeChart,
  getTopWorkers,
  getRecentWorkLogs,
} from "../../../services/ownerServices";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

export default function OwnerDashboard() {
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalMembers: 0,
    totalCanes: 0,
    totalPayments: 0,
    subscriptionStatus: "pending",
  });

  const [lineData, setLineData] = useState([]);
  const [range, setRange] = useState("week");

  const [pieData, setPieData] = useState([]);
  const [topWorkers, setTopWorkers] = useState([]);

  const [recentLogs, setRecentLogs] = useState([]);

  const COLORS = ["#2563eb", "#60a5fa"];

  const fetchCaneChart = async (selectedRange = "week") => {
    try {
      const response = await getOwnerCaneChart(selectedRange);

      const formattedData = response.data.map((item) => ({
        name: item.label,
        total: Number(item.total),
      }));

      setLineData(formattedData);
    } catch (error) {
      console.error("Failed to fetch cane chart:", error);
    }
  };

  const fetchCaneTypeChart = async () => {
    try {
      const response = await getCaneTypeChart();

      const formattedData = response.data.map((item) => ({
        name: item.name === "fresh" ? "Mía tươi" : "Mía cháy",
        value: Number(item.value),
      }));

      setPieData(formattedData);
    } catch (error) {
      console.error("Failed to fetch cane type chart:", error);
    }
  };

  const fetchTopWorkers = async () => {
    try {
      const response = await getTopWorkers();

      const formattedData = response.data.map((item) => ({
        name: item.name,
        total: Number(item.total),
      }));

      setTopWorkers(formattedData);
    } catch (error) {
      console.error("Failed to fetch top workers:", error);
    }
  };

  const fetchRecentWorkLogs = async () => {
    try {
      const response = await getRecentWorkLogs();
      setRecentLogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    if (userRole === "owner") {
      setIsOwner(true);

      fetchDashboardStats();
      fetchCaneChart(range);
      fetchCaneTypeChart();
      fetchTopWorkers();
      fetchRecentWorkLogs();
    }

    setLoading(false);
  }, [range]);

  const fetchDashboardStats = async () => {
    try {
      const response = await getOwnerDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch owner dashboard stats:", error);
    }
  };

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
            Chào mừng đến trang quản trị của chủ quản lý
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <div className="text-gray-500 text-md font-medium">
              Tổng nhân công
            </div>

            <div className="text-3xl font-bold text-gray-900 mt-2">
              {stats.totalMembers}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <div className="text-gray-500 text-md font-medium">Tổng bó mía</div>

            <div className="text-3xl font-bold text-gray-900 mt-2">
              {stats.totalCanes.toLocaleString()}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-600">
            <div className="text-gray-500 text-md font-medium">
              Tổng chi phí nhân công
            </div>

            <div className="text-3xl font-bold text-gray-900 mt-2">
              {Number(stats.totalPayments).toLocaleString("vi-VN")} VNĐ
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
            <div className="text-gray-500 text-md font-medium">
              Trạng thái hoạt động
            </div>

            <div className="text-2xl font-bold text-gray-900 mt-2 capitalize">
              {stats.subscriptionStatus}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Sản lượng bó mía
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
                    `${Number(value).toLocaleString()} bó`,
                    "Sản lượng",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#2563eb"
                  strokeWidth={3}
                  name="Bó mía"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tỷ lệ loại mía
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [
                    `${Number(value).toLocaleString()} bó`,
                    "Số lượng",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Nhân công làm nhiều tiền nhất
            </h3>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={topWorkers}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" tick={{ fontSize: 12 }} />

                <YAxis
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />

                <Tooltip
                  formatter={(value) => [
                    `${Number(value).toLocaleString("vi-VN")} VNĐ`,
                    "Tổng tiền",
                  ]}
                />

                <Bar dataKey="total" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Chấm công gần đây
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="py-3 text-left">Nhân công</th>

                  <th className="py-3 text-left">Ngày</th>

                  <th className="py-3 text-left">Loại mía</th>

                  <th className="py-3 text-left">Số bó</th>

                  <th className="py-3 text-left">Tổng tiền</th>
                </tr>
              </thead>

              <tbody>
                {recentLogs.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3">{item.worker}</td>

                    <td className="py-3">
                      {new Date(item.date).toLocaleDateString("vi-VN")}
                    </td>

                    <td className="py-3">
                      {item.caneType === "fresh" ? "Mía tươi" : "Mía cháy"}
                    </td>

                    <td className="py-3">{item.quantity}</td>

                    <td className="py-3">
                      {Number(item.total).toLocaleString("vi-VN")} VNĐ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}
