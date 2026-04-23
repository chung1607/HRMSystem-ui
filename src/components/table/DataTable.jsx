import { FiSearch } from "react-icons/fi";
export default function OwnerRequestsTable() {
  const data = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      email: "an.nguyen@acme.vn",
      avatar: "NV",
      role: "Admin",
      status: "Hoạt động",
      count: 142,
      joinDate: "12/01/2024",
    },
    {
      id: 2,
      name: "Trần Thị Bích",
      email: "bich.tran@acme.vn",
      avatar: "TT",
      role: "Editor",
      status: "Hoạt động",
      count: 87,
      joinDate: "03/03/2024",
    },
    // ... thêm dữ liệu khác
  ];

  const getRoleColor = (role) => {
    const colors = {
      Admin: "bg-blue-100 text-blue-700",
      Editor: "bg-purple-100 text-purple-700",
      Viewer: "bg-gray-100 text-gray-700",
    };
    return colors[role] || "bg-gray-100 text-gray-700";
  };

  const getStatusColor = (status) => {
    return status === "Hoạt động"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold flex items-center justify-between mb-5">
          <span>Quản lý người dùng</span>
        </h3>
        <div className="flex gap-2 items-center relative">
          <FiSearch className="absolute left-3 text-gray-400" />

          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-600 border-b font-medium">
              <th className="py-3 px-4">NGƯỜI DÙNG</th>
              <th className="py-3 px-4">VAI TRÒ</th>
              <th className="py-3 px-4">TRẠNG THÁI</th>
              <th className="py-3 px-4">ĐƠN HÀNG</th>
              <th className="py-3 px-4">NGÀY THAM GIA</th>
              <th className="py-3 px-4 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-sm font-semibold">
                      {item.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${getRoleColor(item.role)}`}
                  >
                    {item.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4">{item.count}</td>
                <td className="py-3 px-4">{item.joinDate}</td>
                <td className="py-3 px-4 text-center space-x-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition">
                    Approve
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
