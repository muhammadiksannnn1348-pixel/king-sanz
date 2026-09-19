'use client'

import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const handleGoBack = () => {
    sessionStorage.setItem('portfolio-return-path', '/#home');
    window.history.back();
  };

  const handleGoHome = () => {
    sessionStorage.setItem('portfolio-return-path', '/#home');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-4 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_58%)]" />
      <div className="relative z-10 text-center max-w-lg w-full">
        {/* 404 Number */}
        <div className="mb-10">
          <h1 className="text-[9rem] sm:text-[11rem] font-extrabold leading-none tracking-tighter bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent select-none">
            404
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500" />
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-500" />
          </div>
        </div>

        {/* Message */}
        <div className="mb-10 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-sm mx-auto">
            Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak pernah ada.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={handleGoBack}
            className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-slate-800/80 text-slate-200 rounded-xl border border-slate-700/80 hover:bg-slate-700/80 hover:border-slate-600 hover:text-white transition-all duration-200"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-0.5" />
            Kembali
          </button>

          <button
            onClick={handleGoHome}
            className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/30 transition-all duration-200"
          >
            <Home size={18} />
            Beranda
          </button>
        </div>
      </div>
    </div>
  );
}