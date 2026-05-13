// import { useEffect, useState } from "react";

// function Test() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:8000/hello")
//       .then((res) => res.json())
//       .then((data) => setData(data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h1>React + NestJS</h1>
//       <p>Data from backend: {JSON.stringify(data)}</p>
//     </div>
//   );
// }

// export default Test;

import { useState } from "react";

export default function Test() {
  const [date, setDate] = useState("");
  const [fresh, setFresh] = useState(0);
  const [burnt, setBurnt] = useState(0);

  const FRESH_PRICE = 1200;
  const BURNT_PRICE = 1000;

  const total =
    fresh * FRESH_PRICE +
    burnt * BURNT_PRICE;

  const handleSubmit = () => {
    const payload = {
      date,
      items: [
        { type: "fresh", quantity: fresh, price: FRESH_PRICE },
        { type: "burnt", quantity: burnt, price: BURNT_PRICE },
      ],
    };

    console.log(payload);
    alert("Đã lưu!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-5">

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4 text-center">
          Nhập sản lượng
        </h2>

        {/* Date */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Ngày</label>
          <input
            type="date"
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Fresh */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">
            Mía tươi (1.200đ)
          </label>
          <input
            type="text"
            className="w-full mt-1 p-3 border rounded-lg text-lg"
            value={fresh}
            onChange={(e) => setFresh(Number(e.target.value))}
          />
        </div>

        {/* Burnt */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">
            Mía cháy (1.000đ)
          </label>
          <input
            type="text"
            className="w-full mt-1 p-3 border rounded-lg text-lg"
            value={burnt}
            onChange={(e) => setBurnt(Number(e.target.value))}
          />
        </div>

        {/* Total */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tổng tiền</span>
            <span className="font-semibold text-lg text-green-600">
              {total.toLocaleString()} đ
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition active:scale-95"
        >
          Lưu
        </button>
      </div>
    </div>
  );
}


