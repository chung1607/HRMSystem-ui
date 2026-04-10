import { useState } from "react";
import Button from "../../../components/ButtonComponent/ButtonComponent";
import InputField from "../../../components/InputFieldComponent/InputFieldComponent";

export default function RegisterPage({ onSubmit }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 chỉ emit data ra ngoài (không validate, không fake API)
    if (onSubmit) {
      onSubmit(form);
    } else {
      console.log("Form data:", form);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-lg p-8">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-7">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm13 2v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2z" />
            </svg>
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900">QuanLy Pro</p>
            <p className="text-xs text-gray-500">Hệ thống quản lý doanh nghiệp</p>
          </div>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Tạo tài khoản</h1>
          <p className="text-sm text-gray-500 mt-1">
            Điền thông tin bên dưới để đăng ký sử dụng hệ thống
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <InputField
            label="Tên đăng nhập"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="vd: nguyen.van.a"
          />

          <InputField
            label="Mật khẩu"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Tối thiểu 8 ký tự"
          />

          <InputField
            label="Số điện thoại"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="0903 456 789"
          />

          <Button type="submit" className="w-full">
            Đăng ký tài khoản
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Bằng cách đăng ký, bạn đồng ý với{" "}
            <a href="/terms" className="text-blue-600 hover:underline">
              Điều khoản sử dụng
            </a>{" "}
            và{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Chính sách bảo mật
            </a>.
          </p>
        </form>

        <p className="text-sm text-center text-gray-500 mt-5">
          Đã có tài khoản?{" "}
          <a href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
            Đăng nhập ngay
          </a>
        </p>
      </div>
    </div>
  );
}
