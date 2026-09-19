'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase' // sesuaikan path jika perlu

function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#030014] px-4 py-6 text-white sm:px-6 lg:pl-64 lg:pr-8">
      <div className="mx-auto max-w-[1500px] animate-pulse space-y-6">
        <div className="h-10 w-48 rounded-xl bg-white/10" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-72 rounded-2xl border border-white/10 bg-white/5"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function DashboardAccessError({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030014] px-6 text-center text-white">
      <div className="max-w-md rounded-2xl border border-red-500/20 bg-white/5 p-8">
        <h1 className="text-xl font-semibold">Dashboard tidak dapat diverifikasi</h1>
        <p className="mt-3 text-sm text-slate-400">{message}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold hover:bg-indigo-400"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  )
}

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const [status, setStatus] = useState<
    'loading' | 'allowed' | 'unauthorized' | 'forbidden' | 'error'
  >('loading')
  const router = useRouter()
  const redirecting = useRef(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let mounted = true

    const check = async () => {
      try {
        const {
          data: { session },
          error: authError,
        } = await supabase.auth.getSession()

        if (!mounted) return

        if (authError || !session?.user) {
          setStatus('unauthorized')
          return
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (!mounted) return

        if (profileError) {
          console.error('Profile error:', profileError)
          setStatus('error')
          return
        }

        if (profile?.role === 'admin') {
          setStatus('allowed')
        } else {
          // Bukan admin → logout dulu biar bersih
          await supabase.auth.signOut()
          setStatus('forbidden')
        }
      } catch (err) {
        console.error('Auth check failed:', err)
        if (mounted) setStatus('error')
      }
    }

    check()

    // Dengarkan perubahan auth (logout dari tab lain dll)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT' && mounted) {
        setStatus('unauthorized')
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [attempt])

  // Redirect hanya sekali
  useEffect(() => {
    if (
      (status === 'unauthorized' || status === 'forbidden') &&
      !redirecting.current
    ) {
      redirecting.current = true
      router.replace('/login')
    }
  }, [status, router])

  if (status === 'loading' || status === 'unauthorized') {
    return <DashboardLoading />
  }

  if (status === 'forbidden') {
    return (
      <DashboardAccessError
        message="Akun ini tidak memiliki akses admin."
        onRetry={() => {
          redirecting.current = false
          setAttempt((v) => v + 1)
        }}
      />
    )
  }

  if (status === 'error') {
    return (
      <DashboardAccessError
        message="Session tersedia, tetapi profil admin belum dapat dibaca. Periksa koneksi atau policy Supabase (RLS)."
        onRetry={() => {
          redirecting.current = false
          setAttempt((v) => v + 1)
        }}
      />
    )
  }

  // status === 'allowed'
  return <>{children}</>
}