# Penjelasan Website Portofolio Sanz

## Ringkasan

Website ini adalah portofolio pribadi M. Iksanuddin (Sanz), dibuat dengan Next.js App Router, React, TypeScript, dan Tailwind CSS. Halaman utama memperkenalkan profil dan menampilkan bagian About, Portfolio, Contact, serta footer. Data proyek, sertifikat, dan komentar terhubung ke Supabase; tersedia juga dashboard admin untuk mengelola proyek, sertifikat, dan komentar.

Website memiliki halaman detail untuk setiap proyek, splash screen, animasi antarmuka, metadata SEO, sitemap, dan tampilan yang menyesuaikan ukuran layar.

## Fitur

### Halaman portfolio

Halaman `/` menampilkan splash screen sebelum bagian utama. Pengunjung dapat menjelajahi bagian Home, About, Portofolio, dan Contact melalui navigasi satu halaman. Bagian portfolio memiliki tab Projects, Certificates, dan Tech Stack; data proyek dan sertifikat dimuat dari Supabase dan disimpan sementara di `localStorage` agar dapat ditampilkan lebih cepat saat kunjungan berikutnya.

Bagian Contact menyediakan dua cara interaksi:

- Form pesan yang mengirimkan data melalui FormSubmit.
- Form komentar pengunjung dengan nama, pesan, dan foto profil opsional. Komentar ditampilkan pada website dan diperbarui melalui Supabase Realtime.

### Detail proyek

Setiap kartu proyek dapat membuka halaman `/project/[id]`, misalnya `/project/1`. Nilai `[id]` adalah ID proyek di tabel `projects`. Halaman mengambil data proyek langsung dari Supabase dan menampilkan gambar, deskripsi, daftar fitur, teknologi, tautan demo, serta repository GitHub bila tersedia. Jika ID tidak ditemukan atau konfigurasi Supabase tidak tersedia, halaman akan menampilkan halaman 404.

### Dashboard admin

Halaman login tersedia di `/auth/login` dan menggunakan Supabase Auth dengan email dan password. Setelah login, aplikasi memeriksa bahwa baris pada tabel `profiles` untuk pengguna tersebut memiliki `role = admin`. Pengguna tanpa role admin tidak dapat mengakses dashboard.

Dashboard menyediakan fitur berikut:

- **Projects**: menambah, mengubah, dan menghapus proyek beserta gambar, deskripsi, teknologi, fitur, tautan demo, dan tautan GitHub.
- **Certificates**: mengunggah dan menghapus gambar sertifikat.
- **Comments**: mencari, memfilter, menyematkan, dan menghapus komentar pengunjung.

Route `/admin` dan `/admin/dashboard` mengarahkan pengguna ke pengelolaan proyek. Kebijakan keamanan data tetap harus diterapkan melalui Supabase RLS; pemeriksaan role di antarmuka bukan pengganti kebijakan database.

### Tampilan, animasi, dan metadata

Antarmuka menggunakan Tailwind CSS dan Material UI untuk elemen tab. Framer Motion dan AOS dipakai untuk transisi dan animasi saat halaman dibuka maupun saat konten terlihat. Website juga menyediakan halaman 404 kustom, metadata Open Graph, `robots.txt`, dan sitemap yang menyertakan proyek dari Supabase.

## Teknologi

- Next.js 15 dan React 18
- TypeScript
- Tailwind CSS dan Material UI
- Supabase Auth, Database, Storage, Realtime, dan Supabase SSR
- Framer Motion, AOS, Lucide React, dan SweetAlert2
- ESLint dan TypeScript untuk pemeriksaan kode

## Route

| Route | Keterangan |
| --- | --- |
| `/` | Halaman utama portfolio |
| `/project/[id]` | Detail proyek berdasarkan ID Supabase |
| `/auth/login` | Form login admin |
| `/admin` | Mengarahkan ke dashboard proyek |
| `/admin/dashboard` | Mengarahkan ke dashboard proyek |
| `/admin/dashboard/projects` | Pengelolaan proyek |
| `/admin/dashboard/certificates` | Pengelolaan sertifikat |
| `/admin/dashboard/comments` | Moderasi komentar |
| Route yang tidak tersedia | Halaman 404 kustom |

## Struktur utama

```text
src/
├── app/
│   ├── admin/dashboard/
│   │   ├── certificates/page.tsx
│   │   ├── comments/page.tsx
│   │   ├── projects/page.tsx
│   │   └── layout.tsx
│   ├── auth/login/page.tsx
│   ├── project/[id]/page.tsx
│   ├── views/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Home.tsx
│   │   ├── Portofolio.tsx
│   │   └── WelcomeScreen.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── CardProject.tsx
│   ├── Certificate.tsx
│   ├── Commentar.tsx
│   ├── DashboardShell.tsx
│   ├── ProjectDetail.tsx
│   └── ProtectedRoute.tsx
└── lib/
    └── supabase.ts
```

## Menjalankan secara lokal

Persyaratan: Node.js 18.18 atau lebih baru, npm, serta project Supabase untuk fitur yang menggunakan database.

1. Pasang dependency:

   ```bash
   npm install
   ```

2. Buat file `.env.local` di root project dan isi konfigurasi Supabase:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. Jalankan server pengembangan:

   ```bash
   npm run dev
   ```

4. Buka `http://localhost:3000`.

Alamat Supabase dipakai juga oleh konfigurasi Next.js untuk mengizinkan gambar dari Supabase Storage. Pastikan kedua environment variable tersedia saat server dimulai dan saat build/deployment.

## Data dan konfigurasi Supabase

Website membaca dan menulis tabel berikut. Nama kolom mengikuti query yang digunakan aplikasi saat ini.

| Tabel | Kolom yang digunakan | Keterangan |
| --- | --- | --- |
| `projects` | `id`, `Title`, `Description`, `Img`, `TechStack`, `Features`, `Link`, `Github`, `created_at` | Proyek portfolio. `TechStack` dan `Features` disimpan sebagai daftar nilai; `Img` berisi URL publik gambar. |
| `certificates` | `id`, `Img`, `created_at` | Sertifikat yang ditampilkan pada portfolio. |
| `portfolio_comments` | `id`, `user_name`, `profile_image`, `content`, `created_at`, `is_pinned` | Komentar pengunjung dan status sematan. |
| `profiles` | `id`, `role` | `id` harus cocok dengan ID pengguna Supabase Auth; role admin menggunakan nilai `admin`. |

Bucket Supabase Storage yang digunakan:

- `project-images` untuk gambar proyek.
- `certificate-images` untuk gambar sertifikat.
- `profile-images` untuk foto profil komentar.

Atur kebijakan RLS sesuai operasi aplikasi: pengunjung perlu membaca data portfolio dan komentar, mengirim komentar, serta mengunggah foto komentar jika fitur tersebut diaktifkan. Operasi pembuatan, perubahan, penghapusan konten, akses dashboard, serta upload proyek dan sertifikat harus dibatasi untuk admin. Atur juga kebijakan Storage yang sesuai dan akses baca publik untuk gambar yang ditampilkan memakai public URL. Aktifkan Supabase Realtime untuk tabel `portfolio_comments` agar komentar baru dapat muncul tanpa memuat ulang halaman.

Tabel `profiles` perlu memiliki baris untuk setiap akun admin yang mengacu ke `auth.users.id`. Sediakan akun admin melalui Supabase Auth dan berikan role admin pada baris profilnya.

## Perintah project

| Perintah | Keterangan |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan |
| `npm run lint` | Menjalankan ESLint |
| `npm run typecheck` | Memeriksa tipe TypeScript tanpa membuat output |
| `npm run build` | Membuat build production |
| `npm run start` | Menjalankan build production |

## Build dan deployment

Uji build production dengan:

```bash
npm run build
npm run start
```

Project dapat di-deploy ke Vercel atau platform yang mendukung Next.js. Tambahkan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` pada environment deployment untuk Preview dan Production, lalu lakukan build ulang setelah mengubah nilainya.

Form Contact menggunakan layanan FormSubmit; alamat penerima saat ini ditentukan di `src/app/views/Contact.tsx`. Perbarui konfigurasi di sana bila penerima perlu diganti.

## Catatan keamanan

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` memang digunakan oleh aplikasi browser dan tidak boleh dianggap sebagai secret. Keamanan akses harus ditegakkan dengan RLS dan kebijakan Storage.
- Jangan pernah menaruh Supabase service-role key di variabel `NEXT_PUBLIC_*` atau bundle browser.
- Batasi kebijakan perubahan data dan akses admin hanya untuk pengguna yang berwenang.
- Sitemap dibuat dari tabel `projects` dan diperbarui dengan interval revalidasi satu jam. Akses `/admin` diblokir dari crawling melalui `robots.txt`.

## Penutup

Website ini menyatukan profil, karya, sertifikat, dan interaksi pengunjung dalam satu portfolio yang responsif. Integrasi Supabase memungkinkan konten proyek dan sertifikat dikelola melalui dashboard admin, sementara kebijakan RLS dan Storage menjaga akses data sesuai peran. Setelah konfigurasi Supabase dan environment variable disiapkan, aplikasi dapat dijalankan secara lokal maupun di-deploy ke layanan yang mendukung Next.js.