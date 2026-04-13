import { useRef, useState, useEffect } from "react";
import Button from "../../../components/ButtonComponent/ButtonComponent";
import { verifyOtp } from "../../../services/authServices";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

export default function OtpVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  const phone = location.state?.phone;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length < 6) {
      return toast.error("Vui lòng nhập đủ OTP");
    }

    try {
      await verifyOtp({
        phone,
        otp: code,
      });

      toast.success("Xác thực thành công!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      const message = err.response?.data?.message || "OTP không hợp lệ";

      toast.error(message);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md min-w-[360px] bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Xác thực OTP</h1>
          <p className="text-sm text-gray-500 mt-1">Nhập mã gửi tới {phone}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => (inputsRef.current[index] = el)}
                value={digit || ""}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center border border-gray-300 rounded-lg"
              />
            ))}
          </div>

          <Button type="submit" className="w-full py-3 bg-blue-600 text-white">
            Xác nhận
          </Button>
        </form>
      </div>
    </div>
  );
}
