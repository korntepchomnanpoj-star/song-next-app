'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function ReviewList() {
  const params = useParams();
  const gameId = Number(params?.id);
  
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  const fetchReviews = async () => {
    if (!gameId) return;
    try {
      const res = await fetch(`/api/reviews?gameId=${gameId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // ดึงข้อมูลคนที่ Login จาก LocalStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("อ่านข้อมูล User ผิดพลาด", e);
      }
    }
    fetchReviews();
  }, [gameId]);

  const submitReview = async () => {
    if (!currentUser) return alert("กรุณาเข้าสู่ระบบก่อนทำการรีวิวครับ!");
    if (!comment.trim()) return alert("กรุณาพิมพ์ความคิดเห็นก่อนส่งครับ");
    
    // ดึงรหัส user_id แบบครอบคลุม 
    const userIdToSubmit = currentUser.user_id || currentUser.id;
    
    if (!userIdToSubmit) {
      return alert("หา User ID ไม่เจอ กรุณากดออกจากระบบแล้วล็อกอินใหม่อีกครั้งครับ");
    }

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          game_id: gameId, 
          user_id: userIdToSubmit, // ส่งรหัสคนที่ล็อกอินไป
          rating_score: rating, 
          comment_text: comment 
        })
      });

      if (res.ok) {
        setComment("");
        setRating(5);
        fetchReviews(); // รีเฟรชคอมเมนต์ใหม่ให้ขึ้นทันที
      } else {
        const errData = await res.json();
        alert("เกิดข้อผิดพลาด: " + (errData.error || "ไม่สามารถบันทึกได้"));
      }
    } catch (error) {
      console.error(error);
      alert("ระบบขัดข้อง ไม่สามารถส่งรีวิวได้");
    }
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-md p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">รีวิวและความคิดเห็น</h2>
      
      {/* ถ้าล็อกอินแล้วให้แสดงกล่องรีวิว */}
      {currentUser ? (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border">
          <p className="font-semibold mb-2 text-gray-700">ให้คะแนนโดย: {currentUser.username}</p>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star} 
                onClick={() => setRating(star)}
                className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:scale-110 transition-transform`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea 
            className="w-full border p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700" 
            rows={3} 
            placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button 
            onClick={submitReview}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700"
          >
            ส่งรีวิว
          </button>
        </div>
      ) : (
        <div className="mb-8 p-6 bg-red-50 rounded-lg border border-red-200 text-center">
          <p className="text-red-600 font-medium mb-2">คุณต้องเข้าสู่ระบบก่อนจึงจะสามารถเขียนรีวิวได้</p>
          <a href="/final01/login" className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            ไปหน้าเข้าสู่ระบบ
          </a>
        </div>
      )}

      {/* รายการคอมเมนต์ */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((rev, index) => (
            <div key={index} className="border-b border-gray-100 pb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-gray-800">{rev.username}</span>
                <span className="text-yellow-400 text-lg">
                  {'★'.repeat(rev.rating_score)}{'☆'.repeat(5 - rev.rating_score)}
                </span>
              </div>
              <p className="text-gray-600">{rev.comment_text}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
            <p className="text-gray-500 font-medium">ยังไม่มีรีวิวสำหรับเกมนี้ เป็นคนแรกที่รีวิวสิ!</p>
          </div>
        )}
      </div>
    </div>
  );
}