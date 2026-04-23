import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { getAllUsers } from "../../services/adminServices";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers(pagination.currentPage, searchTerm);
  }, []);

  const fetchUsers = async (page = 1, search = "") => {
    try {
      setLoading(true);
      const response = await getAllUsers({
        page,
        items_per_page: 10,
        search: search,
      });

      setUsers(response.data.data);
      setPagination({
        currentPage: response.data.currentPage,
        lastPage: response.data.lastPage,
        total: response.data.total,
        nextPage: response.data.nextPage,
        prevPage: response.data.prevPage,
      });
      setError(null);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu người dùng");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Reset to page 1 when searching
    setTimeout(() => {
      fetchUsers(1, value);
    }, 500);
  };

  const getStatusBadge = (isVerified) => {
    return isVerified ? (
      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
        Xác thực
      </span>
    ) : (
      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
        Chưa xác thực
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const colors = {
      admin:
        "inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-700",
      owner:
        "bg-sky-100 text-sky-700 rounded-full px-4 py-2 text-md font-medium",
      employee:
        "bg-emerald-100 text-emerald-800 inline-block px-3 py-1 rounded-full text-xs font-medium",
    };
    return (
      colors[role] ||
      "bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-md font-medium"
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("vi-VN");
  };

  if (loading && users.length === 0) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Danh sách người dùng</h3>
        <div className="flex gap-2 items-center relative">
          <FiSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc SĐT..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-600 border-b font-medium">
              <th className="py-3 px-4">TÊN NGƯỜI DÙNG</th>
              <th className="py-3 px-4">SỐ ĐIỆN THOẠI</th>
              <th className="py-3 px-4">VAI TRÒ</th>
              <th className="py-3 px-4">TRẠNG THÁI</th>
              <th className="py-3 px-4">NGÀY TẠO</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 font-medium">{user.username}</td>
                <td className="py-3 px-4">{user.phone}</td>
                <td className="py-3 px-4">
                  <span className={getRoleBadge(user.role)}>{user.role}</span>
                </td>
                <td className="py-3 px-4">
                  {getStatusBadge(user.is_verified)}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {formatDate(user.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-600">
          Tổng: {pagination.total} người dùng | Trang {pagination.currentPage}/
          {pagination.lastPage}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => fetchUsers(pagination.prevPage, searchTerm)}
            disabled={!pagination.prevPage}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Trang trước
          </button>
          <button
            onClick={() => fetchUsers(pagination.nextPage, searchTerm)}
            disabled={!pagination.nextPage}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
}
