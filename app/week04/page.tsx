"use client";

import Header from "../components/header";
import Footer from "../components/footer";
import { dataItem, appendItem } from "../data/dataitem";
import { useState } from "react";

export default function ToDoList(){
    
    const toDolist = [...dataItem, ...appendItem];
    const [tasks, setTasks] = useState(toDolist);
    const [numOfTasks, setNoft] = useState(tasks.length);
    const [status, setStatus] = useState(null);

    const filteredTasks = 
          status == null ? tasks 
          :tasks.filter(
            (item) => item.status == status
        ); 
 
    let name = "Korntep Chomnanpoj";
    const major = "เทคโนโลยีสารสนเทศ (Information Technology)";
    let classyear = 2;
    let classSec = "ทส.ท.";
    let active = true;

    const isActive = (status: boolean) => {
        if(status)
       return <span style={{color: "green"}}>กำลังศึกษาอยู่</span>;
       return <span style={{color: "red"}}>ไม่ไดเป็นนักศึกษาแล้วนะ</span>;
    }

    
   const Status = (act: boolean) => {
        if(act)
       return <span style={{color: "green"}}>Completed</span>;
       return <span style={{color: "red"}}>Pending</span>;
    }
    const tmpTdl = filteredTasks.map((item,index) => { 
        const {id, title, desc, author, date_added, status } = item;
        return <ul key={id}>
        <div className="max w-86 mx-auto my-4 p-4 px-12 py-12 bg-white-600 text-black text-sm font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
      <h3 className="text-xl font-medium text-black">{title}</h3>
      <p className="text-slate-500 text-sm">{desc}</p>
      <p className="text-slate-500 text-sm">{author}</p>
      <p className="text-slate-500 text-sm">{Status(status)}</p>
    </div>
        </ul>;
});

    const addTask = () => {
        const newTask = {
        id: tasks.length+1,
        title: "่ทดสอบเพิ่มงาน",
        desc: "รายละเอียดของงานที่เพิ่ม",
        date_added: "13/08/2569",
        author: "Korntep C.",
        status: true
        };

        setTasks([...tasks, newTask]);
        setNoft(tasks.length+1);
    }
    
    console.log(`Name: ${name}`);
    console.log(`Major: ${major}`);

    return(
        <>
        
        <Header/>
        <div className= "flex justify-center gap-3">
            
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
          <button className="bg-sky-700 hover:bg-sky-800 text-white px-4 py-2 rounded-lg transition font-medium" onClick={addTask}>เพิ่มงาน </button>
        <div className="flex items-center gap-2">
            <button className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg transition font-medium"  onClick={() => setStatus(null)}>[A] All</button>
            <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg transition font-medium"  onClick={() => setStatus(true)}>[C] Completed</button>
            <button className="bg-rose-700 hover:bg-rose-800 text-white px-4 py-2 rounded-lg transition font-medium"  onClick={() => setStatus(false)}>[P] Pending</button>
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