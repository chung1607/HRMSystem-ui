import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  getAllUsers,
  disableUser,
  enableUser,
  changeUserRole,
} from "../../services/adminServices";
import toast from "react-hot-toast";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    nextPage: null,
    prevPage: null,
  });

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [actionType, setActionType] = useState(null); // toggle | changeRole
  const [newRole, setNewRole] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  useEffect(() => {
    fetchUsers(page, searchTerm);
  }, [page, searchTerm]);

  const fetchUsers = async (page = 1, search = "") => {
    try {
      setLoading(true);

      const response = await getAllUsers({
        page,
        items_per_page: 10,
        search,
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
    setSearchTerm(e.target.value);
  };

  const handleClickAction = (user) => {
    setSelectedUser(user);
    setActionType("toggle");
    setShowConfirm(true);
  };

  const handleSelectRole = (user, role) => {
    if (user.role === role) return;

    setSelectedUser(user);
    setNewRole(role);
    setActionType("changeRole");
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    try {
      setActionLoading(true);

      if (actionType === "toggle") {
        if (selectedUser.is_active) {
          await disableUser(selectedUser.id);
          toast.success("Đã khóa tài khoản");
        } else {
          await enableUser(selectedUser.id);
          toast.success("Đã mở khóa tài khoản");
        }
      }

      if (actionType === "changeRole") {
        await changeUserRole(selectedUser.id, newRole);
        toast.success("Đã đổi role thành công");
      }

      fetchUsers(page, searchTerm);
    } catch (err) {
      toast.error("Có lỗi xảy ra");
      console.error(err);
    } finally {
      setActionLoading(false);
      setShowConfirm(false);
      setSelectedUser(null);
      setNewRole(null);
      setActionType(null);
    }
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

  const getActiveBadge = (isActive) => {
    return isActive ? (
      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
        Hoạt động
      </span>
    ) : (
      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
        Bị khóa
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin:
        "bg-violet-100 text-violet-700 inline-block px-3 py-1 rounded-full text-xs font-medium",
      owner:
        "bg-sky-100 text-sky-700 inline-block px-3 py-1 rounded-full text-xs font-medium",
      employee:
        "bg-emerald-100 text-emerald-800 inline-block px-3 py-1 rounded-full text-xs font-medium",
    };

    return styles[role] || styles.employee;
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
    <>
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Danh sách người dùng</h3>

          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                <th className="py-3 px-4">TÊN</th>
                <th className="py-3 px-4">SĐT</th>
                <th className="py-3 px-4">VAI TRÒ</th>
                <th className="py-3 px-4">XÁC THỰC</th>
                <th className="py-3 px-4">HOẠT ĐỘNG</th>
                <th className="py-3 px-4">NGÀY TẠO</th>
                <th className="py-3 px-4">HÀNH ĐỘNG</th>
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

                  <td className="py-3 px-4">
                    {getActiveBadge(user.is_active)}
                  </td>

                  <td className="py-3 px-4 text-gray-600">
                    {formatDate(user.created_at)}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleClickAction(user)}
                        className={`px-3 py-1 text-xs rounded transition ${
                          user.is_active
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {user.is_active ? "Disable" : "Enable"}
                      </button>

                      <select
                        value={user.role}
                        onChange={(e) => handleSelectRole(user, e.target.value)}
                        className="text-xs border rounded px-2 py-1"
                      >
                        <option value="admin">Admin</option>
                        <option value="owner">Owner</option>
                        <option value="employee">Employee</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-600">
            Tổng: {pagination.total} | Trang {pagination.currentPage}/
            {pagination.lastPage}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setPage(pagination.prevPage)}
              disabled={!pagination.prevPage}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Trang trước
            </button>

            <button
              onClick={() => setPage(pagination.nextPage)}
              disabled={!pagination.nextPage}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Trang sau
            </button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Xác nhận</h3>

            <p className="text-gray-600 mb-6">
              {actionType === "toggle" && (
                <>
                  Bạn có chắc muốn{" "}
                  <span className="font-semibold">
                    {selectedUser?.is_active ? "khóa" : "mở khóa"}
                  </span>{" "}
                  tài khoản{" "}
                  <span className="font-semibold">
                    {selectedUser?.username}
                  </span>{" "}
                  không?
                </>
              )}

              {actionType === "changeRole" && (
                <>
                  Bạn có chắc muốn đổi role của{" "}
                  <span className="font-semibold">
                    {selectedUser?.username}
                  </span>{" "}
                  thành{" "}
                  <span className="font-semibold text-blue-600">{newRole}</span>{" "}
                  không?
                </>
              )}
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded border hover:bg-gray-50"
              >
                Hủy
              </button>

              <button
                onClick={handleConfirm}
                disabled={actionLoading}
                className={`px-4 py-2 rounded text-white ${
                  actionType === "toggle"
                    ? selectedUser?.is_active
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } ${actionLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {actionLoading ? "Đang xử lý..." : "Xác nhận"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
