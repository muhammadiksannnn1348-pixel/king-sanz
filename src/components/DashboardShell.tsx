'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Award,
  FolderGit2,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  X,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import AnimatedBackground from './Background'

const navigation = [
  { href: '/dashboard/projects', label: 'Projects', icon: FolderGit2 },
  { href: '/dashboard/certificates', label: 'Certificates', icon: Award },
  { href: '/dashboard/comments', label: 'Comments', icon: MessageSquare },
]

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const logout = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  const sidebar = (
    <div className="flex h-full flex-col p-5">
      <div className="mb-8 flex items-center gap-3 px-1">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/30 bg-indigo-500/15 shadow-[0_0_24px_rgba(99,102,241,0.28)]">
          <LayoutDashboard className="h-5 w-5 text-indigo-300" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Dashboard</p>
          <p className="text-xs text-slate-500">Admin Panel</p>
        </div>
      </div>

      <div className="mb-7 flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3 py-2 text-xs font-medium text-indigo-300">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
        Portfolio Manager
      </div>

      <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-600">Menu</p>
      <nav className="flex flex-1 flex-col gap-2">
        {navigation.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`)
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`group flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-semibold transition-all ${
                active
                  ? 'border-indigo-500/40 bg-gradient-to-r from-indigo-500/25 to-purple-500/15 text-white shadow-[0_8px_24px_rgba(79,70,229,0.16)]'
                  : 'border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? 'text-indigo-300' : 'text-slate-500 group-hover:text-indigo-300'}`} />
              <span>{label}</span>
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-300" />}
            </Link>
          )
        })}
      </nav>

      <button
        type="button"
        onClick={logout}
        className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm font-medium text-slate-500 transition-colors hover:border-red-500/20 hover:bg-red-500/5 hover:text-red-300"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </button>
    </div>
  )

  return (
    <div className="flex h-[100dvh] text-white">
      <AnimatedBackground />
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 border-r border-white/10 bg-[#05021a]/90 backdrop-blur-xl lg:block">
        {sidebar}
      </aside>

      {open && <button aria-label="Close sidebar" className="fixed inset-0 z-40 bg-black/70 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 border-r border-white/10 bg-[#05021a] shadow-2xl transition-transform duration-300 lg:hidden ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <button type="button" aria-label="Close sidebar" onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white">
          <X className="h-5 w-5" />
        </button>
        {sidebar}
      </aside>

      <div className="relative flex min-h-0 flex-1 flex-col lg:pl-60">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-white/10 bg-[#030014]/80 px-4 backdrop-blur-xl lg:hidden">
          <button type="button" aria-label="Open sidebar" onClick={() => setOpen(true)} className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/10">
            <Menu className="h-5 w-5" />
          </button>
          <span className="ml-3 text-sm font-semibold">Dashboard</span>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  )
}