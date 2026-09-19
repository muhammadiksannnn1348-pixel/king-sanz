/*
  File: src\components\TechStackIcon.jsx
  Deskripsi: File ini menangani bagian tertentu dari aplikasi portfolio digital.
  Catatan: Kode ini digunakan untuk rendering, data, dan logika interaksi pada halaman website.
*/
import React from 'react';

/*
  TechStackIcon.jsx
  - Komponen presentasional untuk menampilkan icon + nama teknologi.
  - Props:
    * `TechStackIcon` : string (URL atau path gambar icon)
    * `Language`      : string (nama teknologi, yang ditampilkan di bawah icon)
  - Komponen ini tidak memiliki state; hanya markup dan kelas Tailwind.
*/
const TechStackIcon = ({ TechStackIcon, Language }) => {
  // Root container: grup untuk efek hover yang memengaruhi anak (gradient + scale)
  return (
    <div className="group p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
      <div className="relative">
        {/*
          Layer gradient: berada di belakang icon.
          - `absolute -inset-1` membuat layer sedikit lebih besar dari icon.
          - opacity berubah pada hover melalui kelas `group-hover:opacity-50`.
        */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>

        {/* Gambar icon teknologi: gunakan `alt` yang menjelaskan untuk aksesibilitas */}
        <img 
          src={TechStackIcon} 
          alt={`${Language} icon`} 
          className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
        />
      </div>

      {/* Nama teknologi di bawah icon */}
      <span className="text-slate-300 font-semibold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon;  
