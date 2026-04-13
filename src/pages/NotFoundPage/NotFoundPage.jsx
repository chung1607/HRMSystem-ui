import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        {/* Code 404 */}
        <h1 className="text-8xl font-extrabold text-blue-600">404</h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Trang không tồn tại
        </h2>

        {/* Description */}
        <p className="mt-2 text-gray-500">
          Đường dẫn bạn nhập không đúng hoặc đã bị xoá.
        </p>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            Về trang chủ
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 border border-gray-300 rounded-xl hover:bg-gray-200 transition"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
