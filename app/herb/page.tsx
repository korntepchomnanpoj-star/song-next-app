"use client";

import Header from "../components/header";
import Footer from "../components/footer";
import { dataHerb } from "../data2/dataherb";
import { Children, useState } from "react";
import HerbForm from "./components/HerbForm";
import Modal from "./components/Modal";

export default function ToDoList(){
    
    const toDolist = [...dataHerb];
    const [tasks, setTasks] = useState(toDolist);
    const [numOfTasks, setNoft] = useState(tasks.length);
    const [status, setStatus] = useState(null);
    const [openId, setOpenId] = useState(null);
    const [editingTask, setEditingTask] = useState(null);

    const resetEditingTask = () => setEditingTask(null);

    const filteredTasks = 
          status == null ? tasks 
          :tasks.filter(
            (item) => item.status == status
        );
    
   const Status = (act: boolean) => {
        if(act)
       return <span style={{color: "green"}}>ใช้ภายนอก</span>;
       return <span style={{color: "red"}}>ใช้ภายในและภายนอก</span>;
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
      );
      setTasks(updateTasks);
    }

    const tmpTdl = filteredTasks.map((item,index) => { 
        const {id, title, desc, suppiler, status } = item;
        return <ul key={id}>
        <div className="max w-86 mx-auto my-4 p-4 px-12 py-12 bg-white-600 text-black text-sm font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
      <h3 className="text-xl font-medium text-black">{title}</h3>
      <p className="text-slate-500 text-sm">{desc}</p>
      <p className="text-slate-500 text-sm">{suppiler}</p>
      <p className="text-slate-500 text-sm">{Status(status)}</p>

      <Modal open={openId === id} onClose={()=>setOpenId(null)}>
      <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-2">รายละเอียด: {desc}</p>
      <p className="text-sm text-gray-500">ผู้ผลิต: {suppiler}</p>
      <p className="text-sm text-gray-500">สถานะ: {Status(status)}</p>
      </div>
      </Modal>

      <div className="flex gap-2 mt-2">

    {/* Delete */}
    <button onClick={(e)=>onDelete(id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
     </div>
    </div>
        </ul>;
});

    const addTask = (title, status, desc, suppiler) => {
        const newTask = {
        id: tasks.length+1,
        title: title,
        desc: desc,
        suppiler: suppiler,
        status: status
        };

        setTasks([...tasks, newTask]);
        setNoft(tasks.length+1);
    }

    return(
        <>
        
        <Header/>
        <div className= "flex justify-center gap-3">

            
            
   
      </div>

       
      <div className="bg-slate-200/60 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 my-4">

        <div className="flex flex-wrap items-center justify-between gap-4 my-4">
          
          <HerbForm
          addTask={addTask}
          editingTask={editingTask}
          updateTask={updateTask}
          resetEditingTask={resetEditingTask} 
          />

          {/* <button className="bg-sky-700 hover:bg-sky-800 text-white px-4 py-2 rounded-lg transition font-medium" onClick={addTask}>เพิ่มงาน </button> */}
        <div className="flex items-center gap-2">
            <button className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg transition font-medium"  onClick={() => setStatus(null)}>All</button>
            <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg transition font-medium"  onClick={() => setStatus(true)}>ใช้ภายใน</button>
            <button className="bg-rose-700 hover:bg-rose-800 text-white px-4 py-2 rounded-lg transition font-medium"  onClick={() => setStatus(false)}>ใช้ภายนอกและภายใน</button>
            </div>
        </div>
      </div>
      <div className="space-y-3 flex justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tmpTdl}
      </div>
      <Footer/>
      </>
      
    );
}