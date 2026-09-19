// Full project detail view with metadata.

"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code2,
  Star,
  ChevronRight,
  Layers,
  Layout,
  Globe,
  Package,
  Cpu,
  Code,
} from "lucide-react";
import Swal from "sweetalert2";
import { toSlug } from "../lib/slug";
import NotFoundPage from "../app/views/404";

type Project = {
  Title: string;
  Description?: string;
  Features?: string[];
  TechStack?: string[];
  Github?: string;
  Link?: string;
  Img?: string;
};

// Helper format URL
const formatUrl = (url?: string): string => {
  if (!url) return "#";
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};

// Icon mapping
const TECH_ICONS: Record<string, typeof Globe> = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }: { tech: string }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }: { feature: string }) => {
  return (
    <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
        {feature}
      </span>
    </li>
  );
};

const ProjectStats = ({ project }: { project: Project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />
      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg">
        <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
          <Code2 className="text-blue-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-blue-200">{techStackCount}</div>
          <div className="text-[10px] md:text-xs text-gray-400">Total Technology</div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-purple-500/20 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-lg">
        <div className="bg-purple-500/20 p-1.5 md:p-2 rounded-full">
          <Layers className="text-purple-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-purple-200">{featuresCount}</div>
          <div className="text-[10px] md:text-xs text-gray-400">Key Features</div>
        </div>
      </div>
    </div>
  );
};

// Handle klik Live Demo
const handleLiveDemoClick = (link?: string) => {
  if (!link || link.trim() === "") {
    Swal.fire({
      icon: "info",
      title: "Live Demo Tidak Tersedia",
      text: "Maaf, live demo untuk proyek ini belum tersedia.",
      confirmButtonText: "Mengerti",
      confirmButtonColor: "#3085d6",
      background: "#030014",
      color: "#ffffff",
    });
    return false;
  }
  return true;
};

// Handle klik Github
const handleGithubClick = (githubLink?: string) => {
  if (!githubLink || githubLink === "Private" || githubLink.trim() === "") {
    Swal.fire({
      icon: "info",
      title: "Source Code Private",
      text: "Maaf, source code untuk proyek ini bersifat privat.",
      confirmButtonText: "Mengerti",
      confirmButtonColor: "#3085d6",
      background: "#030014",
      color: "#ffffff",
    });
    return false;
  }
  return true;
};

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
          radius: Math.random() * 1.4 + 0.4,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleDirection: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.4),
        length: Math.random() * 80 + 40,
        speed: Math.random() * 9 + 6,
        opacity: 1,
        angle: Math.PI / 4 + (Math.random() * 0.35 - 0.15),
      });
    };

    createStars(160);

    const shootingInterval = setInterval(() => {
      if (Math.random() > 0.6) createShootingStar();
    }, 1400);

    const animate = () => {
      ctx.fillStyle = "#030014";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
        gradient.addColorStop(0.5, `rgba(180, 210, 255, ${s.opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.013;

        if (s.opacity <= 0 || s.x > canvas.width + 120 || s.y > canvas.height + 120) {
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
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

const ProjectDetails = ({ slug }: { slug: string }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [hasResolvedProject, setHasResolvedProject] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedProjects = JSON.parse(localStorage.getItem("projects") ?? "[]") as Project[];
    const selectedProject = storedProjects.find((p) => toSlug(p.Title) === slug);

    if (selectedProject) {
      const enhancedProject: Project = {
        ...selectedProject,
        Features: selectedProject.Features || [],
        TechStack: selectedProject.TechStack || [],
        Github: selectedProject.Github || "",
        Link: selectedProject.Link || "",
      };
      setProject(enhancedProject);
    }
    setHasResolvedProject(true);
  }, [slug]);

  const handleBack = () => {
    sessionStorage.setItem('portfolio-return-path', '/#portofolio');
    window.history.back();
  };

  if (!project) {
    if (hasResolvedProject) {
      return <NotFoundPage />;
    }

    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-white">Loading Project...</h2>
        </div>
      </div>
    );
  }

  const projectUrl = `https://king-sanz.vercel.app/project/${toSlug(project.Title)}`;

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        {/* Background Bintang + Bintang Jatuh */}
        <StarryBackground />

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12">
              <button
                onClick={handleBack}
                className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm md:text-base"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-white/50">
                <span>Projects</span>
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-white/90 truncate">{project.Title}</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
              {/* Left Content */}
              <div className="space-y-6 md:space-y-10">
                <div className="space-y-4 md:space-y-6">
                  <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#6366f1] bg-clip-text text-transparent leading-tight">
                    {project.Title}
                  </h1>

                  {/* Line biru */}
                  <div className="relative h-1 w-16 md:w-24">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 rounded-full" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 rounded-full blur-sm opacity-70" />
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-base md:text-lg text-gray-300/90 leading-relaxed">
                    {project.Description}
                  </p>
                </div>

                <ProjectStats project={project} />

                <div className="flex flex-wrap gap-3 md:gap-4">
                  {/* Live Demo */}
                  <a
                    href={project.Link ? formatUrl(project.Link) : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 text-blue-300 rounded-xl transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                    onClick={(e) => {
                      if (!handleLiveDemoClick(project.Link)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                    <ExternalLink className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                    <span className="relative font-medium">Live Demo</span>
                  </a>

                  {/* Github */}
                  <a
                    href={project.Github ? formatUrl(project.Github) : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                    onClick={(e) => {
                      if (!handleGithubClick(project.Github)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-purple-600/10 to-pink-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                    <Github className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                    <span className="relative font-medium">Github</span>
                  </a>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-lg md:text-xl font-semibold text-white/90 mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3">
                    <Code2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                    Technologies Used
                  </h3>
                  {project.TechStack.length > 0 ? (
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {project.TechStack.map((tech, index) => (
                        <TechBadge key={index} tech={tech} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm md:text-base text-gray-400 opacity-50">No technologies added.</p>
                  )}
                </div>
              </div>

              {/* Right Content */}
              <div className="space-y-6 md:space-y-10">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={project.Img}
                    alt={project.Title}
                    className="w-full object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105"
                    onLoad={() => setIsImageLoaded(true)}
                  />
                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-300 rounded-2xl" />
                </div>

                <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6 hover:border-white/20 transition-colors duration-300 group">
                  <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-400 group-hover:rotate-[20deg] transition-transform duration-300" />
                    Key Features
                  </h3>
                  {project.Features.length > 0 ? (
                    <ul className="list-none space-y-2">
                      {project.Features.map((feature, index) => (
                        <FeatureItem key={index} feature={feature} />
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 opacity-50">No features added.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;