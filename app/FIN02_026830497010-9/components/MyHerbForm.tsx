"use client";

import { useState } from "react";

/* รหัสนักศึกษา: 0268304970109-9 ชื่อ-สกุล: นาย กรเทพ ชำนาญพจน์ */

// โครงสร้างข้อมูลสมุนไพร
export interface HerbItem {
  id?: number;
  name: string;
  image: string | null;
  description: string;
  properties: string;
  usage: string;
  manufacturer: string;
  type: string;
  contact: string;
}

interface MyHerbFormProps {
  onSave: (herb: HerbItem) => void;
}

export default function MyHerbForm({ onSave }: MyHerbFormProps) {
  // ค่าเริ่มต้นของฟอร์ม (โจทย์ 3.2: การนำไปใช้ กำหนดให้เลือกประเภททั้งภายในและภายนอกเป็นค่าเริ่มต้น)
  const initialForm: HerbItem = {
    name: "",
    image: null,
    description: "",
    properties: "",
    usage: "ยาใช้ทั้งภายในและภายนอก",
    manufacturer: "",
    type: "",
    contact: "",
  };

  const [formData, setFormData] = useState<HerbItem>(initialForm);

  // จัดการอัปโหลดไฟล์ภาพจากเครื่อง
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  // จัดการเมื่อกดปุ่มบันทึก
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation ตรวจสอบข้อมูลตามข้อ 3.2
    if (!formData.name.trim()) {
      alert("กรุณาระบุชื่อยาสมุนไพร");
      return;
    }
    if (!formData.properties.trim()) {
      alert("กรุณาระบุสรรพคุณยาสมุนไพร");
      return;
    }
    if (!formData.manufacturer.trim()) {
      alert("กรุณาระบุชื่อผู้ผลิต");
      return;
    }
    if (!formData.contact.trim()) {
      alert("กรุณาระบุข้อมูลติดต่อผู้ผลิต");
      return;
    }

    // ส่งข้อมูลกลับไปบันทึก
    onSave({ ...formData, id: Date.now() });
    setFormData(initialForm);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border max-w-5xl mx-auto text-black">
      <h2 className="text-xl font-bold mb-6 text-gray-800">เพิ่มข้อมูลยาสมุนไพร:</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* คอลัมน์ซ้าย */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                ชื่อยาสมุนไพร*:
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                รายละเอียด:
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                การนำไปใช้:
              </label>
              <div className="flex flex-wrap gap-4 items-center text-xs">
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="usage"
                    value="ยาใช้ภายใน"
                    checked={formData.usage === "ยาใช้ภายใน"}
                    onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                  />
                  ยาใช้ภายใน
                </label>
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="usage"
                    value="ยาใช้ภายนอก"
                    checked={formData.usage === "ยาใช้ภายนอก"}
                    onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                  />
                  ยาใช้ภายนอก
                </label>
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="usage"
                    value="ยาใช้ทั้งภายในและภายนอก"
                    checked={formData.usage === "ยาใช้ทั้งภายในและภายนอก"}
                    onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                  />
                  ยาใช้ทั้งภายในและภายนอก
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 mt-3">
                ประเภทสมุนไพร:
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="">เลือก</option>
                <option value="หัว">หัว</option>
                <option value="ดอก">ดอก</option>
                <option value="ใบ">ใบ</option>
                <option value="ราก">ราก</option>
              </select>
            </div>
          </div>

          {/* คอลัมน์ขวา */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                ภาพตัวอย่าง*:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-2 h-20 w-auto object-cover rounded border"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                สรรพคุณ*:
              </label>
              <textarea
                rows={3}
                value={formData.properties}
                onChange={(e) => setFormData({ ...formData, properties: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                ผู้ผลิต*:
              </label>
              <input
                type="text"
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                ติดต่อผู้ผลิต*:
              </label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* แถบปุ่มด้านล่าง */}
        <div className="mt-8 flex justify-end items-center gap-3">
          <span className="text-xs text-gray-500">*กรุณากรอกข้อมูลให้สมบูรณ์</span>
          <button
            type="submit"
            className="bg-[#2b6cb0] hover:bg-blue-700 text-white text-xs px-5 py-2 rounded shadow transition"
          >
            บันทึก
          </button>
          <button
            type="button"
            onClick={() => setFormData(initialForm)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs px-5 py-2 rounded shadow transition"
          >
            เคลียร์
          </button>
        </div>
      </form>
    </div>
  );
}