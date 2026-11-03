"use client";

/* รหัสนักศึกษา: 0268304970109-9 ชื่อ-สกุล: นาย กรเทพ ชำนาญพจน์ */

export default function MyHomePage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">
        ข้อมูลส่วนตัวนักศึกษา (MyHomePage)
      </h2>
      <div className="space-y-4 text-base md:text-lg">
        <p>
          <strong className="text-gray-700">ชื่อ-สกุล:</strong>{" "}
          <span className="text-blue-600 font-medium">นาย กรเทพ ชำนาญพจน์</span>
        </p>
        <p>
          <strong className="text-gray-700">รหัสนักศึกษา:</strong>{" "}
          <span className="text-blue-600 font-medium">0268304970109-9</span>
        </p>
        <p>
          <strong className="text-gray-700">อีเมล:</strong>{" "}
          <span className="text-blue-600 font-medium">korntepchomnanpoj@gmail.com</span>
        </p>
        <p>
          <strong className="text-gray-700">ช่องทางติดต่ออื่นๆ:</strong>{" "}
          <span className="text-blue-600 font-medium">0657752007</span>
        </p>
      </div>
    </div>
  );
}