"use client";

import Header from "../components/header";
import Footer from "../components/footer";
import { dataItem, appendItem } from "../data/dataitem";
import { Children, useState } from "react";
import ToDoForm from "./components/ToDoForm";
import Modal from "./components/Modal";

export default function ToDoList() {

  const toDolist = [...dataItem, ...appendItem];
  const [tasks, setTasks] = useState(toDolist);
  const [numOfTasks, setNoft] = useState(tasks.length);
  const [status, setStatus] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const resetEditingTask = () => setEditingTask(null);

<<<<<<< HEAD
  const filteredTasks =
    status == null ? tasks
      : tasks.filter(
        (item) => item.status == status
=======
    const isActive = (status: boolean) => {
        if(status)
       return <span style={{color: "green"}}>กำลังศึกษาอยู่</span>;
       return <span style={{color: "red"}}>ไม่ไดเป็นนักศึกษาแล้วนะ</span>;
    }

    
   const Status = (act: boolean) => {
        if(act)
       return <span style={{color: "green"}}>Completed</span>;
       return <span style={{color: "red"}}>ใช้ภายนอกและภายใน</span>;
    }

    const onEdit = (t) => {
      // alert(`งานที่คุณต้องการแก้ไข ${t}`);
      setEditingTask(t);
    }

    const updateTask = (id, title, status) => {
      setTasks(
        tasks => tasks.map(
          t => t.id === id ? 
           {...t,
           title: title,
           status: status
           } :t
        ));
        setEditingTask(null);
    }

    const onDelete = (id) => {
      // alert(`คุณต้องการลบข้อมูล รหัสงาน ${id}`);
      const updateTasks = tasks.filter(
        item => item.id !=id
>>>>>>> 0f596170d1870f3a1309399a3289fcea0882e3b5
      );

  let name = "Korntep Chomnanpoj";
  const major = "เทคโนโลยีสารสนเทศ (Information Technology)";
  let classyear = 2;
  let classSec = "ทส.ท.";
  let active = true;

  const isActive = (status: boolean) => {
    if (status)
      return <span style={{ color: "green" }}>กำลังศึกษาอยู่</span>;
    return <span style={{ color: "red" }}>ไม่ไดเป็นนักศึกษาแล้วนะ</span>;
  }


  const Status = (act: boolean) => {
    if (act)
      return <span style={{ color: "green" }}>Completed</span>;
    return <span style={{ color: "red" }}>Pending</span>;
  }

  const onEdit = (t) => {
    // alert(`งานที่คุณต้องการแก้ไข ${t}`);
    setEditingTask(t);
  }

  const updateTask = (id, title, status) => {
    setTasks(
      tasks => tasks.map(
        t => t.id === id ?
          {
            ...t,
            title: title,
            status: status
          } : t
      ));
    setEditingTask(null);
  }

  const onDelete = (id) => {
    // alert(`คุณต้องการลบข้อมูล รหัสงาน ${id}`);
    const updateTasks = tasks.filter(
      item => item.id != id
    );
    setTasks(updateTasks);
  }

  const tmpTdl = filteredTasks.map((item, index) => {
    const { id, title, desc, author, date_added, status } = item;
    return <ul key={id}>
      <div className="max w-86 mx-auto my-4 p-4 px-12 py-12 bg-white-600 text-black text-sm font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
        <h3 className="text-xl font-medium text-black">{title}</h3>
        <p className="text-slate-500 text-sm">{desc}</p>
        <p className="text-slate-500 text-sm">{author}</p>
        <p className="text-slate-500 text-sm">{Status(status)}</p>

        <Modal open={openId === id} onClose={() => setOpenId(null)}>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700 mb-2">รายละเอียด: {desc}</p>
            <p className="text-sm text-gray-500">ผู้เพิ่ม: {author}</p>
            <p className="text-sm text-gray-500">วันที่: {date_added}</p>
            <p className="text-sm text-gray-500">สถานะ: {Status(status)}</p>
          </div>
        </Modal>

        <div className="flex gap-2 mt-2">
          {/* View */}
          <button onClick={(e) => setOpenId(id)} className="bg-green-500 text-white px-3 py-1 rounded">View</button>

          {/* Edit */}
          <button onClick={(e) => onEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>

          {/* Delete */}
          <button onClick={(e) => onDelete(id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
        </div>
      </div>
    </ul>;
  });

  const addTask = (title, status) => {
    const newTask = {
      id: tasks.length + 1,
      title: title,
      desc: "รายละเอียดของงานที่เพิ่ม",
      date_added: "17/08/2569",
      author: "Korntep C.",
      status: status
    };

    setTasks([...tasks, newTask]);
    setNoft(tasks.length + 1);
  }

  console.log(`Name: ${name}`);
  console.log(`Major: ${major}`);

  return (
    <>

      <Header />
      <div className="flex justify-center gap-3">

        <a className="max w-md mx-auto my-12 p-12 px-4 py-3 bg-yellow-300 text-black text-sm font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
          <p className="font-bold text-xl mb-2">To Do Lists:</p>
          <p>
            ชื่อ-สกุล: {name} <br></br>
            สาขาวิชา: {major} <br></br>
            กลุ่มเรียน/ชั้นปี: {classSec} / {classyear} <br></br>
            สถานะภาพนักศึกษา: {isActive(active)} <br></br>
          </p>
        </a>
      </div>


      <div className="bg-slate-200/60 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 my-4">

        <div className="flex items-center gap-3"></div>
        <div>งานที่ต้องทำ {numOfTasks} รายการ</div>
        <div className="flex flex-wrap items-center justify-between gap-4 my-4">

          <ToDoForm
            addTask={addTask}
            editingTask={editingTask}
            updateTask={updateTask}
            resetEditingTask={resetEditingTask}
          />

          {/* <button className="bg-sky-700 hover:bg-sky-800 text-white px-4 py-2 rounded-lg transition font-medium" onClick={addTask}>เพิ่มงาน </button> */}
          <div className="flex items-center gap-2">
            <button className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg transition font-medium" onClick={() => setStatus(null)}>[A] All</button>
            <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg transition font-medium" onClick={() => setStatus(true)}>[C] Completed</button>
            <button className="bg-rose-700 hover:bg-rose-800 text-white px-4 py-2 rounded-lg transition font-medium" onClick={() => setStatus(false)}>[P] Pending</button>
          </div>
        </div>
      </div>
      <div className="space-y-3 flex justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tmpTdl}
      </div>
      <Footer />
    </>

  );
}