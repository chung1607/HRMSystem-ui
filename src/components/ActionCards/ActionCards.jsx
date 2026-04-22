import { useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaUsers,
  FaExclamationTriangle,
  FaChevronRight,
} from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

export default function ActionCards() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Owner Requests",
      value: 12,
      description: "Yêu cầu làm chủ đang chờ duyệt",
      icon: <FaUserShield size={20} />,
      color: "bg-blue-100 text-blue-600",
      onClick: () => navigate("/admin/owner-requests"),
    },
    {
      title: "Join Requests",
      value: 8,
      description: "Yêu cầu tham gia tổ",
      icon: <FaUsers size={20} />,
      color: "bg-green-100 text-green-600",
      onClick: () => navigate("/admin/join-requests"),
    },
    {
      title: "Reports",
      value: 3,
      description: "Vấn đề cần xử lý",
      icon: <FaExclamationTriangle size={20} />,
      color: "bg-red-100 text-red-600",
      isAlert: true,
      onClick: () => navigate("/admin/reports"),
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full transition-all duration-300 hover:shadow-lg mb-8">
      <h3 className="text-xl font-semibold flex items-center justify-between mb-5">
        <span>Yêu cầu cần xử lý</span>
        <span className="text-gray-500 text-lg"><IoSettings /></span>
      </h3>

      <ul>
        {actions.map((item, index) => (
          <li
            key={index}
            onClick={item.onClick}
            className={`flex items-center justify-between group p-4 rounded-xl transition-all duration-300 cursor-pointer 
            hover:bg-gray-50
            ${index !== actions.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            
            <div className="flex items-center gap-4">
              
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full ${item.color} 
                transition-all duration-300 group-hover:scale-110`}
              >
                {item.icon}
              </div>

              <div>
                <div className="font-semibold text-lg flex items-center gap-2">
                  {item.title}

                  {item.isAlert && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  )}
                </div>

                <div className="text-sm text-gray-500 mt-1">
                  {item.description}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-blue-600 animate-pulse">
                {item.value}
              </div>

              <FaChevronRight className="text-gray-400 text-lg group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
