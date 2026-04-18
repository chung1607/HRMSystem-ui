import { useEffect, useState } from "react";
import { Table } from "../../../components/table/index";
import { Badge, Avatar } from "../../../components/ui/index";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import NotFoundPage from "../../NotFoundPage/NotFoundPage";

const DATA = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "an.nguyen@acme.vn",
    role: "Admin",
    status: "active",
    joined: "12/01/2024",
  },
  {
    id: 2,
    name: "Trần Thị Bích",
    email: "bich.tran@acme.vn",
    role: "Editor",
    status: "active",
    joined: "03/03/2024",
  },
  {
    id: 3,
    name: "Lê Minh Cường",
    email: "cuong.le@acme.vn",
    role: "Viewer",
    status: "inactive",
    joined: "20/05/2024",
  },
];

const STATUS_MAP = {
  active: { label: "Hoạt động", variant: "success" },
  inactive: { label: "Tắt", variant: "neutral" },
};

const ROLE_MAP = {
  Admin: { label: "Admin", variant: "info" },
  Editor: { label: "Editor", variant: "neutral" },
  Viewer: { label: "Viewer", variant: "neutral" },
};

export default function AdminUsers() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "admin") {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!isAdmin) {
    return <NotFoundPage />;
  }

  const columns = [
    {
      key: "name",
      label: "Người dùng",
      sortable: true,
      width: "40%",
      render: (val, row) => (
        <div className="flex items-center gap-2 min-w-0">
          <Avatar name={val} />
          <div className="min-w-0">
            <p className="font-medium text-zinc-900 leading-tight truncate text-xs md:text-sm">
              {val}
            </p>
            <p className="text-xs text-zinc-400 leading-tight truncate">
              {row.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Vai trò",
      sortable: true,
      width: "20%",
      render: (val) => (
        <Badge variant={ROLE_MAP[val].variant}>{ROLE_MAP[val].label}</Badge>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      sortable: true,
      width: "20%",
      render: (val) => (
        <Badge variant={STATUS_MAP[val].variant}>{STATUS_MAP[val].label}</Badge>
      ),
    },
    {
      key: "joined",
      label: "Ngày tham gia",
      sortable: true,
      width: "20%",
      hidden: true, // Thêm dòng này
    },
  ];

  return (
    <AdminLayout>
      <div className="w-full">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">
            Quản lý người dùng
          </h1>
          <p className="text-sm md:text-base text-zinc-500">
            Xem và quản lý tất cả người dùng trong hệ thống
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table
            columns={columns}
            data={DATA}
            caption="Danh sách người dùng"
            pageSize={5}
            selectable
          />
        </div>
      </div>
    </AdminLayout>
  );
}
