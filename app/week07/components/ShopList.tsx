"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import UserProfile from "./UserProfile";
import LogoutButton from "./Logout";
import LoginButton from "./Login";

export default function ShopList({ data }) {
    let storedUser = "";
    if (typeof window !== 'undefined') {
        storedUser = localStorage.getItem("user");
    }

    const [keyword, setKeyword] = useState("");
    const filterShops = data.filter((item) => {
        const searchText = keyword.toLowerCase();
        return item.shopName.toLowerCase().includes(searchText)
    });

    const Status = (sta) => {
        if (sta) {
            return <span className="text-green-600 font-semibold">TRUE</span>;
        } else {
            return <span className="text-red-600 font-semibold">FALSE</span>;
        }
    };

    const router = useRouter();

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this shop?");
        if (!confirmed) return;

        try {
            const response = await fetch(
                `http://localhost:8000/api/shops/${id}`,
                { method: "DELETE" }
            );

            if (!response.ok) {
                throw new Error("Failed to delete Shop");
            }
            router.refresh();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search shop..."
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4 text-gray-600">Found {data.length} shop(s)</div>

            {/* ส่วนที่แก้ไข: จัดกลุ่มปุ่ม Add New และจัดการสถานะ Login/Logout แบบมีกรอบสวยงาม */}
            <div className="flex justify-between items-center mb-6">
                <Link href="/week07/new" className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-green-700 transition">
                    + Add New
                </Link>
                
                <div>
                    {storedUser ? (
                        /* กรอบ Profile */
                        <div className="flex items-center gap-3 border border-gray-200 rounded-full p-1 pr-3 bg-white shadow-sm">
                            
                            {/* รูป Avatar (SVG) */}
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>

                            {/* ข้อความ Welcome จาก UserProfile */}
                            <div className="text-gray-700 font-medium text-sm">
                                <UserProfile />
                            </div>

                            {/* เส้นคั่นและปุ่ม Logout */}
                            <div className="border-l border-gray-300 pl-3 ml-1">
                                <LogoutButton />
                            </div>
                        </div>
                    ) : (
                        <LoginButton />
                    )}
                </div>
            </div>

            <div className="space-y-4">
                {filterShops.map(shop => (
                    <div key={shop.shopId || shop.id} className="border rounded-lg p-4">
                        <h2 className="font-semibold">{shop.shopName}</h2>
                        <p>Open Status: {Status(shop.shopStatus)}</p>
                        
                        <div className="mt-2">
                            <Link href={`/week07/${shop.id}`} className="ms-1 bg-blue-600 text-white px-3 py-2 rounded">
                                View Detail
                            </Link>
                            <Link href={`/week07/${shop.id}/edit`} className="ms-1 bg-yellow-400 text-black px-3 py-2 rounded">
                                Update
                            </Link>
                            <button onClick={(e) => handleDelete(`${shop.id}`)} className="ms-1 bg-red-500 text-white px-3 py-2 rounded">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}