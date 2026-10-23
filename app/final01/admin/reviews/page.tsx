'use client';

import { useEffect, useState } from 'react';

type AdminReview = {
	id: string;
	gameId: number;
	username: string;
	rating: number;
	review: string;
	createdAt: string;
};

export default function AdminReviewsPage() {
	const [reviews, setReviews] = useState<AdminReview[]>([]);
	const [loading, setLoading] = useState(true);
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [message, setMessage] = useState('');

	useEffect(() => {
		async function loadReviews() {
			try {
				const response = await fetch('/final01/api/admin/reviews');
				const result = await response.json();
				if (!response.ok) throw new Error(result.error || 'โหลดรีวิวไม่สำเร็จ');
				setReviews(result.reviews);
			} catch (error: unknown) {
				setMessage(error instanceof Error ? error.message : 'โหลดรีวิวไม่สำเร็จ');
			} finally {
				setLoading(false);
			}
		}

		loadReviews();
	}, []);

	async function handleDelete(review: AdminReview) {
		if (!window.confirm(`ยืนยันลบรีวิวของ ${review.username} สำหรับเกม #${review.gameId}?`)) return;

		setDeletingId(review.id);
		setMessage('');
		try {
			const response = await fetch(`/final01/api/admin/reviews/${review.id}`, { method: 'DELETE' });
			const result = await response.json();
			if (!response.ok) throw new Error(result.error || 'ลบรีวิวไม่สำเร็จ');
			setReviews((current) => current.filter((item) => item.id !== review.id));
			setMessage(result.message);
		} catch (error) {
			setMessage(error instanceof Error ? error.message : 'ลบรีวิวไม่สำเร็จ');
		} finally {
			setDeletingId(null);
		}
	}

	return (
		<main className="mx-auto max-w-6xl px-6 py-10">
			<div className="mb-6 flex flex-wrap items-end justify-between gap-3">
				<h1 className="text-2xl font-semibold">จัดการรีวิว</h1>
				<p className="text-sm text-gray-600">ทั้งหมด {reviews.length} รีวิว</p>
			</div>

			{message && <p role="status" className="mb-4 text-sm text-gray-600">{message}</p>}
			{loading ? (
				<p className="py-8 text-center text-gray-500">กำลังโหลดรีวิว...</p>
			) : reviews.length === 0 ? (
				<p className="py-8 text-center text-gray-500">ยังไม่มีรีวิว</p>
			) : (
				<div className="divide-y divide-gray-200 border-y border-gray-200">
					{reviews.map((review) => (
						<article key={review.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-start sm:justify-between">
							<div className="min-w-0">
								<div className="mb-2 flex flex-wrap items-center gap-3 text-sm">
									<span className="font-semibold text-gray-900">เกม #{review.gameId}</span>
									<span className="text-gray-600">ผู้รีวิว: {review.username}</span>
									<span className="text-yellow-600" aria-label={`${review.rating} ดาว`}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
									<time className="text-gray-500" dateTime={review.createdAt}>{new Date(review.createdAt).toLocaleDateString('th-TH')}</time>
								</div>
								<p className="whitespace-pre-wrap break-words text-gray-700">{review.review}</p>
							</div>
							<button
								type="button"
								disabled={deletingId === review.id}
								onClick={() => handleDelete(review)}
								className="shrink-0 rounded border border-red-300 px-3 py-2 text-sm text-red-700 hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
							>
								{deletingId === review.id ? 'กำลังลบ...' : 'ลบรีวิว'}
							</button>
						</article>
					))}
				</div>
			)}
		</main>
	);
}
