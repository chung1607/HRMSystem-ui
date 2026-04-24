import { useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import {
  getOwnerRequests,
  approveOwnerRequest,
  rejectOwnerRequest,
} from "../../../services/adminServices";
import NotFoundPage from "../../NotFoundPage/NotFoundPage";
import toast from "react-hot-toast";

export default function AdminOwnerRequest() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "admin") {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchRequests();
    }
  }, [isAdmin]);

  const fetchRequests = async () => {
    try {
      setFetching(true);
      const response = await getOwnerRequests();
      setRequests(response.data);
      setError(null);
    } catch (err) {
      setError("Lỗi khi tải danh sách yêu cầu");
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleApprove = (request) => {
    setSelectedRequest(request);
    setConfirmAction("approve");
    setShowConfirm(true);
  };

  const handleReject = (request) => {
    setSelectedRequest(request);
    setConfirmAction("reject");
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    try {
      setActionLoading(true);

      if (confirmAction === "approve") {
        await approveOwnerRequest(selectedRequest.id);
        toast.success("Đã chấp nhận yêu cầu");
      } else if (confirmAction === "reject") {
        await rejectOwnerRequest(selectedRequest.id);
        toast.success("Đã từ chối yêu cầu");
      }

      fetchRequests();
    } catch (err) {
      toast.error("Có lỗi xảy ra khi xử lý yêu cầu");
      console.error(err);
    } finally {
      setActionLoading(false);
      setShowConfirm(false);
      setSelectedRequest(null);
      setConfirmAction(null);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("vi-VN");
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-700",
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    };

    const labels = {
      pending: "Chờ xử lý",
      approved: "Đã chấp nhận",
      rejected: "Đã từ chối",
    };

    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
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
            Quản lý yêu cầu người dùng
          </h1>
          <p className="text-sm md:text-base text-zinc-500">
            Xem và quản lý tất cả các yêu cầu người dùng trong hệ thống
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          {fetching && requests.length === 0 ? (
            <div className="text-center py-8">Đang tải...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              Không có yêu cầu nào cần xử lý
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-600 border-b font-medium">
                    <th className="py-3 px-4">TÊN</th>
                    <th className="py-3 px-4">MÔ TẢ</th>
                    <th className="py-3 px-4">TRẠNG THÁI</th>
                    <th className="py-3 px-4">NGÀY TẠO</th>
                    <th className="py-3 px-4">HÀNH ĐỘNG</th>
                  </tr>
                </thead>

                <tbody>
                  {requests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 font-medium">
                        {request.user.username}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {request.description}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(request.status)}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {formatDate(request.createdAt)}
                      </td>
                      <td className="py-3 px-4">
                        {request.status === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(request)}
                              className="px-3 py-1 text-xs rounded bg-green-100 text-green-700 hover:bg-green-200 transition"
                            >
                              Chấp nhận
                            </button>
                            <button
                              onClick={() => handleReject(request)}
                              className="px-3 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200 transition"
                            >
                              Từ chối
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-xs">
                            Đã xử lý
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showConfirm && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Xác nhận</h3>

              <p className="text-gray-600 mb-6">
                Bạn có chắc muốn{" "}
                <span className="font-semibold">
                  {confirmAction === "approve" ? "chấp nhận" : "từ chối"}
                </span>{" "}
                yêu cầu của{" "}
                <span className="font-semibold">
                  {selectedRequest?.user?.username}
                </span>
                ?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                  disabled={actionLoading}
                >
                  Hủy
                </button>

                <button
                  onClick={handleConfirm}
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition ${
                    confirmAction === "approve"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  } disabled:opacity-50`}
                  disabled={actionLoading}
                >
                  {actionLoading ? "Đang xử lý..." : "Xác nhận"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
