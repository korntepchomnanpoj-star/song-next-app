'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ReviewList() {
  const params = useParams();
  const gameId = params?.id;

  const [reviews, setReviews] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // สถานะสำหรับการแก้ไขรีวิว
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');

  useEffect(() => {
    // เช็กว่ามีใคร Login อยู่ไหม
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    if (gameId) {
      fetchReviews();
    }
  }, [gameId]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?gameId=${gameId}`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (err) {
      console.error("Error fetching reviews");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return alert('กรุณาเข้าสู่ระบบก่อนเขียนรีวิว');
    if (!comment.trim()) return alert('กรุณาพิมพ์ข้อความรีวิว');

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id: gameId,
          username: currentUser.username,
          rating_score: rating,
          comment_text: comment
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setComment('');
        setRating(5);
        fetchReviews(); // โหลดรีวิวใหม่หลังส่งเสร็จ
      } else {
        alert('เกิดข้อผิดพลาดในการส่งรีวิว');
      }
    } catch (err) {
      alert('เชื่อมต่อระบบขัดข้อง');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ฟังก์ชันลบรีวิว
  const handleDelete = async (reviewId: number) => {
    if (!confirm('ยืนยันการลบรีวิวนี้ของคุณ?')) return;
    try {
      const res = await fetch(`/api/reviews?reviewId=${reviewId}`, { method: 'DELETE' });
      if (res.ok) {
        fetchReviews(); // โหลดรีวิวใหม่หลังลบเสร็จ
      }
    } catch (err) {
      alert('ลบไม่สำเร็จ');
    }
  };

  // ฟังก์ชันกดเริ่มแก้ไขรีวิว
  const startEdit = (review: any) => {
    setEditingId(review.review_id);
    setEditRating(review.rating_score);
    setEditComment(review.comment_text);
  };

  // ฟังก์ชันบันทึกการแก้ไขรีวิว
  const handleUpdate = async () => {
    if (!editComment.trim()) return alert('กรุณาพิมพ์ข้อความรีวิว');
    try {
      const res = await fetch('/api/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          review_id: editingId,
          rating_score: editRating,
          comment_text: editComment
        })
      });
      if (res.ok) {
        setEditingId(null);
        fetchReviews();
      }
    } catch (err) {
      alert('อัปเดตไม่สำเร็จ');
    }
  };

  // ตัวช่วยแสดงดาว
  const renderStars = (currentRating: number, setFn?: (r: number) => void) => {
    return (
      <div className="flex space-x-1 text-2xl text-amber-400 mb-2">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            className={setFn ? 'cursor-pointer hover:scale-110 transition' : 'cursor-default'}
            onClick={() => setFn && setFn(star)}
          >
            {star <= currentRating ? '★' : '☆'}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">รีวิวและความคิดเห็น</h2>

      {/* ฟอร์มเขียนรีวิว */}
      {currentUser ? (
        <div className="border border-gray-200 rounded-lg p-5 mb-8 bg-gray-50">
          <p className="text-sm font-bold text-gray-700 mb-2">ให้คะแนนโดย: <span className="text-indigo-600">{currentUser.username}</span></p>
          <form onSubmit={handleSubmit}>
            {renderStars(rating, setRating)}
            <textarea
              className="w-full border border-gray-300 rounded p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
              placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 bg-indigo-600 text-white px-6 py-2 rounded font-bold shadow hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isSubmitting ? 'กำลังส่ง...' : 'ส่งรีวิว'}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-100 rounded-lg p-6 text-center mb-8">
          <p className="text-red-600 font-bold text-sm mb-3">คุณต้องเข้าสู่ระบบก่อนจึงจะสามารถเขียนรีวิวได้</p>
          <Link href="/final01/login" className="bg-red-600 text-white px-6 py-2 rounded-md font-bold hover:bg-red-700 shadow transition inline-block">
            ไปหน้าเข้าสู่ระบบ
          </Link>
        </div>
      )}

      {/* รายการรีวิว */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-6 font-semibold">ยังไม่มีรีวิวสำหรับเกมนี้ เป็นคนแรกที่รีวิวสิ!</p>
        ) : (
          reviews.map(review => (
            <div key={review.review_id} className="border-b border-gray-100 pb-4 last:border-0">
              {/* ถ้ากำลังแก้อยู่ ให้แสดงฟอร์มแก้ไข */}
              {editingId === review.review_id ? (
                <div className="bg-white border-2 border-indigo-100 rounded p-4 shadow-sm">
                  <p className="text-sm font-bold text-indigo-600 mb-2">แก้ไขรีวิวของคุณ</p>
                  {renderStars(editRating, setEditRating)}
                  <textarea
                    className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-indigo-500"
                    rows={2}
                    value={editComment}
                    onChange={e => setEditComment(e.target.value)}
                  />
                  <div className="mt-3 flex gap-2">
                    <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-1.5 rounded text-sm font-bold hover:bg-green-700 shadow-sm">บันทึก</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded text-sm font-bold hover:bg-gray-300 shadow-sm">ยกเลิก</button>
                  </div>
                </div>
              ) : (
                /* ถ้าไม่ได้แก้ ให้แสดงรีวิวปกติ */
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-800">{review.username}</p>
                      <div className="text-amber-400 text-sm mt-1">
                        {Array(review.rating_score).fill('★').join('')}
                        {Array(5 - review.rating_score).fill('☆').join('')}
                      </div>
                    </div>
                    {/* เช็กว่าเป็นเจ้าของรีวิวหรือไม่ ถ้าใช่ให้แสดงปุ่มแก้ไข/ลบ */}
                    {currentUser && currentUser.username === review.username && (
                      <div className="flex gap-3">
                        <button onClick={() => startEdit(review)} className="text-indigo-600 hover:text-indigo-800 hover:underline text-xs font-bold transition">แก้ไข</button>
                        <span className="text-gray-300">|</span>
                        <button onClick={() => handleDelete(review.review_id)} className="text-red-600 hover:text-red-800 hover:underline text-xs font-bold transition">ลบ</button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed">{review.comment_text}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}