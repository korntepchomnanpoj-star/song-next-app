export default function HeaderTest02() {
  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 flex justify-between h-10 items-center">
        <a href="test02" className="text-2xl font-bold text-red-600">Web Programing</a>

        <div className="hidden md:flex items-center gap-6 text-slate-600">
          <a href="pageX2" className="hover:text-green-600 transition">หน้าแรก</a>
          <a href="/contact" className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition">ติดต่อเรา</a>
        </div>
      </nav>
    </header>
  );
}