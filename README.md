# Sanz Portfolio Website

Website portfolio personal berbasis Next.js yang menampilkan profil, pengalaman, proyek, sertifikat, skill, dan kontak. Proyek ini juga dilengkapi dengan halaman detail proyek, splash screen, animasi visual, serta dashboard admin untuk mengelola konten portfolio secara dinamis melalui Supabase.

## Deskripsi Proyek

Proyek ini dibuat untuk menampilkan portfolio digital pribadi dengan tampilan modern, interaktif, dan responsif. Fokus utama aplikasi ini adalah:

- menampilkan profil profesional dan bidang keahlian
- menampilkan daftar proyek dengan detail per item
- menampilkan sertifikat dan stack teknologi
- menerima komentar atau kontak dari pengunjung
- menyediakan panel admin untuk mengelola data secara aman

Aplikasi ini dibangun menggunakan Next.js App Router, Tailwind CSS, dan Supabase untuk autentikasi, database, serta storage media.

## Fitur Utama

### Landing Page Portfolio

Halaman utama terdiri dari beberapa bagian utama:

- Welcome Screen / splash screen saat pertama kali dibuka
- Home untuk memperkenalkan profil dan fokus keahlian
- About untuk menampilkan informasi personal dan detail portfolio
- Portofolio untuk menampilkan proyek, sertifikat, dan teknologi
- Contact untuk form kontak dan informasi komunikasi
- Footer dengan tautan sosial dan link penting

### Detail Project Per Slug

Setiap proyek dapat dibuka melalui route berikut:

```text
/project/[slug]
```

Halaman ini menampilkan:

- judul proyek
- deskripsi proyek
- teknologi yang dipakai
- fitur utama
- tautan demo
- tautan GitHub
- gambar proyek
- halaman 404 jika data tidak ditemukan

### Integrasi Supabase

Semua data konten dikelola melalui Supabase, termasuk:

- autentikasi admin
- data proyek
- data sertifikat
- data komentar
- media upload gambar

### UI Responsif dan Animasi

Antarmuka dirancang agar responsif di berbagai ukuran layar. Beberapa elemen yang dibuat interaktif meliputi:

- navbar dengan efek scroll
- background animasi
- welcome screen dengan transisi
- kartu proyek dan sertifikat
- halaman dashboard yang modern
- animasi transisi menggunakan Framer Motion

## Stack Teknologi

### Frontend

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Material UI
- Lucide React
- React Icons

### Animasi dan UI Enhancement

- Framer Motion
- GSAP
- AOS
- @react-spring/web
- Typewriter Effect

### Backend & Data

- Supabase
- Supabase Auth
- Supabase Storage
- Supabase SSR

### Tools Lain

- ESLint
- PostCSS
- Vercel-ready deployment

### Design Reference / UI Inspiration

- React Bits-inspired visual patterns dan interaksi UI
- Custom component styling untuk efek neon, glassmorphism, dan motion-based landing page

> Catatan: React Bits adalah referensi desain dan pola UI yang terinspirasi dari proyek ini, bukan dependency resmi yang terpasang di package.json saat ini.

## Struktur Folder Utama

```text
src/
├── app/
│   ├── dashboard/
│   │   ├── certificates/
│   │   ├── comments/
│   │   ├── projects/
│   │   └── layout.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── project/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── Background.tsx
│   ├── CardProject.tsx
│   ├── Certificate.tsx
│   ├── Commentar.tsx
│   ├── DashboardShell.tsx
│   ├── Footer.tsx
│   ├── InputField.tsx
│   ├── Modal.tsx
│   ├── Navbar.tsx
│   ├── ProjectDetail.tsx
│   ├── ProtectedRoute.tsx
│   └── ...
├── lib/
│   ├── slug.ts
│   └── supabase.ts
├── types/
│   └── styles.d.ts
└── assets/
```

## Route Aplikasi

| Route | Keterangan |
| --- | --- |
| `/` | Halaman utama portfolio |
| `/project/[slug]` | Detail proyek berdasarkan slug |
| `*` | Halaman 404 |

## Persyaratan Sistem

Sebelum menjalankan proyek, pastikan perangkat Anda sudah memiliki:

- Node.js 18+
- npm atau package manager lain yang kompatibel
- akun Supabase aktif

## Perintah NPM

| Perintah | Keterangan |
| --- | --- |
| `npm run dev` | Menjalankan aplikasi di mode development |
| `npm run build` | Membuat build production |
| `npm run start` | Menjalankan hasil build production |
| `npm run lint` | Menjalankan pengecekan ESLint |
| `npm run typecheck` | Menjalankan pengecekan TypeScript |

## Konfigurasi Supabase

Untuk fitur portal admin dan data portfolio berfungsi dengan baik, project Supabase Anda perlu memiliki:

- autentikasi user
- tabel `profiles` untuk role admin
- tabel `projects` untuk data proyek
- tabel `certificates` untuk data sertifikat
- tabel `comments` untuk komentar pengunjung
- storage bucket untuk media proyek/sertifikat
- kebijakan RLS yang sesuai

## Build untuk Production

```bash
npm run build
```

Lalu jalankan server produksi dengan:

```bash
npm run start
```

Untuk deployment, Anda bisa menggunakan Vercel atau layanan hosting Node.js lainnya. Pastikan environment variables Supabase sudah diatur di platform hosting.

## Catatan Keamanan

- Gunakan `NEXT_PUBLIC_SUPABASE_ANON_KEY` untuk frontend.
- Jangan menyimpan `service role` key di frontend.
- Batasi akses tabel dan storage melalui RLS Supabase.
- Pastikan login admin hanya diberikan kepada user yang benar-benar berwenang.

## Penutup

Proyek ini dirancang sebagai portfolio digital yang mudah dikelola, modern, dan siap dideploy. Dengan kombinasi Next.js, Tailwind, dan Supabase, Anda bisa mengelola konten portfolio tanpa harus mengubah source code satu per satu.