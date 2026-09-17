"use client";

import { useState, useEffect } from "react";

export default function ToDoForm({ addTask, editingTask, updateTask, resetEditingTask }: any) {
  const [title, setTitle] = useState('');
  // 💡 [สูตรโปร] เพิ่ม State มารับค่า Description
  const [desc, setDesc] = useState('');
  const [taskStatus, setTaskStatus] = useState(false);

  useEffect(() => {
    if (editingTask) {
      const { title, desc, status } = editingTask;
      setTitle(title);
      setDesc(desc || ''); // ดึงค่าเดิมมาแสดงตอนกด Edit
      setTaskStatus(status);
    } else {
      setTitle('');
      setDesc('');
      setTaskStatus(false);
    }
  }, [editingTask]);

  const handelSubmit = (e: any) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (editingTask)
      updateTask(editingTask.id, title, desc, taskStatus); // ส่ง desc ไปด้วย
    else
      addTask(title, desc, taskStatus); // ส่ง desc ไปด้วย

    // 💡 แก้บั๊กตรงนี้ ใส่ () ให้ฟังก์ชันทำงาน
    handleCancel();
  }

  const handleCancel = () => {
    setTitle('');
    setDesc('');
    setTaskStatus(false);
    resetEditingTask();
  }

  return (
    <form onSubmit={handelSubmit} className="w-full">
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-inner w-full">
        <h3 className="text-lg font-bold text-indigo-700 mb-4">{editingTask ? '📝 แก้ไขข้อมูล' : '✨ เพิ่มข้อมูลงานใหม่'}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700">รายการที่ต้องทำ (Title):</label>
            <input
              type="text"
              placeholder="ชื่องาน..."
              className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* 💡 [สูตรโปร] ช่องกรอกรายละเอียดเพิ่มเข้ามา */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700">รายละเอียด (Description):</label>
            <input
              type="text"
              placeholder="อธิบายรายละเอียดงานเพิ่มเติม..."
              className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
          <label className="text-sm font-semibold text-slate-700">สถานะเริ่มต้น:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100">
              <input type="radio" name="taskStatus" value='true' checked={taskStatus === true} onChange={() => setTaskStatus(true)} className="h-4 w-4 accent-indigo-600" />
              <span className="text-sm font-medium text-gray-700">Completed</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100">
              <input type="radio" name="taskStatus" value='false' checked={taskStatus === false} onChange={() => setTaskStatus(false)} className="h-4 w-4 accent-indigo-600" />
              <span className="text-sm font-medium text-gray-700">Pending</span>
            </label>
          </div>
        </div>

        <div className="flex mt-6 gap-3">
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition shadow">
            {editingTask ? 'บันทึกการแก้ไข' : 'เพิ่มลงรายการ'}
          </button>
          {editingTask && (
            <button type="button" className="bg-slate-500 hover:bg-slate-600 text-white font-medium px-6 py-2 rounded-lg transition shadow" onClick={handleCancel}>
              ยกเลิก
            </button>
          )}
        </div>
      </div>
    </form>
  );
}