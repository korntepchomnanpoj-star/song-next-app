import Header from "../components/header";
import Footer from "../components/footer";
import { toDoList } from "../data/toDoList";

export default function ToDoList(){
    
    let name = "Korntep Chomnanpoj";
    const major = "เทคโนโลยีสารสนเทศ (Information Technology)";
    let classyear = 2;
    let classSec = "ทส.ท.";
    let active = true;

    const isActive = (act: boolean) => {
        if(act)
       return <span style={{color: "green"}}>กำลังศึกษาอยู่</span>;
       return <span style={{color: "red"}}>ไม่ไดเป็นนักศึกษาแล้วนะ</span>;
    }

    const tmpTdl = toDoList.map(item =>
        <ul>
        <div className="px-3 py-2 bg-white-600 text-black text-sm font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
      <h3 className="text-xl font-medium text-black">{item.title}</h3>
      <p className="text-slate-500 text-sm">{item.desc}</p>
      <p className="text-slate-500 text-sm">{item.author}</p>
      <p className="text-slate-500 text-sm">{item.status}</p>
    </div>
        </ul>
    );
    
    console.log(`Name: ${name}`);
    console.log(`Major: ${major}`);

    return(
        <>
        
        <Header/>
        <div className= "flex justify-center gap-3">
            
    <a className="px-3 py-2 bg-yellow-300 text-black text-sm font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
      <p className="font-bold text-xl mb-2">To Do Lists:</p>
      <p>
        ชื่อ-สกุล: {name} <br></br> 
        สาขาวิชา: {major} <br></br>
        กลุ่มเรียน/ชั้นปี: {classSec} / {classyear} <br></br>
        สถานะภาพนักศึกษา: {isActive(active)} <br></br>
      </p>
      </a>
      </div>

      <div className= "flex justify-center gap-3">
        {tmpTdl}
      </div>
      <Footer/>
      </>
      
    );
}