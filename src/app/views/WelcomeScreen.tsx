// Welcome splash screen shown on first load.

'use client'

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Github, Globe, User } from "lucide-react";

/* ---------------------------------- Types --------------------------------- */
interface TypewriterEffectProps {
  text: string;
  speed?: number;
  startDelay?: number;
  onComplete?: () => void;
}

interface IconButtonProps {
  Icon: React.ComponentType<{ className?: string }>;
}

interface WelcomeScreenProps {
  onLoadingComplete?: () => void;
}

/* ------------------------------ Typewriter -------------------------------- */
const TypewriterEffect = ({
  text,
  speed = 85,
  startDelay = 0,
  onComplete,
}: TypewriterEffectProps) => {
  const [displayText, setDisplayText] = useState("");
  const [done, setDone] = useState(false);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let raf = 0;
    let startTime: number | null = null;
    let hasCompleted = false;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime - startDelay;

      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const charsToShow = Math.floor(elapsed / speed);

      if (charsToShow >= text.length) {
        setDisplayText(text);
        if (!hasCompleted) {
          hasCompleted = true;
          setDone(true);
          onCompleteRef.current?.();
        }
        return;
      }

      setDisplayText(text.slice(0, charsToShow));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, speed, startDelay]);

  return (
    <span className="inline-block" aria-label={text}>
      {displayText}
      <span
        className={`inline-block ml-0.5 transition-opacity duration-500 ${
          done ? "opacity-0" : "animate-pulse opacity-100"
        }`}
      >
        |
      </span>
    </span>
  );
};

/* ------------------------------ Icon Button ------------------------------- */
const IconButton = ({ Icon }: IconButtonProps) => (
  <div className="relative group hover:scale-110 transition-transform duration-500">
    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-500" />
    <div className="relative p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
    </div>
  </div>
);

/* -------------------------- Starry Background ---------------------------- */
const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

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
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars(Math.floor((window.innerWidth * window.innerHeight) / 8000));
    };

    const createStars = (count: number) => {
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 1.5 + 0.4,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.015 + 0.003, // lebih lambat
          twinkleDirection: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * (window.innerHeight * 0.4),
        length: Math.random() * 90 + 50,
        speed: Math.random() * 6 + 4, // lebih lambat
        opacity: 1,
        angle: Math.PI / 4 + (Math.random() * 0.4 - 0.2),
      });
    };

    resize();
    window.addEventListener("resize", resize);

    const shootingInterval = setInterval(() => {
      if (Math.random() > 0.55 && shootingStars.length < 5) createShootingStar();
    }, 1600);

    const drawStatic = () => {
      ctx.fillStyle = "#030014";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
    };

    const animate = () => {
      ctx.fillStyle = "#030014";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

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
        s.opacity -= 0.008; // lebih lambat fade

        if (
          s.opacity <= 0 ||
          s.x > window.innerWidth + 150 ||
          s.y > window.innerHeight + 150
        ) {
          shootingStars.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    if (reduceMotion) {
      drawStatic();
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(shootingInterval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

/* --------------------------- Welcome Screen ------------------------------ */
const WelcomeScreen = ({ onLoadingComplete }: WelcomeScreenProps) => {
  const [show, setShow] = useState(true);
  const [typingDone, setTypingDone] = useState(false);

  // Setelah typewriter selesai → hold lebih lama biar user sempat baca
  useEffect(() => {
    if (!typingDone) return;

    const holdTimer = setTimeout(() => setShow(false), 250);

    return () => clearTimeout(holdTimer);
  }, [typingDone]);

  const handleExitComplete = useCallback(() => {
    onLoadingComplete?.();
  }, [onLoadingComplete]);

  /* ------------------------- Animation Variants ------------------------- */
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      transition: {
        duration: 0.5,
        ease: [0.65, 0, 0.35, 1] as const,
        staggerChildren: 0.04,
      },
    },
  };

  const childVariants = {
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.65, 0, 0.35, 1] as const },
    },
  };

  /* ------------------------- Easing references -------------------------- */
  // easeOutExpo — akselerasi cepat di awal, melambat sangat halus di akhir
  const easeOutExpo = [0.16, 1, 0.3, 1] as const;
  // easeOutQuart — lebih lembut lagi, cocok untuk text
  const easeOutQuart = [0.25, 1, 0.5, 1] as const;

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {show && (
        <motion.div
          className="fixed inset-0 overflow-hidden"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Layer 2: Glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-purple-900/20 z-[2] pointer-events-none" />

          {/* Layer 4: Content */}
          <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto">
              {/* Icons */}
              <motion.div
                className="flex justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                {[Code2, User, Github].map((Icon, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -30, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 0.3 + index * 0.18,
                      duration: 0.9,
                      ease: easeOutQuart,
                    }}
                  >
                    <IconButton Icon={Icon} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Welcome Text */}
              <motion.div
                className="text-center mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold space-y-2 sm:space-y-4">
                  {/* Baris 1: Welcome To My */}
                  <div className="mb-2 sm:mb-4">
                    {["Welcome", "To", "My"].map((word, i) => (
                      <motion.span
                        key={word}
                        initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{
                          delay: 0.7 + i * 0.15,
                          duration: 0.9,
                          ease: easeOutQuart,
                        }}
                        className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </div>

                  {/* Baris 2: Portfolio Website */}
                  <div>
                    {["Portfolio", "Website"].map((word, i) => (
                      <motion.span
                        key={word}
                        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                          delay: 1.2 + i * 0.15,
                          duration: 0.9,
                          ease: easeOutQuart,
                        }}
                        className="inline-block px-2 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#6366f1] bg-clip-text text-transparent"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </div>
                </h1>
              </motion.div>

              {/* Website Link + Typewriter */}
              <motion.div
                className="text-center"
                variants={childVariants}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.9, ease: easeOutQuart }}
              >
                <a
                  href="https://www.ryujin-sanz.my.id/"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full relative group hover:scale-105 transition-transform duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-md group-hover:blur-lg transition-all duration-500" />
                  <div className="relative flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      <TypewriterEffect
                        text="ryujin-sanz.my.id"
                        speed={80}
                        startDelay={1300}
                        onComplete={() => setTypingDone(true)}
                      />
                    </span>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;