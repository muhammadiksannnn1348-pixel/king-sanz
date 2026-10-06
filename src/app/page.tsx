'use client'

import { useEffect, useLayoutEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import AOS from 'aos'
import './aos.css'
import WelcomeScreen from './views/WelcomeScreen'

const About = dynamic(() => import('./views/About'))
const Contact = dynamic(() => import('./views/Contact'))
const Home = dynamic(() => import('./views/Home'))
const Portofolio = dynamic(() => import('./views/Portofolio'))
const Footer = dynamic(() => import('../components/Footer'))
const Navbar = dynamic(() => import('../components/Navbar'))

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
    void import('./views/Home')
    void import('../components/Navbar')
  }, [])

  useEffect(() => {
    let refreshFrame = 0
    const containsAosElement = (node: Node) =>
      node instanceof Element && (node.matches('[data-aos]') || Boolean(node.querySelector('[data-aos]')))
    const observer = new MutationObserver((mutations) => {
      const hasAosChanges = mutations.some((mutation) =>
        [...mutation.addedNodes, ...mutation.removedNodes].some(containsAosElement)
      )

      if (!hasAosChanges || refreshFrame) return

      refreshFrame = window.requestAnimationFrame(() => {
        refreshFrame = 0
        AOS.refreshHard()
      })
    })

    AOS.init({ once: false, duration: 800, offset: 10, mirror: false, disableMutationObserver: true })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      if (refreshFrame) window.cancelAnimationFrame(refreshFrame)
    }
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