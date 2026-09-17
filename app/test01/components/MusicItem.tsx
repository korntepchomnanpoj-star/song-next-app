"use client";

import React from 'react';

type MusicProps = {
    id: number;
    title: string;
    genre: string;
    onDelete: (id: number) => void;
};

const MusicItem = ({ id, title, genre, onDelete }: MusicProps) => {
    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <div className="flex justify-between items-center p-4 mb-3 bg-slate-50 border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition">
            <div>
                <span className="font-semibold text-slate-800 text-lg">{title}</span>
                <span className="ml-3 px-2 py-1 text-xs font-medium text-white bg-indigo-500 rounded-full">
                    {genre}
                </span>
            </div>
            <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600 transition"
            >
                ลบ
            </button>
        </div>
    );
};

export default MusicItem;