// Contact section: contact info and message form.

'use client'

import React, { useState, useEffect } from "react";
import {
  Share2,
  User,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import SocialLinks from "../../components/SocialLinks";
import Komentar from "../../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 800,
    });
  }, []);

  // ============================================
  // HANDLE INPUT
  // ============================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================
  // HANDLE SUBMIT
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Validasi sederhana
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      Swal.fire({
        title: "Data Belum Lengkap",
        text: "Silakan isi semua field terlebih dahulu.",
        icon: "warning",
        confirmButtonColor: "#6366f1",
      });

      return;
    }

    setIsSubmitting(true);

    Swal.fire({
      title: "Mengirim Pesan...",
      html: "Harap tunggu selagi pesan Anda dikirim.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // ============================================
      // FORMSUBMIT URL
      // ============================================
      const formSubmitUrl =
        "https://formsubmit.co/muhammadiksannnn1348@gmail.com";

      // ============================================
      // SIAPKAN DATA
      // ============================================
      const submitData = new URLSearchParams();

      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("message", formData.message);

      // Subject email
      submitData.append(
        "_subject",
        "Pesan Baru dari Website Portfolio"
      );

      // Nonaktifkan captcha
      submitData.append("_captcha", "false");

      // Format email
      submitData.append("_template", "table");

      // ============================================
      // KIRIM KE FORMSUBMIT
      // ============================================
      const response = await fetch(formSubmitUrl, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: submitData.toString(),
      });

      // ============================================
      // CEK RESPONSE
      // ============================================
      if (!response.ok) {
        throw new Error(
          `Gagal mengirim pesan. Status: ${response.status}`
        );
      }

      // ============================================
      // BERHASIL
      // ============================================
      Swal.fire({
        title: "Berhasil!",
        text: "Pesan Anda berhasil dikirim. Terima kasih sudah menghubungi saya.",
        icon: "success",
        confirmButtonColor: "#6366f1",
        timer: 3000,
        timerProgressBar: true,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("FormSubmit Error:", error);

      Swal.fire({
        title: "Gagal Mengirim!",
        text: "Pesan tidak dapat dikirim. Silakan coba lagi beberapa saat.",
        icon: "error",
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-[5%] sm:px-[5%] lg:px-[10%]">
      {/* ============================================
          HEADER
      ============================================ */}
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact me
          </span>
        </h2>

        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          Have a question? Send me a message, and I'll get
          back to you soon.
        </p>
      </div>

      {/* ============================================
          CONTACT SECTION
      ============================================ */}
      <div
        className="h-auto py-10 flex items-center justify-center 2xl:pr-[3.1%] lg:pr-[3.8%] md:px-0"
        id="contact"
      >
        <div className="container px-[1%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-12">
          
          {/* ============================================
              CONTACT FORM
          ============================================ */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 py-10 sm:p-10 transform transition-all duration-500 hover:shadow-[#6366f1]/10">
            
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  Contact me
                </h2>

                <p className="text-gray-400">
                  Is there anything you'd like to discuss?
                  Send me a message and let's talk.
                </p>
              </div>

              <Share2 className="w-10 h-10 text-[#6366f1] opacity-50" />
            </div>

            {/* ============================================
                FORM
            ============================================ */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              
              {/* NAME */}
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />

                <input
                  type="text"
                  name="name"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  autoComplete="name"
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>

              {/* EMAIL */}
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Anda"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  autoComplete="email"
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>

              {/* MESSAGE */}
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group"
              >
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />

                <textarea
                  name="message"
                  placeholder="Pesan Anda"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  rows={6}
                  className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send
                  className={`w-5 h-5 ${
                    isSubmitting
                      ? "animate-pulse"
                      : ""
                  }`}
                />

                {isSubmitting
                  ? "Mengirim..."
                  : "Kirim Pesan"}
              </button>
            </form>

            {/* ============================================
                SOCIAL LINKS
            ============================================ */}
            <div className="mt-10 pt-6 border-t border-white/10 flex justify-center space-x-6">
              <SocialLinks />
            </div>
          </div>

          {/* ============================================
              KOMENTAR
          ============================================ */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-3 py-3 md:p-10 md:py-8 shadow-2xl transform transition-all duration-500 hover:shadow-[#6366f1]/10">
            <Komentar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;