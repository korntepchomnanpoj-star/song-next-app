"use client";

import { useState } from "react";

// 1. สร้าง Interface กำหนดโครงสร้างข้อมูล เพื่อแก้ปัญหาเส้นแดงของ TypeScript
interface Herb {
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

export default function ExamPage() {
  // สร้าง State จัดการหน้าจอ ('home', 'form', 'detail', 'list')
  const [currentView, setCurrentView] = useState<string>("home");
  
  // 2. ระบุ Type ให้กับ State จำลองฐานข้อมูล
  const [herbs, setHerbs] = useState<Herb[]>([]);
  const [currentViewHerb, setCurrentViewHerb] = useState<Herb | null>(null); // ไว้แสดงข้อมูลหลังกดบันทึก

  // State สำหรับฟอร์ม
  const initialForm: Herb = {
    name: "",
    image: null,
    description: "",
    properties: "",
    usage: "ยาใช้ทั้งภายในและภายนอก", // ค่าเริ่มต้นตามโจทย์
    manufacturer: "",
    type: "",
    contact: "",
  };
  const [formData, setFormData] = useState<Herb>(initialForm);

  // จัดการการอัพโหลดรูปภาพ (ระบุ Type event)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  // จัดการเมื่อกดปุ่มบันทึก (ระบุ Type event)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation (บังคับกรอกตามโจทย์)
    if (!formData.name || !formData.properties || !formData.manufacturer || !formData.contact) {
      alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน (*)");
      return;
    }

    const newHerb: Herb = { ...formData, id: Date.now() };
    
    // บันทึกลง State (แทน Firebase)
    setHerbs([...herbs, newHerb]);
    
    // เซ็ตข้อมูลเพื่อไปแสดงหน้า Detail (ข้อ 4.1)
    setCurrentViewHerb(newHerb);
    setFormData(initialForm); // ล้างฟอร์ม
    setCurrentView("detail"); // เปลี่ยนหน้าไปแสดงรายละเอียด
  };

  // จัดการลบข้อมูล (ระบุ Type id)
  const handleDelete = (id?: number) => {
    if (confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?")) {
      setHerbs(herbs.filter((herb) => herb.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* แถบเมนูด้านบน */}
      <nav className="bg-[#2a2a2a] text-gray-300 text-sm py-3 px-6 flex gap-6">
        <span className="font-bold text-white">ร้านยาสมุนไพร</span>
        <button className="hover:text-white" onClick={() => setCurrentView("home")}>หน้าแรก</button>
        <button className="hover:text-white" onClick={() => setCurrentView("form")}>เพิ่มยาสมุนไพร</button>
        <button className="hover:text-white" onClick={() => setCurrentView("list")}>ข้อมูลยาสมุนไพร</button>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        
        {/* หน้าแรก: ข้อมูลนักศึกษา */}
        {currentView === "home" && (
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">ข้อมูลส่วนตัวนักศึกษา (MyHomePage)</h2>
            <div className="space-y-3 text-lg">
              <p><strong>ชื่อ-สกุล:</strong> <span className="text-blue-600">กรเทพ ชำนาญพจน์</span></p>
              <p><strong>รหัสนักศึกษา:</strong> <span className="text-blue-600">0268304970109-9</span></p>
              <p><strong>อีเมล:</strong> <span className="text-blue-600">korntepchomnanpoj@gmail.com</span></p>
              <p><strong>ช่องทางติดต่ออื่นๆ:</strong> <span className="text-blue-600">0657752007</span></p>
            </div>
          </div>
        )}

        {/* หน้าฟอร์มเพิ่มข้อมูล */}
        {currentView === "form" && (
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-6">เพิ่มข้อมูลยาสมุนไพร:</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                {/* คอลัมน์ซ้าย */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">ชื่อยาสมุนไพร*:</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">รายละเอียด:</label>
                    <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full border rounded p-2"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">การนำไปใช้:</label>
                    <div className="flex gap-4 items-center mt-2 text-sm">
                      <label><input type="radio" name="usage" value="ยาใช้ภายใน" checked={formData.usage === "ยาใช้ภายใน"} onChange={(e) => setFormData({ ...formData, usage: e.target.value })} className="mr-1" /> ยาใช้ภายใน</label>
                      <label><input type="radio" name="usage" value="ยาใช้ภายนอก" checked={formData.usage === "ยาใช้ภายนอก"} onChange={(e) => setFormData({ ...formData, usage: e.target.value })} className="mr-1" /> ยาใช้ภายนอก</label>
                      <label><input type="radio" name="usage" value="ยาใช้ทั้งภายในและภายนอก" checked={formData.usage === "ยาใช้ทั้งภายในและภายนอก"} onChange={(e) => setFormData({ ...formData, usage: e.target.value })} className="mr-1" /> ยาใช้ทั้งภายในและภายนอก</label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 mt-3">ประเภทสมุนไพร:</label>
                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full border rounded p-2">
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
                    <label className="block text-sm font-medium mb-1">ภาพตัวอย่าง (อัพโหลดไฟล์):</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border rounded p-1" />
                    {formData.image && <img src={formData.image} alt="preview" className="mt-2 h-20 object-cover rounded" />}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">สรรพคุณ*:</label>
                    <textarea required rows={3} value={formData.properties} onChange={(e) => setFormData({ ...formData, properties: e.target.value })} className="w-full border rounded p-2"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">ผู้ผลิต*:</label>
                    <input type="text" required value={formData.manufacturer} onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })} className="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">ติดต่อผู้ผลิต*:</label>
                    <input type="text" required value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} className="w-full border rounded p-2" />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end items-center gap-4">
                <span className="text-xs text-gray-500">*กรุณากรอกข้อมูลให้สมบูรณ์</span>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700">บันทึก</button>
                <button type="button" onClick={() => setFormData(initialForm)} className="bg-gray-200 px-6 py-2 rounded shadow hover:bg-gray-300">เคลียร์</button>
              </div>
            </form>
          </div>
        )}

        {/* หน้าแสดงรายละเอียดหลังกดบันทึก */}
        {currentView === "detail" && currentViewHerb && (
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-6">ข้อมูลยาสมุนไพร:</h2>
            <div className="grid grid-cols-4 gap-4 text-sm mb-6 border-b pb-6">
              <div className="col-span-1 font-bold">ชื่อยาสมุนไพร:</div>
              <div className="col-span-1">{currentViewHerb.name}</div>
              <div className="col-span-1 font-bold">ภาพตัวอย่าง:</div>
              <div className="col-span-1">
                {currentViewHerb.image ? (
                   <img src={currentViewHerb.image} alt={currentViewHerb.name} className="w-full h-auto rounded" />
                ) : (
                   <div className="bg-gray-200 p-4 text-center text-gray-500 rounded">ไม่มีรูปภาพ</div>
                )}
              </div>

              <div className="col-span-1 font-bold mt-4">รายละเอียด:</div>
              <div className="col-span-1 mt-4">{currentViewHerb.description || "-"}</div>
              <div className="col-span-1 font-bold mt-4">สรรพคุณ:</div>
              <div className="col-span-1 mt-4">{currentViewHerb.properties}</div>

              <div className="col-span-1 font-bold mt-4">การนำไปใช้:</div>
              <div className="col-span-1 mt-4">{currentViewHerb.usage}</div>
              <div className="col-span-1 font-bold mt-4">ผู้ผลิต:</div>
              <div className="col-span-1 mt-4">{currentViewHerb.manufacturer}</div>

              <div className="col-span-1 font-bold mt-4">ประเภทสมุนไพร:</div>
              <div className="col-span-1 mt-4">{currentViewHerb.type || "-"}</div>
              <div className="col-span-1 font-bold mt-4">ติดต่อผู้ผลิต:</div>
              <div className="col-span-1 mt-4">{currentViewHerb.contact}</div>
            </div>
            <button onClick={() => setCurrentView("list")} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              ย้อนกลับ
            </button>
          </div>
        )}

        {/* หน้าแสดงตารางข้อมูลทั้งหมด */}
        {currentView === "list" && (
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-2">ข้อมูลยาสมุนไพร:</h2>
            <p className="text-sm text-gray-500 mb-4">จำนวน {herbs.length} รายการ</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="py-3 px-2">ชื่อสมุนไพร</th>
                    <th className="py-3 px-2 w-1/4">สรรพคุณ</th>
                    <th className="py-3 px-2">การนำไปใช้</th>
                    <th className="py-3 px-2">ประเภท</th>
                    <th className="py-3 px-2">ผู้ผลิต</th>
                    <th className="py-3 px-2">ติดต่อผู้ผลิต</th>
                    <th className="py-3 px-2">ภาพตัวอย่าง</th>
                    <th className="py-3 px-2">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {herbs.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-gray-400">ยังไม่มีข้อมูลสมุนไพร</td>
                    </tr>
                  ) : (
                    herbs.map((herb) => (
                      <tr key={herb.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-2 font-medium">{herb.name}</td>
                        <td className="py-3 px-2">{herb.properties}</td>
                        <td className="py-3 px-2">{herb.usage}</td>
                        <td className="py-3 px-2">{herb.type || "-"}</td>
                        <td className="py-3 px-2">{herb.manufacturer}</td>
                        <td className="py-3 px-2">{herb.contact}</td>
                        <td className="py-3 px-2">
                          {herb.image ? (
                            <img src={herb.image} alt={herb.name} className="w-16 h-12 object-cover rounded" />
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="py-3 px-2">
                          <button onClick={() => handleDelete(herb.id)} className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">
                            ลบ
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}