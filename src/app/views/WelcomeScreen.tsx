// Welcome splash screen shown on first load.

'use client'

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Code2, Github, Globe, User } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

import Lightning from "../../components/Lightning";

interface TypewriterEffectProps {
  text: string;
}

// Typewriter Effect
const TypewriterEffect = ({ text }: TypewriterEffectProps) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

interface IconButtonProps {
  Icon: React.ComponentType<{ className?: string }>;
}

const IconButton = ({ Icon }: IconButtonProps) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
    </div>
  </div>
);

// Background Bintang + Bintang Jatuh
const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    type Star = {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleDirection: number;
    };

    type ShootingStar = {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      angle: number;
    };

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createStars = (count: number) => {
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.4,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.025 + 0.005,
          twinkleDirection: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.4),
        length: Math.random() * 90 + 50,
        speed: Math.random() * 10 + 7,
        opacity: 1,
        angle: Math.PI / 4 + (Math.random() * 0.4 - 0.2),
      });
    };

    createStars(180);

    const shootingInterval = setInterval(() => {
      if (Math.random() > 0.55) createShootingStar();
    }, 1200);

    const animate = () => {
      ctx.fillStyle = "#030014";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Bintang berkedip
      stars.forEach((star) => {
        star.opacity += star.twinkleSpeed * star.twinkleDirection;
        if (star.opacity <= 0.15 || star.opacity >= 1) {
          star.twinkleDirection *= -1;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      // Bintang jatuh
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        const endX = s.x - Math.cos(s.angle) * s.length;
        const endY = s.y - Math.sin(s.angle) * s.length;

        const gradient = ctx.createLinearGradient(s.x, s.y, endX, endY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
        gradient.addColorStop(0.4, `rgba(180, 210, 255, ${s.opacity * 0.6})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.2;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.012;

        if (s.opacity <= 0 || s.x > canvas.width + 150 || s.y > canvas.height + 150) {
          shootingStars.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(shootingInterval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

interface WelcomeScreenProps {
  onLoadingComplete?: () => void;
}

const WelcomeScreen = ({ onLoadingComplete }: WelcomeScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 3400);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
          className="fixed inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          {/* 1. Background Bintang + Bintang Jatuh (paling belakang) */}
          <StarryBackground />

          {/* 2. Lightning (di atas bintang) */}
          <div className="absolute inset-0 w-full h-full z-[1]">
            <Lightning
              hue={272}
              xOffset={0}
              speed={1}
              intensity={1.4}
              size={1}
            />
          </div>

          {/* 3. Overlay Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-purple-900/20 z-[2] pointer-events-none" />

          {/* 4. Content */}
          <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto">
              {/* Icons */}
              <motion.div
                className="flex justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                {[Code2, User, Github].map((Icon, index) => (
                  <div key={index} data-aos="fade-down" data-aos-delay={index * 200}>
                    <IconButton Icon={Icon} />
                  </div>
                ))}
              </motion.div>

              {/* Welcome Text */}
              <motion.div className="text-center mb-6 sm:mb-8 md:mb-12" variants={childVariants}>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold space-y-2 sm:space-y-4">
                  <div className="mb-2 sm:mb-4">
                    <span data-aos="fade-right" data-aos-delay="200" className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                      Welcome
                    </span>
                    <span data-aos="fade-right" data-aos-delay="400" className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                      To
                    </span>
                    <span data-aos="fade-right" data-aos-delay="600" className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                      My
                    </span>
                  </div>
                  <div>
                    <span data-aos="fade-up" data-aos-delay="800" className="inline-block px-2 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#6366f1] bg-clip-text text-transparent">
                      Portfolio
                    </span>
                    <span data-aos="fade-up" data-aos-delay="1000" className="inline-block px-2 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#6366f1] bg-clip-text text-transparent">
                      Website
                    </span>
                  </div>
                </h1>
              </motion.div>

              {/* Website Link */}
              <motion.div className="text-center" variants={childVariants} data-aos="fade-up" data-aos-delay="1200">
                <a
                  href="https://king-sanz.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full relative group hover:scale-105 transition-transform duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                  <div className="relative flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      <TypewriterEffect text="king-sanz.vercel.app" />
                    </span>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
  );
};

export default WelcomeScreen;