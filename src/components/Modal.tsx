/*
  File: src\components\Modal.jsx
  Deskripsi: File ini menangani bagian tertentu dari aplikasi portfolio digital.
  Catatan: Kode ini digunakan untuk rendering, data, dan logika interaksi pada halaman website.
*/
import React, { useState } from 'react';
import { Eye, ArrowRight, ExternalLink } from 'lucide-react';

/*
  Modal.jsx (ProjectCardModal)
  - Modal presentasional untuk menampilkan detail singkat proyek.
  - Props:
    * `title`       : judul proyek
    * `description` : deskripsi singkat
    * `link`        : url live demo (opsional)
  - Perilaku:
    * `isOpen` state mengontrol visibilitas modal
    * Klik overlay menutup modal (akses cepat)
    * Klik isi modal dihentikan bubbling agar tidak menutup secara tidak sengaja
*/
const ProjectCardModal = ({ title, description, link }) => {
  // state lokal: apakah modal terbuka
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Tombol pemicu modal: hanya membuka modal, tidak melakukan navigasi */}
      <button
        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-colors duration-200"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-sm">Details</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Overlay + modal: muncul hanya jika isOpen true */}
      {isOpen && (
        <div
          // overlay full-screen yang semi-transparan
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in"
          onClick={() => setIsOpen(false)} // klik pada overlay akan menutup modal
        >
          <div
            // kotak modal itu sendiri; stopPropagation agar klik di sini tidak menutup
            className="relative w-full max-w-md rounded-lg bg-gray-900 p-6 text-white shadow-lg animate-slide-up sm:p-8"
            onClick={(e) => e.stopPropagation()} // mencegah klik anak menutup overlay
          >
            {/* Tombol tutup ikon di pojok kanan atas */}
            <button
              className="absolute top-4 right-4 rounded-md p-2 hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
            >
              <Eye className="h-5 w-5" />
            </button>

            {/* Konten modal: judul, deskripsi, aksi */}
            <h2 className="mb-4 text-2xl font-bold">{title}</h2>
            <p className="mb-6 text-gray-400">{description}</p>

            <div className="flex justify-end space-x-4">
              {/* Jika `link` tersedia, tampilkan tombol menuju demo (buka di tab baru) */}
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-blue-600 px-4 py-2 font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Live Demo <ExternalLink className="ml-2 inline-block h-5 w-5" />
              </a>

              {/* Tombol tutup alternatif untuk akses keyboard */}
              <button
                className="rounded-md bg-gray-800 px-4 py-2 font-medium hover:bg-gray-700 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCardModal;
