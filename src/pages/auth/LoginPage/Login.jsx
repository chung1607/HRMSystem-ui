import { useState } from "react";
import Button from "../../../components/ButtonComponent/ButtonComponent";
import InputField from "../../../components/InputFieldComponent/InputFieldComponent";

export default function LoginPage({ onSubmit }) {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
    else console.log(form);
  };

  return (
    <div className="min-h-[100dvh] bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-md p-5 sm:p-8">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
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
        <div className="mb-5">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            Đăng nhập
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Nhập thông tin để truy cập hệ thống
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <InputField
            label="Tên đăng nhập hoặc số điện thoại"
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            placeholder="vd: nguyenvana hoặc 0903..."
          />

          <InputField
            label="Mật khẩu"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
          />

          <div className="flex justify-end">
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          <Button type="submit" className="w-full py-3">
            Đăng nhập
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-5">
          Chưa có tài khoản?{" "}
          <a href="/register" className="font-semibold text-blue-600 hover:text-blue-700">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
}
