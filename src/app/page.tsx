// Landing page entry: renders the portfolio homepage.

'use client'

import { useEffect, useLayoutEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import About from './views/About'
import Contact from './views/Contact'
import Home from './views/Home'
import Portofolio from './views/Portofolio'
import WelcomeScreen from './views/WelcomeScreen'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function LandingPage() {
  const [showWelcome, setShowWelcome] = useState(true)

  const completeWelcome = () => {
    setShowWelcome(false)
  }

  useIsomorphicLayoutEffect(() => {
    const returningFromProject = sessionStorage.getItem('portfolio-return-path')
    if (!returningFromProject) return

    if (returningFromProject) sessionStorage.removeItem('portfolio-return-path')
    setShowWelcome(false)
  }, [])

  useEffect(() => {
    if (showWelcome || window.location.hash !== '#portofolio') return

    const frame = window.requestAnimationFrame(() => {
      document.getElementById('portofolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [showWelcome])

  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && <WelcomeScreen onLoadingComplete={completeWelcome} />}
      </AnimatePresence>
      {!showWelcome && (
        <>
          <Navbar />
          <Home />
          <About />
          <Portofolio />
          <Contact />
          <Footer />
        </>
      )}
    </>
  )
}