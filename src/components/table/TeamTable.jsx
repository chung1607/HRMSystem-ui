import { useEffect, useState } from "react";
import { getAllTeams } from "../../services/adminServices";
import toast from "react-hot-toast";

export default function TeamTable() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);

      const response = await getAllTeams();
      setTeams(response.data);

      setError(null);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu đội ngũ");
      console.error(err);
      toast.error("Không thể tải danh sách đội ngũ");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const isActive = status === "active";

    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
          isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {isActive ? "Hoạt động" : "Ngừng hoạt động"}
      </span>
    );
  };

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div className="w-full">
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!loading && (
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700">
                  Tên đội
                </th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700">
                  Chủ sở hữu
                </th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700">
                  Mã mời
                </th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700">
                  Trạng thái
                </th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700">
                  Ngày tạo
                </th>
              </tr>
            </thead>

            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 sm:px-6 py-4 text-center text-gray-500"
                  >
                    Không có đội ngũ nào
                  </td>
                </tr>
              ) : (
                teams.map((team) => (
                  <tr
                    key={team.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-4 text-gray-900">
                      {team.id}
                    </td>

                    <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">
                      {team.name}
                    </td>

                    <td className="px-4 sm:px-6 py-4 text-gray-600">
                      {team.owner?.username || "N/A"}
                    </td>

                    <td className="px-4 sm:px-6 py-4 text-gray-600">
                      {team.invite_code || "N/A"}
                    </td>

                    <td className="px-4 sm:px-6 py-4">
                      {getStatusBadge(team.status)}
                    </td>

                    <td className="px-4 sm:px-6 py-4 text-gray-600 whitespace-nowrap">
                      {new Date(team.created_at).toLocaleDateString("vi-VN")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
