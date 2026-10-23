import HeaderTest02 from "../test02/components/HeaderTest02";
import FooterTest02 from "../test02/components/FooterTest02";

export default function MyPage() {
  return (
    <>
      <HeaderTest02/>
      <section className="relative bg-cover bg-center h-screen flex items-center justify-center text-center" style={{ backgroundImage: `url('/images/tree_clear.jpg')` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 p-4 text-white">
          <h1 className="text-5xl font-extrabold mb-4">Xxx Cover</h1>
          <p className="text-lg mb-8">Xxx</p>
          <a href="test02" className="bg-indigo-600 px-6 py-3 rounded-lg">Let's Go...</a>
        </div>
      </section>
      <FooterTest02/>
    </>
  );
}