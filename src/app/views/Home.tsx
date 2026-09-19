// Home section: hero content and headline.

'use client'

// Import dasar React dan beberapa hook yang digunakan
import React, { useState, useEffect, useCallback, memo } from "react"
import type { ComponentType, SVGProps } from "react"
// Helmet dipakai untuk mengatur head / meta tags pada halaman
// Ikon dari lucide-react yang dipakai di UI
import { Github, Mail, ExternalLink, Instagram, Sparkles } from "lucide-react"
// AOS untuk animasi saat scroll (animate on scroll)
import AOS from 'aos'
import 'aos/dist/aos.css'

// SVG custom untuk ikon Discord (dipakai pada social link)
const DiscordIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
    <path d="M20.317 4.37C18.939 3.73 17.489 3.29 15.989 3.08C15.75 3.47 15.49 3.98 15.3 4.38C13.66 4.18 12.02 4.18 10.38 4.38C10.19 3.98 9.93 3.47 9.69 3.08C8.19 3.29 6.74 3.73 5.36 4.37C2.4 8.89 1.72 13.32 2.14 17.7C3.84 19.15 5.45 20.09 7.02 20.74C7.5 20.08 7.93 19.38 8.31 18.65C7.57 18.38 6.87 17.97 6.22 17.47C6.42 17.34 6.62 17.18 6.81 17.03C10.53 19.19 14.66 19.19 18.38 17.03C18.57 17.18 18.77 17.34 18.97 17.47C18.32 17.97 17.62 18.38 16.88 18.65C17.26 19.38 17.69 20.08 18.17 20.74C19.74 20.09 21.35 19.15 23.05 17.7C23.55 12.63 22.4 8.25 20.317 4.37ZM9.46 15.24C8.55 15.24 7.8 14.42 7.8 13.39C7.8 12.36 8.54 11.54 9.46 11.54C10.38 11.54 11.12 12.36 11.11 13.39C11.11 14.42 10.38 15.24 9.46 15.24ZM14.54 15.24C13.62 15.24 12.88 14.42 12.88 13.39C12.88 12.36 13.62 11.54 14.54 11.54C15.46 11.54 16.2 12.36 16.19 13.39C16.19 14.42 15.46 15.24 14.54 15.24Z" fill="currentColor"/>
  </svg>
)

// Badge kecil yang menandakan status/CTA, dioptimalkan untuk performa dengan memo
const StatusBadge = memo(() => (
  <div className="inline-block lg:mx-0 mt-10">
    <div className="relative group cursor-default">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur-sm opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
      <div className="relative px-4 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 group-hover:border-white/20 group-hover:scale-[1.02] transition-all duration-300">
        <span className="bg-gradient-to-r from-[#6366f1] via-indigo-300 to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-indigo-400" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

// Judul utama halaman, dipisahkan sebagai komponen kecil dan dimemo untuk efisiensi render
const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-xl opacity-10"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Full-Stack
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-xl opacity-10"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#6366f1] bg-clip-text text-transparent drop-shadow-[0_5px_15px_rgba(99,102,241,0.2)]">
          Web Developer
        </span>
      </span>
    </h1>
  </div>
));

// Chip kecil untuk menampilkan nama teknologi (React, JS, dsb.)
const TechStack = memo(({ tech }: { tech: string }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:border-white/25 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 cursor-default shadow-sm">
    {tech}
  </div>
));

// Tombol CTA yang digunakan untuk navigasi internal/eksternal, menerima ikon dan teks
const CTAButton = memo(({ href, text, icon: Icon }: { href: string; text: string; icon: ComponentType<{ className?: string }> }) => (
  <a href={href} className="inline-block">
    <button className="group relative w-[160px] cursor-pointer">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-20 blur-sm group-hover:opacity-40 group-hover:blur-md transition-all duration-500"></div>     
      <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 group-hover:border-white/30 leading-none overflow-hidden transition-all duration-300 group-hover:scale-[1.03] shadow-lg">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out bg-gradient-to-r from-[#4f52c9]/30 via-[#8644c5]/20 to-transparent"></div>    
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent font-medium z-10 group-hover:tracking-wider transition-all duration-300">
            {text}
          </span>
          <Icon className={`w-4 h-4 text-gray-200 ${text === 'Contact' ? 'group-hover:translate-x-1.5' : 'group-hover:rotate-45 group-hover:scale-110'} transform transition-all duration-300 ease-out z-10`} />
        </span>
      </div>
    </button>
  </a>
));

// Tombol ikon kecil untuk link sosial (GitHub, Discord, Instagram)
const SocialLink = memo(({ icon: Icon, link, label }: { icon: ComponentType<{ className?: string }>; link: string; label: string }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label} className="inline-block">
    <button className="group relative p-2 cursor-pointer" aria-label={label}>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2.5 flex items-center justify-center border border-white/10 group-hover:border-white/30 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 ease-out shadow-sm">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] transition-all duration-300" />
      </div>
    </button>
  </a>
));

// Konstanta konfigurasi untuk efek typing dan data statis pada halaman
const TYPING_SPEED = 100; // ms per karakter saat mengetik
const ERASING_SPEED = 50; // ms per karakter saat menghapus
const PAUSE_DURATION = 2000; // jeda setelah kata selesai diketik
const WORDS = ["I am a student", "Tech Enthusiast", "Software Engineer", "Web Developer", "UI/UX Designer", "Graphic Designer"]; // kata-kata yang berganti-ganti
const TECH_STACK = ["React", "Javascript", "Node.js", "Tailwind"]; // daftar teknologi yang ditampilkan
// Daftar social link yang digunakan di bagian kiri
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/muhammadiksannnn1348-pixel", label: "GitHub Profile" },
  { icon: DiscordIcon, link: "https://discord.com/users/1459451083670814826", label: "Discord Profile" },
  { icon: Instagram, link: "https://www.instagram.com/xy.sanz.kce", label: "Instagram Profile" }
];

const Home = () => {
  // State untuk efek typing dinamis
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  // isLoaded dipakai untuk transisi opasitas saat halaman siap
  const [isLoaded, setIsLoaded] = useState(false)
  // isHovering untuk interaksi pada bagian kanan (animasi scale saat hover)
  const [isHovering, setIsHovering] = useState(false)

  // Inisialisasi AOS dan daftarkan listener resize untuk rekonfigurasi AOS
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  // Set flag loaded untuk transisi masuk komponen
  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Logika efek mengetik (typing / erasing)
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        // Tambah satu karakter dari kata saat ini
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        // Jika selesai mengetik kata, jeda sebentar lalu mulai erase
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        // Hapus satu karakter
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        // Pindah ke kata berikutnya dan mulai mengetik lagi
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  // Jalankan handleTyping secara berkala sesuai mode (typing atau erasing)
  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <>
      <div className="min-h-screen bg-[#030014] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%]" id="home">
        <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <div className="container mx-auto min-h-screen">
            <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
              {/* Left Column */}
              <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
                data-aos="fade-right"
                data-aos-delay="200">
                <div className="space-y-4 sm:space-y-6">
                  <StatusBadge />
                  <MainTitle />

                  {/* Typing Effect */}
                  <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                    <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                      {text}
                    </span>
                    <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                  </div>

                  {/* Description */}
                  <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light"
                    data-aos="fade-up"
                    data-aos-delay="1000">
                    Building Modern Digital Experiences That Combine Innovation, Performance, and User-Centric Design
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-3 justify-start" data-aos="fade-up" data-aos-delay="1200">
                    {TECH_STACK.map((tech, index) => (
                      <TechStack key={index} tech={tech} />
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-row gap-3 w-full justify-start" data-aos="fade-up" data-aos-delay="1400">
                    <CTAButton href="#portofolio" text="Projects" icon={ExternalLink} />
                    <CTAButton href="#contact" text="Contact" icon={Mail} />
                  </div>

                  {/* Social Links */}
                  <div className="hidden sm:flex gap-4 justify-start" data-aos="fade-up" data-aos-delay="1600">
                    {SOCIAL_LINKS.map((social, index) => (
                      <SocialLink key={index} {...social} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - WebM Video */}
              <div className="w-full py-0 md:py-[10%] sm:py-0 lg:w-1/2 h-[260px] sm:h-[400px] lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2  mt-5 sm:mt-0"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                data-aos="fade-left"
                data-aos-delay="600">
                <div className="relative w-full opacity-90">
                  <div className={`absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                    isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
                  }`}>
                  </div>

                  <div className={`relative lg:left-12 z-10 w-full opacity-90 transform transition-transform duration-500 ${
                    isHovering ? "scale-105" : "scale-100"
                  }`}>
                    <img
                      src="Animation1.gif"
                      alt="Developer Animation"
                      className={`w-full h-full object-contain transition-all duration-500 ${
                        isHovering 
                          ? "scale-[95%] sm:scale-[90%] md:scale-[90%] lg:scale-[90%] rotate-2" 
                          : "scale-[90%] sm:scale-[80%] md:scale-[80%] lg:scale-[80%]"
                      }`}
                    />
                  </div>

                  <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                    isHovering ? "opacity-50" : "opacity-20"
                  }`}>
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                      isHovering ? "scale-110" : "scale-100"
                    }`}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Home);