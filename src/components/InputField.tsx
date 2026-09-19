/*
  File: src\components\InputField.jsx
  Deskripsi: File ini menangani bagian tertentu dari aplikasi portfolio digital.
  Catatan: Kode ini digunakan untuk rendering, data, dan logika interaksi pada halaman website.
*/
import React, { useState } from "react";

// Komponen `InputField` digunakan ulang untuk form (nama, email, message)
// Props:
// - field: nama field pada form (mis. 'name', 'email', 'message')
// - label: teks label yang tampil
// - icon: komponen ikon yang ditampilkan di kiri
// - formData: objek state form dari parent
// - handleChange: handler onChange yang dikirim dari parent
const InputField = ({ field, label, icon: Icon, formData, handleChange }) => {
  // isFocused dipakai untuk efek styling saat input aktif
  const [isFocused, setIsFocused] = useState(false);

  // Helper untuk membuat kelas tailwind dinamis sesuai fokus / textarea
  const getInputClasses = (isTextArea = false) => {
    const baseClasses = `
      w-full p-4 rounded-xl bg-white/10 text-white placeholder-transparent 
      focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 
      focus:ring-offset-[#1c1e26] transition-all duration-300 peer
    `;

    const hoverFocusClasses = isFocused
      ? "shadow-[0_4px_12px_rgba(99,102,241,0.4)] border-[#6366f1]"
      : "border-white/20 hover:border-[#6366f1]";

    // Untuk textarea tambahkan tinggi dan padding atas untuk label
    return `${baseClasses} ${hoverFocusClasses} ${isTextArea ? "h-52 pt-12" : "pl-12"}`;
  };

  // Render input biasa atau textarea bila field === 'message'
  const renderInputContent = () => {
    if (field === "message") {
      return (
        <textarea
          id={field}
          name={field}
          placeholder={label}
          value={formData[field]}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={getInputClasses(true)}
          required
        />
      );
    }

    return (
      <input
        id={field}
        type={field === "email" ? "email" : "text"} // email => type=email untuk validasi browser
        name={field}
        placeholder={label}
        value={formData[field]}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={getInputClasses()}
        required
      />
    );
  };

  return (
    <div className="relative w-full group">
      {/* Icon dan label yang berada di kiri atas input */}
      <div className="absolute left-4 top-4 flex items-center space-x-2 text-gray-400 transition-colors group-hover:text-[#6366f1]">
        <Icon className="w-5 h-5" />
        <label
          htmlFor={field}
          className={`
            absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm transition-all duration-300 
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-0 
            peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base 
            peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[#6366f1] peer-focus:text-sm
          `}
        >
          {label}
        </label>
      </div>

      {/* Render input atau textarea sesuai kondisi */}
      {renderInputContent()}

      {/* Border overlay untuk efek fokus/hover */}
      <div
        className={`
          absolute inset-0 border rounded-xl pointer-events-none 
          transition-all duration-300 
          ${isFocused ? "border-[#6366f1]" : "border-transparent"}
        `}
      ></div>
    </div>
  );
};

export default InputField;

