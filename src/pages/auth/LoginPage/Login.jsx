import { useState } from "react";
import Button from "../../../components/ButtonComponent/ButtonComponent";
import InputField from "../../../components/InputFieldComponent/InputFieldComponent";
import { login } from "../../../services/authServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const isPhone = (value) => /^[0-9]+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // 🔥 transform data theo backend
      const payload = {
        password: form.password,
        ...(isPhone(form.identifier)
          ? { phone: form.identifier }
          : { username: form.identifier }),
      };

      const res = await login(payload);

      // console.log("Login success:", res.data);
      toast.success("Đăng nhập thành công!");

      // lưu token
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);

      navigate("/");
    } catch (err) {
      // console.error(err);

      const message = err.response?.data?.message || "Đăng nhập thất bại";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md min-w-[360px] bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm13 2v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2z" />
            </svg>
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900">HRM System</p>
            <p className="text-xs text-gray-500">
              Hệ thống quản lý doanh nghiệp
            </p>
          </div>
        </div>
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            Đăng nhập
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Nhập username hoặc số điện thoại
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2">
              {error}
            </div>
          )}

          <InputField
            label="Username hoặc SĐT"
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

          <Button
            type="submit"
            className={`w-full py-3 ${
              loading ? "bg-blue-400 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </div>
    </div>
  );
}
