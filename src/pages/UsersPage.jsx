import { Table } from "../components/table/index";
import { Badge, Avatar, Pagination } from "../components/ui/index";

// ── Demo data ──────────────────────────────────────────────────────────────────
const DATA = [
  { id: 1,  name: "Nguyễn Văn An",    email: "an.nguyen@acme.vn",    role: "Admin",   status: "active",   orders: 142, joined: "12/01/2024" },
  { id: 2,  name: "Trần Thị Bích",    email: "bich.tran@acme.vn",    role: "Editor",  status: "active",   orders: 87,  joined: "03/03/2024" },
  { id: 3,  name: "Lê Minh Cường",    email: "cuong.le@acme.vn",     role: "Viewer",  status: "inactive", orders: 0,   joined: "20/05/2024" },
  { id: 4,  name: "Phạm Thu Hà",      email: "ha.pham@acme.vn",      role: "Editor",  status: "pending",  orders: 23,  joined: "08/06/2024" },
  { id: 5,  name: "Hoàng Quốc Hùng",  email: "hung.hoang@acme.vn",   role: "Admin",   status: "active",   orders: 210, joined: "01/02/2024" },
  { id: 6,  name: "Võ Thị Kim",       email: "kim.vo@acme.vn",       role: "Viewer",  status: "active",   orders: 55,  joined: "15/04/2024" },
  { id: 7,  name: "Đặng Văn Long",    email: "long.dang@acme.vn",    role: "Editor",  status: "inactive", orders: 11,  joined: "22/07/2024" },
  { id: 8,  name: "Bùi Thị Mai",      email: "mai.bui@acme.vn",      role: "Viewer",  status: "pending",  orders: 4,   joined: "30/08/2024" },
  { id: 9,  name: "Ngô Thanh Nam",    email: "nam.ngo@acme.vn",      role: "Editor",  status: "active",   orders: 98,  joined: "11/09/2024" },
  { id: 10, name: "Trương Thị Oanh",  email: "oanh.truong@acme.vn",  role: "Admin",   status: "active",   orders: 177, joined: "05/10/2024" },
  { id: 11, name: "Hồ Văn Phúc",      email: "phuc.ho@acme.vn",      role: "Viewer",  status: "pending",  orders: 2,   joined: "19/11/2024" },
  { id: 12, name: "Lý Thị Quỳnh",     email: "quynh.ly@acme.vn",     role: "Editor",  status: "active",   orders: 63,  joined: "28/12/2024" },
];

const STATUS_MAP = {
  active:   { label: "Hoạt động", variant: "success" },
  inactive: { label: "Tắt",       variant: "neutral" },
  pending:  { label: "Chờ duyệt", variant: "warning" },
};

const ROLE_MAP = {
  Admin:  { label: "Admin",  variant: "info"    },
  Editor: { label: "Editor", variant: "neutral" },
  Viewer: { label: "Viewer", variant: "neutral" },
};

// ── Column definitions ─────────────────────────────────────────────────────────
const columns = [
  {
    key: "name",
    label: "Người dùng",
    sortable: true,
    width: "30%",
    render: (val, row) => (
      <div className="flex items-center gap-2 min-w-0">
        <Avatar name={val} />
        <div className="min-w-0">
          <p className="font-medium text-zinc-900 leading-tight truncate">{val}</p>
          <p className="text-xs text-zinc-400 leading-tight truncate">{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: "role",
    label: "Vai trò",
    sortable: true,
    render: (val) => (
      <Badge variant={ROLE_MAP[val].variant}>{ROLE_MAP[val].label}</Badge>
    ),
  },
  {
    key: "status",
    label: "Trạng thái",
    sortable: true,
    render: (val) => (
      <Badge variant={STATUS_MAP[val].variant}>{STATUS_MAP[val].label}</Badge>
    ),
  },
  {
    key: "orders",
    label: "Đơn hàng",
    sortable: true,
    align: "right",
    render: (val) => (
      <span className="font-mono font-medium text-zinc-800">
        {val.toLocaleString()}
      </span>
    ),
  },
  {
    key: "joined",
    label: "Ngày tham gia",
    sortable: true,
  },
  {
    key: "id",
    label: "",
    align: "right",
    render: (_, row) => (
      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => alert(`Sửa: ${row.name}`)}
          className="px-2.5 py-1 rounded-md text-xs font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
        >
          Sửa
        </button>
        <button
          onClick={() => alert(`Xóa: ${row.name}`)}
          className="px-2.5 py-1 rounded-md text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          Xóa
        </button>
      </div>
    ),
  },
];

// ── Page ───────────────────────────────────────────────────────────────────────
export default function UsersPage() {
  return (
    <div className="min-h-screen bg-zinc-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-2">
        <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
          Quản lý người dùng
        </h1>
        <p className="text-sm text-zinc-500 mb-6">
          Xem, tìm kiếm và quản lý tài khoản trong hệ thống.
        </p>

        <Table
          columns={columns}
          data={DATA}
          caption="Danh sách tài khoản"
          pageSize={6}
          selectable
          actions={[
            {
              label: "Thêm mới",
              icon: "+",
              variant: "primary",
              onClick: () => alert("Thêm người dùng"),
            },
            {
              label: "Xóa đã chọn",
              variant: "danger",
              onClick: (ids) => alert(`Xóa IDs: ${[...ids].join(", ")}`),
            },
          ]}
        />
      </div>
    </div>
  );
}