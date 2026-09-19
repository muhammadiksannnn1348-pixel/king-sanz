// Top navigation bar for the landing page.

'use client'

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Zap } from "lucide-react"

type NavItem = {
    href: string;
    label: string;
};

/*
  Navbar.jsx
  - Komponen navigasi atas yang responsif.
  - Catatan penjelasan per-baris (Indonesia):
    * `isOpen`  : boolean, apakah menu mobile terbuka.
    * `scrolled`: boolean, true jika pengguna sudah scroll beberapa pixel.
    * `activeSection`: string, menyimpan id section yang sedang terlihat.
    * `navItems`: array item navigasi yang merujuk ke anchor pada halaman.
*/
const Navbar = () => {
    // menandakan apakah menu mobile terbuka
    const [isOpen, setIsOpen] = useState(false);
    // true jika halaman sudah digulir lebih dari ambang (dipakai untuk efek background)
    const [scrolled, setScrolled] = useState(false);
    // id section aktif (mis. 'Home', 'About') untuk menandai item navbar
    const [activeSection, setActiveSection] = useState("home");

    // daftar link navigasi; gunakan href anchor agar berlaku single-page
    const navItems: NavItem[] = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#portofolio", label: "Portofolio" },
        { href: "#contact", label: "Contact" },
    ];

    // Effect untuk memantau scroll dan menentukan section aktif
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20); // set scrolled jika lebih dari 20px

            // Cari posisi tiap section (offset top dan tinggi)
            const sections = navItems
                .map((item): { id: string; offset: number; height: number } | null => {
                    const section = document.querySelector(item.href);
                    if (section) {
                        const element = section as HTMLElement;
                        return {
                            id: item.href.replace("#", ""),
                            offset: element.offsetTop - 550,
                            height: element.offsetHeight,
                        };
                    }
                    return null;
                })
                .filter((section): section is { id: string; offset: number; height: number } => Boolean(section));

            const currentPosition = window.scrollY;
            const active = sections.find(
                (section) =>
                    currentPosition >= section.offset &&
                    currentPosition < section.offset + section.height
            );

            if (active) {
                setActiveSection(active.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // panggil sekali agar state sinkron saat load
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Effect untuk mengunci scroll body saat menu mobile terbuka
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    // Fungsi helper untuk scroll ke section dan menutup menu mobile
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            const top = section.getBoundingClientRect().top + window.scrollY - 100;
            window.history.pushState(null, "", href.toLowerCase());
            window.scrollTo({
                top: top,
                behavior: "smooth",
            });
        }
        setIsOpen(false);
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-500 ${isOpen
                ? "bg-[#030014]"
                : scrolled
                    ? "bg-[#030014]/50 backdrop-blur-xl"
                    : "bg-transparent"
                }`}
        >
            <div className="mx-auto px-[5%] sm:px-[5%] lg:px-[10%]">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a
                            href="#home"
                            onClick={(e) => scrollToSection(e, "#home")}
                            className="group flex items-center gap-2 transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.03]"
                        >
                            {/* Logo icon */}
                            <div className="relative flex items-center justify-center">
                                <Zap className="relative w-5 h-5 text-[#a855f7] fill-[#6366f1]" />
                            </div>

                            {/* Logo text */}
                            <span className="text-xl font-bold tracking-wide bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                                Sanz
                            </span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-8 flex items-center space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className="group relative px-1 py-2 text-sm font-medium"
                                >
                                    <span
                                        className={`relative z-10 transition-colors duration-300 ${activeSection === item.href.substring(1)
                                            ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                                            : "text-[#e2d3fd] group-hover:text-white"
                                            }`}
                                    >
                                        {item.label}
                                    </span>
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] transform origin-left transition-transform duration-300 ${activeSection === item.href.substring(1)
                                            ? "scale-x-100"
                                            : "scale-x-0 group-hover:scale-x-100"
                                            }`}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`relative p-2 text-[#e2d3fd] hover:text-white transition-transform duration-300 ease-in-out transform ${isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
                                }`}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
            >
                <div className="px-4 py-6 space-y-4">
                    {navItems.map((item, index) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className={`block px-4 py-3 text-lg font-medium transition-all duration-300 ease ${activeSection === item.href.substring(1)
                                ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                                : "text-[#e2d3fd] hover:text-white"
                                }`}
                            style={{
                                transitionDelay: `${index * 100}ms`,
                                transform: isOpen ? "translateX(0)" : "translateX(50px)",
                                opacity: isOpen ? 1 : 0,
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
