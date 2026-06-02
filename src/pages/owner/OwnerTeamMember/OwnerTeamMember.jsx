import { useEffect, useState, useCallback } from "react";
import OwnerLayout from "../../../components/OwnerLayout/OwnerLayout";
import NotFoundPage from "../../NotFoundPage/NotFoundPage";
import {
  getTeamMembers,
  getTeamMemberStats,
  updateTeamMemberStatus,
} from "../../../services/ownerServices";

export default function OwnerTeamMember() {
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  const [members, setMembers] = useState([]);

  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    inactiveMembers: 0,
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchMembers = useCallback(async () => {
    try {
      const response = await getTeamMembers(page, 10, search);

      setMembers(response.data.data);
      setTotalPages(response.data.meta.totalPages);
    } catch (error) {
      console.error(error);
    }
  }, [page, search]);

  const fetchStats = async () => {
    try {
      const response = await getTeamMemberStats();
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await updateTeamMemberStatus(id);

      fetchMembers();
      fetchStats();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    if (userRole === "owner") {
      setIsOwner(true);

      fetchMembers();
      fetchStats();
    }

    setLoading(false);
  }, [fetchMembers]);

  if (loading) return <div>Loading...</div>;

  if (!isOwner) {
    return <NotFoundPage />;
  }

  return (
    <OwnerLayout>
      <div className="w-full">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">
            Quản lý thành viên đội ngũ
          </h1>

          <p className="text-sm md:text-base text-zinc-500">
            Xem và quản lý tất cả thành viên đội ngũ trong team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-500 text-sm">Tổng thành viên</p>

            <p className="text-3xl font-bold">{stats.totalMembers}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-500 text-sm">Đang hoạt động</p>

            <p className="text-3xl font-bold text-green-600">
              {stats.activeMembers}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-500 text-sm">Ngưng hoạt động</p>

            <p className="text-3xl font-bold text-red-600">
              {stats.inactiveMembers}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm thành viên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 border rounded-lg px-4 py-2"
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3 text-left">Thành viên</th>

                <th className="p-3 text-left">Trạng thái</th>

                <th className="p-3 text-left">Ngày tham gia</th>
                <th className="p-3 text-left">Tổng bó mía</th>
                <th className="p-3 text-left">Tổng tiền</th>
                <th className="p-3 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {members.length > 0 ? (
                members.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={`http://localhost:3000/${member.avatar}`}
                          //   alt={member.username}
                          className="w-10 h-10 rounded-full object-cover"
                        />

                        <span className="font-medium">{member.username}</span>
                      </div>
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          member.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>

                    <td className="p-3">
                      {new Date(member.joinedAt).toLocaleDateString("vi-VN")}
                    </td>

                    <td className="p-3">{member.totalCane.toLocaleString()}</td>

                    <td className="p-3">
                      {Number(member.totalMoney).toLocaleString("vi-VN")} VNĐ
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleToggleStatus(member.id)}
                        className={`px-3 py-1 rounded text-white ${
                          member.status === "active"
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {member.status === "active" ? "Disable" : "Enable"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    Không có thành viên nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </OwnerLayout>
  );
}
