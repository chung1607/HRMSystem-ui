import { useEffect, useState, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import {
  getSubscriptionStatus,
  approveSubscription,
  rejectSubscription,
} from "../../services/adminServices";
import toast from "react-hot-toast";

export default function DataTable() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  const fetchSubscriptions = useCallback(async () => {
    try {
      const response = await getSubscriptionStatus(status);
      setData(response.data);
    } catch {
      toast.error("Không tải được subscription");
    }
  }, [status]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const handleApprove = async (id) => {
    try {
      await approveSubscription(id);
      toast.success("Đã duyệt");
      fetchSubscriptions();
    } catch {
      toast.error("Approve thất bại");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectSubscription(id);
      toast.success("Đã từ chối");
      fetchSubscriptions();
    } catch {
      toast.error("Reject thất bại");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      approved: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      rejected: "bg-red-100 text-red-700",
    };

    return colors[status];
  };

  const filteredData = data.filter(
    (item) =>
      item.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      item.teamName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-5">
        <h3 className="text-lg font-semibold">Thanh toán phí hàng tháng</h3>

        <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full md:w-44"
          >
            <option value="all">Tất cả</option>
            <option value="paid">Đã đóng</option>
            <option value="unpaid">Chưa đóng</option>
          </select>

          <div className="relative w-full md:w-72">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead>
            <tr className="text-gray-600 border-b font-medium">
              <th className="py-3 px-4">OWNER</th>
              <th className="py-3 px-4">TEAM</th>
              <th className="py-3 px-4">THÁNG</th>
              <th className="py-3 px-4">PHÍ</th>
              <th className="py-3 px-4">TRẠNG THÁI</th>
              <th className="py-3 px-4 text-center">MINH CHỨNG</th>
              <th className="py-3 px-4 text-center">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-gray-500">
                  {status === "paid"
                    ? "Không có owner nào đã đóng phí"
                    : status === "unpaid"
                      ? "Không có owner nào chưa đóng phí"
                      : "Không có dữ liệu"}
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{item.ownerName}</td>
                  <td className="py-3 px-4">{item.teamName}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{item.month}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {Number(item.amount).toLocaleString()} VNĐ
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    {item.proofImage ? (
                      <a
                        href={`http://localhost:3000/${item.proofImage}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline hover:text-blue-800 inline-block"
                      >
                        Xem
                      </a>
                    ) : (
                      <span className="text-gray-400">Không có</span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    {item.status === "pending" ? (
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => handleReject(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm italic flex justify-center">
                        Đã xử lý
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
