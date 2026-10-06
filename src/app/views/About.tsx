// About section: profile intro, stats, and CTA.

'use client'

import React, { useEffect, useState, memo, useMemo, useRef } from "react"
import Image from "next/image"
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles, UserCheck } from "lucide-react"

// ==================== CUSTOM HOOKS ====================
const useTilt = (intensity = 15) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const bounds = useRef<DOMRect | null>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})

  const handleMouseEnter = () => {
    if (ref.current) bounds.current = ref.current.getBoundingClientRect()
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = bounds.current
    if (!rect) return

    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setStyle({
      transform: `perspective(1000px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02, 1.02, 1.02)`,
    })
  }

  const handleMouseLeave = () => {
    bounds.current = null
    setStyle({
      transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)',
    })
  }

  return { ref, style, handleMouseEnter, handleMouseMove, handleMouseLeave }
}

// ==================== HEADER (UNCHANGED) ====================
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Turning logic into sleek interfaces.
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

// ==================== PROFILE IMAGE (NEW DESIGN) ====================
const ProfileImage = memo(() => {
  const tilt = useTilt(12)

  return (
    <div className="flex justify-center lg:justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
      <div
        className="relative group"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        {/* Main photo with 3D tilt */}
        <div className="relative z-10 animate-profile-image-float">
          <div
            ref={tilt.ref}
            onMouseEnter={tilt.handleMouseEnter}
            onMouseMove={tilt.handleMouseMove}
            onMouseLeave={tilt.handleMouseLeave}
            style={tilt.style}
            className="relative transition-transform duration-300 ease-out"
          >
            {/* Holographic gradient border */}
            <div className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 animate-gradient-rotate opacity-80 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />

            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_60px_rgba(120,119,198,0.5)] transform transition-all duration-700">

              {/* Image */}
              <Image
                src="/image.webp"
                alt="Portrait of M. Iksanuddin, full-stack web developer"
                fill
                sizes="(max-width: 640px) 288px, 320px"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />

              {/* Colored gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 via-transparent to-blue-500/30 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block pointer-events-none" />

              {/* Scanline effect */}
              <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden hidden sm:block">
                <div className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-scan" />
              </div>

            </div>
          </div>

          {/* Floating status chip - top right */}
          <div className="absolute -top-2 -right-2 sm:top-4 sm:right-0 z-30 animate-float" style={{ animationDelay: '0s' }}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900/90 backdrop-blur-md border border-green-500/30 shadow-lg shadow-green-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[10px] text-green-400 font-medium font-mono">ONLINE</span>
            </div>
          </div>

          {/* Floating code chip - bottom left */}
          <div className="absolute -bottom-2 -left-2 sm:bottom-8 sm:-left-6 z-30 animate-float" style={{ animationDelay: '1s' }}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900/90 backdrop-blur-md border border-purple-500/30 shadow-lg shadow-purple-500/20">
              <Code className="w-3 h-3 text-purple-400" />
              <span className="text-[10px] text-white font-mono">&lt;/&gt;</span>
            </div>
          </div>

          {/* Floating skill chip - top left */}
          <div className="absolute top-1/3 -left-3 sm:-left-8 z-30 animate-float" style={{ animationDelay: '2s' }}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900/90 backdrop-blur-md border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span className="text-[10px] text-white font-mono">UI/UX</span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes profile-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes profile-image-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes profile-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        @keyframes profile-gradient-rotate {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        .animate-float { animation: profile-float 4s ease-in-out infinite; }
        .animate-profile-image-float { animation: profile-image-float 5s ease-in-out infinite; }
        .animate-scan { animation: profile-scan 3s linear infinite; }
        .animate-gradient-rotate { animation: profile-gradient-rotate 8s linear infinite; }
      `}</style>
    </div>
  )
});

// ==================== STAT CARD (UNCHANGED) ====================
const StatCard = memo(({ icon: Icon, color, value, label, description, animation }: {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  value: string | number;
  label: string;
  description: string;
  animation: string;
}) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group">
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>

      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span
          className="text-4xl font-bold text-white"
          data-aos="fade-up-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
        >
          {value}
        </span>
      </div>

      <div>
        <p
          className="text-sm uppercase tracking-wider text-gray-300 mb-2"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-anchor-placement="top-bottom"
        >
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p
            className="text-xs text-gray-400"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          >
            {description}
          </p>
          <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

// ==================== MAIN COMPONENT ====================
const AboutPage = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalCertificates: 0,
    YearExperience: 0,
  });

  useEffect(() => {
    const updateStats = () => {
      const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
      const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");

      const startDate = new Date("2025-07-06");
      const today = new Date();
      const experience = today.getFullYear() - startDate.getFullYear() -
        (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

      setStats({
        totalProjects: storedProjects.length,
        totalCertificates: storedCertificates.length,
        YearExperience: experience
      });
    };

    updateStats();

    window.addEventListener('storage', updateStats);
    window.addEventListener('portfolioDataUpdated', updateStats);

    return () => {
      window.removeEventListener('storage', updateStats);
      window.removeEventListener('portfolioDataUpdated', updateStats);
    };
  }, []);

  const { totalProjects, totalCertificates, YearExperience } = stats;

  const statsData = useMemo(() => [
    {
      icon: Code,
      color: "from-[#6366f1] to-[#a855f7]",
      value: totalProjects,
      label: "Total Projects",
      description: "Innovative web solutions crafted",
      animation: "fade-right",
    },
    {
      icon: Award,
      color: "from-[#a855f7] to-[#6366f1]",
      value: totalCertificates,
      label: "Certificates",
      description: "Professional skills validated",
      animation: "fade-up",
    },
    {
      icon: Globe,
      color: "from-[#6366f1] to-[#a855f7]",
      value: YearExperience,
      label: "Years of Experience",
      description: "Continuous learning journey",
      animation: "fade-left",
    },
  ], [totalProjects, totalCertificates, YearExperience]);

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0"
      id="about"
      itemScope
      itemType="https://schema.org/Person"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>
              <span
                className="block mt-2 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
                itemProp="name"
              >
                M.IKSANUDDIN
              </span>
            </h2>

            <p
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              I am a Software Engineering student at SMK Negeri 1 Pasuruan, focusing on the development of modern, interactive websites.
              I enjoy transforming ideas into digital products that are engaging, functional, and user-friendly. Every project I undertake serves as an opportunity to grow, create better user experiences, and deliver effective, impactful solutions.
            </p>

            {/* Quote Section */}
            <div
              className="relative rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 my-6 overflow-hidden"
              data-aos="fade-up"
              data-aos-duration="1700"
            >
              {/* Corner accent — top left */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#a855f7]/60 rounded-tl-2xl" />
              {/* Corner accent — bottom right */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#6366f1]/60 rounded-br-2xl" />

              <blockquote className="relative text-gray-200 text-center lg:text-left italic font-medium text-sm leading-relaxed pl-8">
                Leveraging AI as a{" "}
                <span className="not-italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  professional tool
                </span>
                , not a replacement.
              </blockquote>
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              <a href="/CV.pdf" download="CV M.Iksanuddin.pdf" className="w-full lg:w-auto">
                <button
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
                </button>
              </a>
              <a href="#portofolio" className="w-full lg:w-auto">
                <button
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[#a855f7]/10"
                >
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
                </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        <a href="#portofolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>

    </div>
  );
};

export default memo(AboutPage);