"use client";

import HeaderTest02 from "./components/HeaderTest02";
import FooterTest02 from "./components/FooterTest02";
import { dataItem, appendItem } from "../data/dataitem";
import { useState } from "react";
import ToDoForm from "./components/ToDoForm";
import Modal from "./components/Modal";

export default function ToDoList() {
  const toDolist = [...dataItem, ...appendItem];
  const [tasks, setTasks] = useState(toDolist);
  const [numOfTasks, setNoft] = useState(tasks.length);
  const [status, setStatus] = useState<boolean | null>(null);
  const [openId, setOpenId] = useState(null);
  const [editingTask, setEditingTask] = useState<any>(null);

  // 💡 [สูตรโปร] State สำหรับช่องค้นหาข้อความ
  const [searchQuery, setSearchQuery] = useState("");

  const resetEditingTask = () => setEditingTask(null);

  // 💡 [สูตรโปร] อัปเกรด Filter ให้เช็คทั้งสถานะและการค้นหาชื่อ
  const filteredTasks = tasks.filter((item) => {
    const matchStatus = status == null ? true : item.status == status;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  let name = "Korntep Chomnanpoj";
  const major = "เทคโนโลยีสารสนเทศ (Information Technology)";
  let classyear = 2;
  let classSec = "ทส.ท.";
  let active = true;

  const isActive = (status: boolean) => {
    if (status) return <span style={{ color: "green" }}>กำลังศึกษาอยู่</span>;
    return <span style={{ color: "red" }}>ไม่ได้เป็นนักศึกษาแล้วนะ</span>;
  }

  const Status = (act: boolean) => {
    if (act) return <span style={{ color: "green", fontWeight: "bold" }}>Completed</span>;
    return <span style={{ color: "red", fontWeight: "bold" }}>Pending</span>;
  }

  const onEdit = (t: any) => {
    setEditingTask(t);
  }

  // 💡 [สูตรโปร] เพิ่มพารามิเตอร์ desc มารับค่าไปอัปเดต
  const updateTask = (id: any, title: string, desc: string, status: boolean) => {
    setTasks(
      tasks => tasks.map(
        t => t.id === id ? { ...t, title: title, desc: desc, status: status } : t
      )
    );
    setEditingTask(null);
  }

  const onDelete = (id: any) => {
    const updateTasks = tasks.filter(item => item.id != id);
    setTasks(updateTasks);
    setNoft(updateTasks.length); // อัปเดตจำนวนเมื่อลบ
  }

  const tmpTdl = filteredTasks.map((item, index) => {
    const { id, title, desc, author, date_added, status } = item;
    return (
      <div key={id} className="max-w-sm mx-auto w-full my-4 p-6 bg-white border border-gray-200 text-black text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition">
        <h3 className="text-xl font-bold text-black mb-1">{title}</h3>
        <p className="text-slate-500 text-sm mb-1">{desc}</p>
        <p className="text-slate-400 text-xs mb-3">ผู้เพิ่ม: {author}</p>
        <p className="text-slate-500 text-sm mb-4">สถานะ: {Status(status)}</p>

        <Modal open={openId === id} onClose={() => setOpenId(null)}>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700 mb-2">รายละเอียด: {desc}</p>
            <p className="text-sm text-gray-500">ผู้เพิ่ม: {author}</p>
            <p className="text-sm text-gray-500">วันที่: {date_added}</p>
            <p className="text-sm text-gray-500 mt-2">สถานะ: {Status(status)}</p>
          </div>
        </Modal>

        <div className="flex gap-2 mt-2 pt-4 border-t border-gray-100">
          <button onClick={() => setOpenId(id)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">View</button>
          <button onClick={() => onEdit(item)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
          <button onClick={() => onDelete(id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
        </div>
      </div>
    );
  });

  // 💡 [สูตรโปร] รับค่า desc จากฟอร์มแทนการ Hardcode
  const addTask = (title: string, desc: string, status: boolean) => {
    const newTask = {
      id: Date.now(), // ใช้ Date.now() เป็น ID เพื่อป้องกัน ID ซ้ำตอนลบแล้วเพิ่มใหม่
      title: title,
      desc: desc || "ไม่มีรายละเอียด",
      date_added: new Date().toLocaleDateString('th-TH'),
      author: name,
      status: status
    };

    setTasks([...tasks, newTask]);
    setNoft(tasks.length + 1);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <HeaderTest02 />

      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-3">
          <div className="max-w-md mx-auto w-full my-8 p-6 bg-yellow-100 text-black text-sm font-semibold rounded-lg shadow-sm border border-yellow-300">
            <p className="font-bold text-xl mb-3 text-yellow-800">🧑‍🎓 ข้อมูลนักศึกษา:</p>
            <div className="space-y-1">
              <p>ชื่อ-สกุล: {name}</p>
              <p>สาขาวิชา: {major}</p>
              <p>กลุ่มเรียน/ชั้นปี: {classSec} / {classyear}</p>
              <p>สถานะภาพนักศึกษา: {isActive(active)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-xl flex flex-col gap-4 my-4 shadow-sm">
          <div className="flex justify-between items-center w-full">
            <div className="font-bold text-lg text-slate-700">📌 งานที่ต้องทำ {numOfTasks} รายการ</div>

            <div className="flex gap-2">
              <button className={`px-4 py-2 rounded-lg transition font-medium ${status === null ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`} onClick={() => setStatus(null)}>[A] All</button>
              <button className={`px-4 py-2 rounded-lg transition font-medium ${status === true ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`} onClick={() => setStatus(true)}>[C] Completed</button>
              <button className={`px-4 py-2 rounded-lg transition font-medium ${status === false ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'}`} onClick={() => setStatus(false)}>[P] Pending</button>
            </div>
          </div>

          {/* 💡 [สูตรโปร] ช่องค้นหา */}
          <div className="w-full mt-2 mb-4">
            <input
              type="text"
              placeholder="🔍 ค้นหางานด้วยชื่อ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/2 p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <ToDoForm
            addTask={addTask}
            editingTask={editingTask}
            updateTask={updateTask}
            resetEditingTask={resetEditingTask}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-6">
          {tmpTdl.length > 0 ? tmpTdl : (
            <div className="col-span-full text-center py-10 text-slate-400">ไม่มีรายการที่ตรงกับเงื่อนไข</div>
          )}
        </div>
      </div>
      <FooterTest02 />
    </div>
  );
}