"use client";

import { useState } from 'react';
import MusicItem from './components/MusicItem';

type Music = {
    id: number;
    title: string;
    genre: string;
};

export default function Test01Page() {
    const [musics, setMusics] = useState<Music[]>([
        { id: 1, title: 'Idol - YOASOBI', genre: 'J-Pop' },
        { id: 2, title: 'Connect - ClariS', genre: 'Anime OST' },
        { id: 3, title: 'NO SCARED - ONE OK ROCK', genre: 'J-Rock' }
    ]);

    const [newTitle, setNewTitle] = useState('');
    const [newGenre, setNewGenre] = useState('J-Pop');
    const [filterType, setFilterType] = useState('All');

    const handleAddMusic = () => {
        if (newTitle.trim() === '') return;

        const newMusic: Music = {
            id: Date.now(),
            title: newTitle,
            genre: newGenre,
        };

        setMusics([...musics, newMusic]);
        setNewTitle('');
    };

    const handleDeleteMusic = (id: number) => {
        const updatedMusics = musics.filter((music) => music.id !== id);
        setMusics(updatedMusics);
    };

    const filteredMusics = musics.filter((music) => {
        if (filterType === 'All') return true;
        return music.genre === filterType;
    });

    return (
        <div className="min-h-screen bg-slate-100 p-8 font-sans text-black">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-8 text-slate-800 text-center">🎶 ระบบจัดการเพลย์ลิสต์</h1>

                <div className="mb-8 p-6 bg-slate-50 border border-slate-200 rounded-xl">
                    <h2 className="text-xl font-bold mb-4 text-slate-700">เพิ่มเพลงใหม่</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">ชื่อเพลง - ศิลปิน</label>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-800"
                            placeholder="กรอกชื่อเพลงที่นี่..."
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">หมวดหมู่ (Radio)</label>
                        <div className="flex gap-6">
                            <label className="flex items-center cursor-pointer text-slate-700">
                                <input
                                    type="radio"
                                    value="J-Pop"
                                    checked={newGenre === 'J-Pop'}
                                    onChange={(e) => setNewGenre(e.target.value)}
                                    className="w-4 h-4 text-indigo-600 mr-2"
                                />
                                J-Pop
                            </label>
                            <label className="flex items-center cursor-pointer text-slate-700">
                                <input
                                    type="radio"
                                    value="Anime OST"
                                    checked={newGenre === 'Anime OST'}
                                    onChange={(e) => setNewGenre(e.target.value)}
                                    className="w-4 h-4 text-indigo-600 mr-2"
                                />
                                Anime OST
                            </label>
                            <label className="flex items-center cursor-pointer text-slate-700">
                                <input
                                    type="radio"
                                    value="J-Rock"
                                    checked={newGenre === 'J-Rock'}
                                    onChange={(e) => setNewGenre(e.target.value)}
                                    className="w-4 h-4 text-indigo-600 mr-2"
                                />
                                J-Rock
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={handleAddMusic}
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold text-lg hover:bg-indigo-700 transition shadow-md"
                    >
                        เพิ่มลงรายการ
                    </button>
                </div>

                <hr className="my-6 border-slate-200" />

                <div className="mb-6 flex gap-3">
                    <span className="py-2 font-semibold text-slate-700">ตัวกรอง:</span>
                    {['All', 'J-Pop', 'Anime OST', 'J-Rock'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-4 py-2 rounded-lg font-medium transition ${filterType === type
                                ? 'bg-slate-800 text-white shadow-md'
                                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                                }`}
                        >
                            {type === 'All' ? 'ทั้งหมด' : type}
                        </button>
                    ))}
                </div>

                <div>
                    {filteredMusics.length === 0 ? (
                        <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-300 rounded-lg">
                            <p className="text-slate-500 font-medium">ไม่มีรายการเพลงในหมวดหมู่นี้</p>
                        </div>
                    ) : (
                        filteredMusics.map((music) => (
                            <MusicItem
                                key={music.id}
                                id={music.id}
                                title={music.title}
                                genre={music.genre}
                                onDelete={handleDeleteMusic}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}