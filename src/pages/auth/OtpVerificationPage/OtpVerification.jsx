import { useRef, useState } from "react";
import Button from "../../../components/ButtonComponent/ButtonComponent";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

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

      // nếu ô hiện tại có số → xoá số
      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      }
      // nếu ô rỗng → move về ô trước
      else if (index > 0) {
        inputsRef.current[index - 1]?.focus();

        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);

    // focus ô cuối
    setTimeout(() => {
      inputsRef.current[newOtp.length - 1]?.focus();
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    console.log("OTP:", code);
  };

  return (
    <div className="min-h-[100dvh] bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md min-w-[360px] bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Xác thực OTP</h1>
          <p className="text-sm text-gray-500 mt-1">
            Nhập mã 6 số được gửi tới số điện thoại của bạn
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* OTP Input */}
          <div className="flex justify-between gap-2" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => (inputsRef.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {/* Verify Button */}
          <Button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700"
          >
            Xác nhận
          </Button>

          {/* Resend */}
          <div className="text-center text-sm text-gray-500">
            Chưa nhận được mã?{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline font-medium"
            >
              Gửi lại
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
